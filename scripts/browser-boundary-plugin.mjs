import { assertBrowserModule, assertBrowserImport, boundaryContext, checkBoundaries, checkSource } from './check-boundaries.mjs';
export function browserBoundaryPlugin() {
  const context = boundaryContext();
  return {
    name: 'lorcana-browser-boundary', enforce: 'pre',
    buildStart() { checkBoundaries(); },
    async resolveId(source, importer) {
      if (!importer) return null;
      const target = await this.resolve(source, importer, { skipSelf: true });
      if (target && !target.external) assertBrowserImport(target.id.split('?')[0], importer.split('?')[0], context);
      return null;
    },
    transformIndexHtml: { order: 'pre', handler(html, ctx) { checkSource(ctx.filename, context, html); return html; } },
    load(id) {
      const file = id.split('?')[0];
      if (file.startsWith(context.root) && !file.includes('/node_modules/')) {
        assertBrowserModule(file, context);
        if (/\.(?:[cm]?[jt]sx?|css|html)$/.test(file)) checkSource(file, context);
      }
      return null;
    },
  };
}
