import DriveContents from "@/app/drive-contents";
import {
  files_table as filesSchema,
  folders_table as foldersSchema,
} from "@/server/db/schema";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";

export default async function Page(props: {
  params: Promise<{
    folderId: string;
  }>;
}) {
  const params = await props.params;
  const parsedFolderId = parseInt(params.folderId);
  if (isNaN(parsedFolderId)) {
    return (
      <div>
        <h1>Invalid Folder Id</h1>
      </div>
    );
  }
  const filesPromise = await db
    .select()
    .from(filesSchema)
    .where(eq(filesSchema.parent, parsedFolderId));
  const foldersPromise = await db
    .select()
    .from(foldersSchema)
    .where(eq(foldersSchema.parent, parsedFolderId));

  const [files, folders] = await Promise.all([filesPromise, foldersPromise]);

  return <DriveContents files={files} folders={folders} />;
}
