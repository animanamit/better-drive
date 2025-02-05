"use client";

import { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import { FileRow, FolderRow } from "@/app/file-row";
import { Button } from "@/components/ui/button";
import type { files_table, folders_table } from "@/server/db/schema";

export default function DriveContents(props: {
  files: (typeof files_table.$inferSelect)[];
  folders: (typeof folders_table.$inferSelect)[];
}) {
  const [currentFolder, setCurrentFolder] = useState<number>(1);

  const handleFolderClick = (folderId: number) => {
    setCurrentFolder(folderId);
  };

  const breadcrumbs = useMemo(() => {
    const breadcrumbs = [];
    let currentId = currentFolder;

    while (currentId !== 1) {
      const folder = props.folders.find((folder) => folder.id === currentId);
      if (folder) {
        breadcrumbs.unshift(folder);
        currentId = folder.parent ?? 1;
      } else {
        break;
      }
    }

    return breadcrumbs;
  }, [currentFolder, props.folders]);

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
        <Button
          onClick={() => setCurrentFolder(1)}
          variant="ghost"
          className="mr-2 text-gray-300 hover:text-white"
        >
          My Drive
        </Button>
        {breadcrumbs.map((folder) => (
          <div key={folder.id} className="flex items-center">
            <ChevronRight className="mx-2 text-gray-500" size={16} />
            <Button
              onClick={() => handleFolderClick(folder.id)}
              variant="ghost"
              className="text-gray-300 hover:text-white"
            >
              {folder.name}
            </Button>
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
            <FolderRow
              key={folder.id}
              folder={folder}
              handleFolderClick={() => handleFolderClick(folder.id)}
            />
          ))}
          {props.files.map((file) => (
            <FileRow key={file.id} file={file} />
          ))}
        </div>
      </div>
    </div>
  );
}
