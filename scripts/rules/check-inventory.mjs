import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { assertHash, isEffective } from './inventory.mjs';

const hash = value => assert(/^[a-f0-9]{64}$/.test(value), 'Invalid source hash');
const unique = (rows, key) => assert.equal(new Set(rows.map(key)).size, rows.length, 'Duplicate inventory key');
const total = (rows, key) => rows.reduce((n,row)=>n+row[key],0);
const cachePath = path => assert(/^\.local\/rule-01\/source-cache\/[a-f0-9]{64}\.(?:pdf|txt|html|json)$/.test(path), 'Unsafe cache path');
export function checkSnapshots({ sources, catalog, rules, upstream }) {
  unique(sources,row=>row.id);
  for(const row of sources) {
    const url=new URL(row.url); assert.equal(url.protocol,'https:'); assert(!url.username&&!url.password);
    assert(['acquired','missing'].includes(row.status),'Unknown source status');
    if(row.status==='acquired') {
      hash(row.sha256); cachePath(row.cache_path);
      assert(row.cache_path.includes(row.sha256),'Cache path/hash mismatch');
      assert(Number.isSafeInteger(row.bytes)&&row.bytes>0,'Empty acquired source');
      if(row.extraction){ hash(row.extraction.text_sha256); cachePath(row.extraction.cache_path); assert(row.extraction.pages>0); }
    } else assert(row.sha256===null&&row.cache_path===null,'Missing source must not claim acquired bytes');
  }
  const source = id => {const row=sources.find(row=>row.id===id);assert(row?.status==='acquired','Missing inventory source '+id);return row;};
  const bind = (value,id) => assert.equal(value,source(id).sha256,'Inventory source hash mismatch '+id);
  for(const row of [catalog,rules,upstream]) assert.equal(row.schema_version,1,'Unknown inventory schema');
  assert.equal(catalog.as_of,rules.as_of);
  bind(catalog.source_hashes.catalog,'catalog-en'); bind(catalog.source_hashes.gallery,'official-gallery');
  bind(rules.source_hashes.before,rules.effective.id); bind(rules.source_hashes.after,rules.scheduled.id);
  assert.equal(rules.effective.date,source(rules.effective.id).effective_date,'effective date/source mismatch');
  assert.equal(rules.scheduled.date,source(rules.scheduled.id).effective_date,'scheduled date/source mismatch');
  assert(isEffective(rules.effective.date,rules.as_of),'Rules effective date is in the future');
  assert(!isEffective(rules.scheduled.date,rules.as_of),'Scheduled rules already effective at snapshot date');
  assert(rules.before_count>0&&rules.after_count>0,'Rules inventory is empty');
  assert.equal(rules.before_count+rules.added.length-rules.removed.length,rules.after_count,'Rule denominator mismatch');
  for(const key of ['added','removed','changed']) { unique(rules[key],row=>row.id); for(const row of rules[key]) {assert(/^\d+(?:\.\d+){2,}$/.test(row.id)); if(key==='changed'){hash(row.before_sha256);hash(row.after_sha256);}else hash(row.sha256);} }
  unique(catalog.printings,row=>row.source_id); unique(catalog.identities,row=>row.id); unique(catalog.official_gallery,row=>row.culture_invariant_id); unique(catalog.sets,row=>row.code);
  assert.equal(catalog.counts.community_printing_records,catalog.printings.length,'Printing denominator mismatch');
  assert.equal(catalog.counts.provisional_english_name_identities,catalog.identities.length,'Identity denominator mismatch');
  assert.equal(catalog.counts.official_gallery_entries,catalog.official_gallery.length,'Gallery denominator mismatch');
  assert.equal(catalog.counts.official_supply_entries,catalog.official_gallery.filter(row=>row.card_type==='supplies').length);
  assert.equal(catalog.counts.official_deck_identity_keys,new Set(catalog.official_gallery.map(row=>row.deck_building_id).filter(Boolean)).size);
  const gallery=new Set(catalog.official_gallery.map(row=>row.culture_invariant_id));
  const prints=new Map(catalog.printings.map(row=>[row.source_id,row]));
  assert.equal(catalog.counts.matching_source_ids,catalog.printings.filter(row=>gallery.has(row.source_id)).length,'Join denominator mismatch');
  assert.equal(catalog.counts.certified_identities,0,'Inventory grants no certification');
  const membership=new Set();
  for(const identity of catalog.identities) for(const id of identity.printing_ids) {
    assert(!membership.has(id)&&prints.get(id)?.identity===identity.id,'Printing identity membership mismatch');membership.add(id);
  }
  assert.equal(membership.size,prints.size,'Identity membership denominator mismatch');
  for(const row of catalog.printings) {
    assert.equal(row.project_certification,'not_certified','Inventory grants no certification');
    assert(['released','revealed_unreleased','printing_release_unverified','unknown'].includes(row.release_status));
    if(row.release_status==='released')assert(isEffective(row.release_date,catalog.as_of),'Future printing marked released');
    if(row.release_status==='revealed_unreleased')assert(row.release_date&&!isEffective(row.release_date,catalog.as_of),'Revealed date mismatch');
  }
  for(const set of catalog.sets) assert.equal(set.actual_records,catalog.printings.filter(row=>row.set_code===set.code).length,'Set denominator mismatch');
  assert.equal(total(catalog.sets,'actual_records'),prints.size,'Set coverage denominator mismatch');
  bind(upstream.source_hash,'upstream-packages'); assert.equal(upstream.tree_truncated,false,'Upstream tree truncated');
  assert.equal(upstream.pin,'53a79413c58678b1c50dde57e71de5c123132716');
  unique(upstream.files,row=>row.file);
  assert.equal(upstream.denominators.test_files,upstream.files.length,'Test file denominator mismatch');
  assert.equal(upstream.denominators.static_test_declarations,total(upstream.files,'declarations'),'Test declaration denominator mismatch');
  assert.equal(upstream.denominators.definition_objects,upstream.definitions.length,'Definition denominator mismatch');
  assert.equal(upstream.denominators.unresolved_definition_files,upstream.unresolved_definition_files.length,'Unresolved denominator mismatch');
  for(const [count,field] of Object.entries({skipped_declarations:'skipped',todo_declarations:'todo',conditional_declarations:'conditional',parameterized_declarations:'parameterized',focused_declarations:'focused'})) assert.equal(upstream.counts[count],total(upstream.files,field),'Modifier denominator mismatch');
  for(const row of upstream.files){hash(row.sha256);assert(/^[a-f0-9]{40}$/.test(row.git_blob));}
  assert.equal(upstream.counts.executed_upstream_tests,0,'Static inventory grants no runtime test execution');
  assert.equal(upstream.counts.project_certified_cards,0,'Static inventory grants no certification');
}
export function readSnapshots(root='.') {
  const read=name=>JSON.parse(readFileSync(resolve(root,'docs/rules/'+name),'utf8'));
  return {sources:[...read('2026-10-10-sources.json').sources,...read('2026-10-10-sources-supplement.json').sources],catalog:read('2026-10-10-catalog.json'),rules:read('2026-10-10-rules-diff-v2.json'),upstream:read('2026-10-10-upstream-tests.json')};
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  const data=readSnapshots(); checkSnapshots(data);
  if(process.argv.includes('--bytes'))for(const row of data.sources.filter(row=>row.status==='acquired')) {
    const bytes=readFileSync(row.cache_path);assert.equal(bytes.length,row.bytes,'Source byte length mismatch');assertHash(bytes,row.sha256);
    if(row.extraction)assertHash(readFileSync(row.extraction.cache_path),row.extraction.text_sha256);
  }
  console.log('PASS RULE-01 '+(process.argv.includes('--bytes')?'cached bytes and ':'')+'offline metadata, denominators, dated release/effective status and uncertified boundaries');
}
