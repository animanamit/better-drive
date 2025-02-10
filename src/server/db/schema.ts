// import "server-only";

import {
  text,
  singlestoreTable,
  bigint,
  index,
  timestamp,
} from "drizzle-orm/singlestore-core";

export const files_table = singlestoreTable(
  "files_table",
  {
    id: bigint({ mode: "number", unsigned: true }).primaryKey().autoincrement(),
    ownerId: text("owner_id").notNull(),
    name: text("name"),
    size: text("size"),
    url: text("url"),
    parent: bigint("parent", { mode: "number", unsigned: true }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => {
    return [
      index("parent_index").on(t.parent),
      index("owner_id_index").on(t.ownerId),
    ];
  },
);

export const folders_table = singlestoreTable(
  "folders_table",
  {
    id: bigint({ mode: "number", unsigned: true }).primaryKey().autoincrement(),
    ownerId: text("owner_id").notNull(),
    name: text("name").notNull(),
    parent: bigint("parent", { mode: "number", unsigned: true }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => {
    return [
      index("parent_index").on(t.parent),
      index("owner_id_index").on(t.ownerId),
    ];
  },
);

export type DB_File = typeof files_table.$inferSelect;
export type DB_Folder = typeof folders_table.$inferSelect;
