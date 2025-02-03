import { type Folder, type File } from "@/lib/types";
import { FileIcon, Folder as FolderIcon } from "lucide-react";

export function FileRow(props: { file: File }) {
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
      <div className="col-span-3 text-gray-500">{file.type}</div>
      <div className="col-span-3 text-gray-500">{file.size ?? "--"}</div>
    </div>
  );
}

export function FolderRow(props: {
  folder: Folder;
  handleFolderClick: () => void;
}) {
  const { folder, handleFolderClick } = props;
  return (
    <div
      key={folder.id}
      onClick={() => handleFolderClick()}
      className="grid cursor-pointer grid-cols-12 items-center gap-4 px-4 py-3 text-sm hover:bg-gray-50"
    >
      <a href="#" className="col-span-6 flex items-center space-x-3">
        <FolderIcon className="h-5 w-5 text-gray-500" />
        <span className="text-gray-900">{folder.name}</span>
      </a>
      {/* <div className="col-span-3 text-gray-500">{folder.modified}</div> */}
      {/* <div className="col-span-3 text-gray-500">{folder.size ?? "--"}</div> */}
    </div>
  );
}
