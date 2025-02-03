import { db } from "@/server/db";
import { mockFiles, mockFolders } from "@/lib/data";
import { folders_table } from "@/server/db/schema";

export default function SandboxPage() {
  return (
    <div>
      <h1>Sandbox</h1>
      <h2>Seed Function</h2>
      <form
        action={async () => {
          "use server";
          console.log("Seeding database...");
          // await db
          //   .insert(folders_table)
          //   .values(
          //     mockFolders.map((folder) => ({
          //       id: folder.id + 1,
          //       name: folder.name,
          //       parent: index !== 0 ? 1 : null,
          //     })),
          //   )
          //   .execute();
          // await db.insert(files).values(mockFiles.map(file => ({
          //   name: file.name
          // }))).execute();
        }}
      >
        <button type="submit">Seed</button>
      </form>
    </div>
  );
}
