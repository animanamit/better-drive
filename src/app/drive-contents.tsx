import { FileRow, FolderRow } from "@/app/file-row";
import type {
  files_table as filesSchema,
  folders_table as foldersSchema,
} from "@/server/db/schema";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function DriveContents(props: {
  files: (typeof filesSchema.$inferSelect)[];
  folders: (typeof foldersSchema.$inferSelect)[];
  parents: (typeof foldersSchema.$inferSelect)[];
}) {
  const breadcrumbs = [];

  return (
    <div className="mx-auto max-w-5xl p-8">
      {/* Search Bar */}
      {/* <div className="relative mb-6 flex justify-between gap-x-4 rounded-lg">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
        <input
          type="text"
          placeholder="Search files..."
          className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button>Upload</Button>
      </div> */}

      {/* Breadcrumbs */}
      <div className="mb-6 flex items-center space-x-2 text-sm">
        <Link href="/f/1" className="mr-2 text-gray-300 hover:text-white">
          My Drive
        </Link>
        {props.parents.map((folder) => (
          <div key={folder.id} className="flex items-center">
            <ChevronRight className="mx-2 text-gray-500" size={16} />
            <Link
              href={`/f/${folder.id}`}
              className="text-gray-300 hover:text-white"
            >
              {folder.name}
            </Link>
          </div>
        ))}
      </div>

      {/* Files List */}
      <div className="rounded-lg border border-gray-200 bg-white">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 border-b border-gray-200 px-4 py-3 text-sm font-medium text-gray-500">
          <div className="col-span-6">Name</div>
          <div className="col-span-3">Type</div>
          <div className="col-span-3">Size</div>
        </div>

        {/* Files */}
        <div className="divide-y divide-gray-100">
          {props.folders.map((folder) => (
            <FolderRow key={folder.id} folder={folder} />
          ))}
          {props.files.map((file) => (
            <FileRow key={file.id} file={file} />
          ))}
        </div>
      </div>
    </div>
  );
}
