import DriveContents from "@/app/drive-contents";
import {
  files_table as filesSchema,
  folders_table as foldersSchema,
} from "@/server/db/schema";
import { db } from "@/server/db";

export default async function Page() {
  const files = await db.select().from(filesSchema);
  const folders = await db.select().from(foldersSchema);
  return <DriveContents files={files} folders={folders} />;
}
