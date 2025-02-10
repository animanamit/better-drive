import { db } from "@/server/db";
import { mockFiles, mockFolders } from "@/lib/data";
import { folders_table, files_table } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export default async function SandboxPage() {
  const user = await auth();
  console.log(user);
  if (!user?.userId) throw new Error("User not found");
  const folders = await db
    .select()
    .from(folders_table)
    .where(eq(folders_table.ownerId, user.userId));
  console.log(folders);
  return (
    <div>
      <h1>Sandbox</h1>
      <h2>Seed Function</h2>
      <form
        action={async () => {
          "use server";
          console.log("Seeding database...");

          const rootFolder = await db
            .insert(folders_table)
            .values({
              name: "root",
              parent: null,
              ownerId: user.userId,
            })
            .$returningId();

          console.log(rootFolder);

          const insertableFolders = mockFolders.map((folder) => ({
            name: folder.name,
            ownerId: user.userId,
            parent: rootFolder[0]!.id,
          }));

          const folderInsert = await db
            .insert(folders_table)
            .values(insertableFolders)
            .execute();
          console.log(folderInsert);
        }}
      >
        <button type="submit">Seed</button>
      </form>
    </div>
  );
}
