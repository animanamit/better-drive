"use client";

import { useState } from "react";
import {
  FileIcon,
  Folder,
  Image,
  FileText,
  Search,
  ChevronRight,
} from "lucide-react";
import { files } from "@/lib/data";
import type { File, FileType } from "@/lib/types";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPath, setCurrentPath] = useState<string[]>(["root"]);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);

  // Get current folder's files
  const getCurrentFiles = () => {
    if (searchQuery) {
      return files.filter((file) =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    return files.filter((file) => file.parentId === currentFolder);
  };

  // Get breadcrumb data
  const getBreadcrumbs = () => {
    const breadcrumbs = [{ id: "root", name: "My Drive" }];

    if (currentFolder) {
      const folder = files.find((f) => f.id === currentFolder);
      if (folder) {
        breadcrumbs.push({ id: folder.id, name: folder.name });
      }
    }

    return breadcrumbs;
  };

  // Handle folder click
  const handleFileClick = (file: File) => {
    if (file.type === "folder") {
      setCurrentFolder(file.id);
      setCurrentPath([...currentPath, file.name]);
    }
  };

  // Handle breadcrumb click
  const handleBreadcrumbClick = (index: number) => {
    if (index === 0) {
      setCurrentFolder(null);
      setCurrentPath(["root"]);
    } else {
      const folder = files.find((f) => f.name === currentPath[index]);
      if (folder) {
        setCurrentFolder(folder.id);
        setCurrentPath(currentPath.slice(0, index + 1));
      }
    }
  };

  const getIcon = (type: FileType) => {
    switch (type) {
      case "folder":
        return <Folder className="h-5 w-5 text-blue-500" />;
      case "image":
        return <Image className="h-5 w-5 text-green-500" />;
      case "pdf":
        return <FileText className="h-5 w-5 text-red-500" />;
      default:
        return <FileIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="mx-auto max-w-5xl p-8">
      {/* Search Bar */}
      <div className="relative mb-6 flex justify-between gap-x-4 rounded-lg">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
        <input
          type="text"
          placeholder="Search files..."
          className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button>Upload</Button>
      </div>

      {/* Breadcrumbs */}
      <div className="mb-6 flex items-center space-x-2 text-sm">
        {getBreadcrumbs().map((crumb, index) => (
          <div key={crumb.id} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
            )}
            <button
              onClick={() => handleBreadcrumbClick(index)}
              className={`hover:text-blue-500 ${
                index === getBreadcrumbs().length - 1
                  ? "font-medium text-gray-900"
                  : "text-gray-600"
              }`}
            >
              {crumb.name}
            </button>
          </div>
        ))}
      </div>

      {/* Files List */}
      <div className="rounded-lg border border-gray-200 bg-white">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 border-b border-gray-200 px-4 py-3 text-sm font-medium text-gray-500">
          <div className="col-span-6">Name</div>
          <div className="col-span-3">Modified</div>
          <div className="col-span-3">Size</div>
        </div>

        {/* Files */}
        <div className="divide-y divide-gray-100">
          {getCurrentFiles().map((file) => (
            <div
              key={file.id}
              onClick={() => handleFileClick(file)}
              className="grid cursor-pointer grid-cols-12 items-center gap-4 px-4 py-3 text-sm hover:bg-gray-50"
            >
              <div className="col-span-6 flex items-center space-x-3">
                {getIcon(file.type)}
                <span className="text-gray-900">{file.name}</span>
              </div>
              <div className="col-span-3 text-gray-500">{file.modified}</div>
              <div className="col-span-3 text-gray-500">
                {file.size ?? "--"}
              </div>
            </div>
          ))}

          {getCurrentFiles().length === 0 && (
            <div className="px-4 py-8 text-center text-gray-500">
              {searchQuery ? "No files found" : "This folder is empty"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
