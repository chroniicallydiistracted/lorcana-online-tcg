import { pgSchema, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import type { Client } from 'pg';
import type { services } from './policy.ts';
const table = (schema: string) => pgSchema(schema).table('foundation_probes', {
  id: uuid('id').defaultRandom().primaryKey(),
  label: varchar('label', { length: 160 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).notNull().defaultNow(),
});
export const probes = { api: table('api'), match: table('match'), worker: table('worker') };
export function probeRepository(client: Client, service: typeof services[number]) {
  const db = drizzle(client), selected = probes[service];
  return {
    insert: (label: string) => db.insert(selected).values({ label }).returning(),
    find: (id: string) => db.select().from(selected).where(eq(selected.id, id)),
    update: (id: string, label: string) => db.update(selected).set({ label }).where(eq(selected.id, id)).returning(),
    remove: (id: string) => db.delete(selected).where(eq(selected.id, id)).returning(),
  };
}
