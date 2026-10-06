import { assertBrowserModule, boundaryContext, checkBoundaries, checkSource } from './check-boundaries.mjs';
export function browserBoundaryPlugin() {
  const context = boundaryContext();
  return {
    name: 'lorcana-browser-boundary', enforce: 'pre',
    buildStart() { checkBoundaries(); },
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
