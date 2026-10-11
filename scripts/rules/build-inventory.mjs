import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import ts from 'typescript';
import { assertCompleteTree, assertHash, catalogInventory, digest, diffRuleSections, galleryInventory, readPinnedBlob, testDeclarations } from './inventory.mjs';

const pin = '53a79413c58678b1c50dde57e71de5c123132716';
const read = file => JSON.parse(readFileSync(file, 'utf8'));
const sum = rows => rows.reduce((n, row) => n + row, 0);
const sources = read('docs/rules/2026-10-10-sources.json').sources;
const supplement = existsSync('docs/rules/2026-10-10-sources-supplement.json') ? read('docs/rules/2026-10-10-sources-supplement.json').sources : [];
const acquired = id => { const row = [...sources,...supplement].find(row => row.id === id); assert(row?.status === 'acquired', 'Missing source ' + id); assertHash(readFileSync(row.cache_path), row.sha256); return row; };
function definition(file, text) {
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true), result = [];
  function visit(node) {
    if (ts.isObjectLiteralExpression(node)) {
      const props = new Map(node.properties.filter(ts.isPropertyAssignment).map(p => [p.name.getText(source).replace(/^['"]|['"]$/g,''),p.initializer]));
      if (props.has('cardType') && props.has('cardNumber') && props.has('id')) {
        const value = key => {const v = props.get(key); return v && (ts.isStringLiteralLike(v) || ts.isNumericLiteral(v)) ? v.text : null;};
        result.push({ id:value('id'), canonical_id:value('canonicalId'), name:value('name'), version:value('version'), set:value('set'), number:value('cardNumber'), file });
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(source); return result;
}
function build() {
  const catalogSource = acquired('catalog-en'), gallerySource = acquired('official-gallery');
  const catalog = JSON.parse(readFileSync(catalogSource.cache_path)), gallery = galleryInventory(readFileSync(gallerySource.cache_path,'utf8'));
  const normalized = catalogInventory(catalog.cards,catalog.sets,'2026-10-10');
  const officialById = new Map(gallery.map(row=>[row.culture_invariant_id,row]));
  const communityIds = new Set(catalog.cards.map(row=>row.id));
  const catalogResult = { schema_version:1, as_of:'2026-10-10', source_hashes:{ catalog:catalogSource.sha256, gallery:gallerySource.sha256 }, source_metadata:catalog.metadata,
    counts:{ official_gallery_entries:gallery.length, official_deck_identity_keys:new Set(gallery.map(r=>r.deck_building_id).filter(Boolean)).size,
      official_supply_entries:gallery.filter(r=>r.card_type==='supplies').length, community_printing_records:catalog.cards.length, provisional_english_name_identities:normalized.identities.length,
      matching_source_ids:catalog.cards.filter(r=>officialById.has(r.id)).length,
      certified_identities:0 },
    official_only:gallery.filter(r=>!communityIds.has(r.culture_invariant_id)),
    community_only:catalog.cards.filter(r=>!officialById.has(r.id)).map(r=>({id:r.id,name:r.fullName})),
    official_gallery:gallery, sets:Object.entries(catalog.sets).map(([code,meta])=>({code,name:meta.name,type:meta.type,release_date:meta.releaseDate??null,prerelease_date:meta.prereleaseDate??null,community_claims_all_cards:meta.hasAllCards,
      actual_records:catalog.cards.filter(r=>String(r.setCode)===code).length, claimed_counts:meta.cardCounts})),
    ...normalized, limitations:['Official gallery entries include supplies; community completeness and format flags are not certification. Provisional English names are not product IDs. Promos retain unknown individual availability. Global source-ID joins remain to be qualified alongside identity/printing policy.'] };
  const before = acquired('cr-2.2'), after = acquired('cr-2.3');
  assertHash(readFileSync(before.extraction.cache_path),before.extraction.text_sha256);
  assertHash(readFileSync(after.extraction.cache_path),after.extraction.text_sha256);
  const rulesResult = {schema_version:1,as_of:'2026-10-10',effective:{id:before.id,version:before.version,date:before.effective_date},scheduled:{id:after.id,version:after.version,date:after.effective_date},
    source_hashes:{before:before.sha256,after:after.sha256},
    method:'Mechanical normalized numbered leaf text hashes (depth>=3), excluding glossary/update appendices; changed hashes are review candidates, never engine certification.',
    ...diffRuleSections(readFileSync(before.extraction.cache_path,'utf8'),readFileSync(after.extraction.cache_path,'utf8'))};
  assert(rulesResult.before_count > 0 && rulesResult.after_count > 0, 'Empty numbered-rule inventory cannot qualify a diff');
  const tree = JSON.parse(readFileSync(acquired('upstream-packages').cache_path)); assertCompleteTree(tree);
  const root = '.local/rule-01/upstream', head = spawnSync('git',['-C',root,'rev-parse','HEAD'],{encoding:'utf8'});
  assert.equal(head.status,0); assert.equal(head.stdout.trim(),pin,'Research source pin mismatch');
  const files = tree.tree.filter(r=>r.type==='blob'&&r.path.startsWith('lorcana/'));
  const testFiles = [], definitions = [], unresolved = [];
  for (const row of files) {
    const file = join(root,'submodules/lorcana/packages',row.path), bytes = readPinnedBlob(file,row.mode);
    assert.equal(createHash('sha1').update(Buffer.from('blob '+bytes.length+'\0')).update(bytes).digest('hex'),row.sha,'Git blob mismatch '+row.path);
    if(row.mode === '120000') continue; // Verify link bytes; never follow external-source links.
    if (/\.(?:test|spec)\.tsx?$/.test(row.path)) {
      const rows = testDeclarations(row.path,bytes.toString('utf8')), cases = rows.filter(r=>r.kind==='test');
      testFiles.push({ file:row.path, git_blob:row.sha, sha256:digest(bytes), declarations:cases.length, suites:rows.length-cases.length,
        skipped:cases.filter(r=>r.skipped).length,todo:cases.filter(r=>r.todo).length,conditional:cases.filter(r=>r.conditional).length,
        parameterized:cases.filter(r=>r.parameterized).length,focused:cases.filter(r=>r.focused).length,
        flagged:rows.filter(r=>r.skipped||r.todo||r.conditional||r.focused||r.dynamic_title||r.parameterized) });
    }
    if (/^lorcana\/lorcana-cards\/src\/cards\/\d+\//.test(row.path)&&row.path.endsWith('.ts')&&!/\.(?:test|spec|i18n)\.|\/index\.ts$/.test(row.path)) {
      const defs = definition(row.path,bytes.toString('utf8')); definitions.push(...defs);
      if (!defs.length) unresolved.push(row.path);
    }
  }
  const testsResult = { schema_version:1,pin,tree_sha:tree.sha,tree_truncated:false,source_hash:acquired('upstream-packages').sha256,
    denominators:{scoped_lorcana_blobs:files.length,test_files:testFiles.length,static_test_declarations:sum(testFiles.map(r=>r.declarations)),definition_objects:definitions.length,unresolved_definition_files:unresolved.length},
    counts:{skipped_declarations:sum(testFiles.map(r=>r.skipped)),todo_declarations:sum(testFiles.map(r=>r.todo)),conditional_declarations:sum(testFiles.map(r=>r.conditional)),parameterized_declarations:sum(testFiles.map(r=>r.parameterized)),focused_declarations:sum(testFiles.map(r=>r.focused)),executed_upstream_tests:0,project_certified_cards:0},
    per_set:[...new Set(definitions.map(r=>r.set))].sort().map(set=>({set,definitions:definitions.filter(r=>r.set===set).length,test_files:testFiles.filter(r=>r.file.includes('/cards/'+set+'/')).length})),
    files:testFiles,definitions,unresolved_definition_files:unresolved,
    limitations:['Static declaration counts, not expanded or executed test cases; modifiers overlap. Imported aliases, generated tests and nonliteral registration wrappers may need manual review. Every scoped blob verified against the complete pinned Git tree. Source/test existence never proves behavior or Node compatibility.'] };
  return {'2026-10-10-catalog.json':catalogResult,'2026-10-10-rules-diff-v2.json':rulesResult,'2026-10-10-upstream-tests.json':testsResult};
}
const outputs=build();
for(const [name,data] of Object.entries(outputs)) {
  const path=join('docs/rules',name), text=JSON.stringify(data,null,2)+'\n';
  if(process.argv.includes('--check') || existsSync(path))assert.equal(readFileSync(path,'utf8'),text,'Inventory regeneration differs '+name);
  else writeFileSync(path,text,{flag:'wx'});
  console.log(name,JSON.stringify(data.counts??{}),JSON.stringify(data.denominators??{}));
}
