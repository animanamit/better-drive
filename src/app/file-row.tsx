import { type Folder, type File } from "@/lib/types";
import { FileIcon, Folder as FolderIcon } from "lucide-react";
import type { files_table, folders_table } from "@/server/db/schema";
import Link from "next/link";

export function FileRow(props: { file: typeof files_table.$inferSelect }) {
  const { file } = props;
  return (
    <div
      key={file.id}
      className="grid cursor-pointer grid-cols-12 items-center gap-4 px-4 py-3 text-sm hover:bg-gray-50"
    >
      <a
        href={file.url ?? `#`}
        className="col-span-6 flex items-center space-x-3"
        target="_blank"
      >
        <FileIcon className="h-5 w-5 text-gray-500" />
        <span className="text-gray-900">{file.name}</span>
      </a>
      <div className="col-span-3 text-gray-500">{file.size ?? "--"}</div>
    </div>
  );
}

export function FolderRow(props: {
  folder: typeof folders_table.$inferSelect;
}) {
  const { folder } = props;
  return (
    <div
      key={folder.id}
      className="grid cursor-pointer grid-cols-12 items-center gap-4 px-4 py-3 text-sm hover:bg-gray-50"
    >
      <Link
        href={`/f/${folder.id}`}
        className="col-span-6 flex items-center space-x-3"
      >
        <FolderIcon className="h-5 w-5 text-gray-500" />
        <span className="text-gray-900">{folder.name}</span>
      </Link>
      {/* <div className="col-span-3 text-gray-500">{folder.modified}</div> */}
      {/* <div className="col-span-3 text-gray-500">{folder.size ?? "--"}</div> */}
    </div>
  );
}
