import { db } from "@/server/db";
import { mockFiles, mockFolders } from "@/lib/data";
import { folders_table, files_table } from "@/server/db/schema";

export default function SandboxPage() {
  return (
    <div>
      <h1>Sandbox</h1>
      <h2>Seed Function</h2>
      <form
        action={async () => {
          "use server";
          console.log("Seeding database...");
          const folderInsert = await db
            .insert(folders_table)
            .values(
              mockFolders.map((folder, index) => ({
                name: folder.name,
                parent: index !== 0 ? 1 : null,
                id: index + 1,
              })),
            )
            .execute();
          console.log(folderInsert);
          const fileInsert = await db
            .insert(files_table)
            .values(
              mockFiles.map((file, index) => ({
                name: file.name,
                parent: (index % 3) + 1,
                size: file.size,
                url: file.url,
                id: index + 1,
              })),
            )
            .execute();

          console.log(fileInsert);
        }}
      >
        <button type="submit">Seed</button>
      </form>
    </div>
  );
}
