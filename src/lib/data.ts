import type { File } from "./types";

export const files: File[] = [
  // Root folders
  {
    id: "documents",
    name: "Documents",
    type: "folder",
    modified: "Jan 17, 2024",
    parentId: null,
  },
  {
    id: "images",
    name: "Images",
    type: "folder",
    modified: "Jan 16, 2024",
    parentId: null,
  },
  // Documents folder contents
  {
    id: "proposal",
    name: "Project Proposal",
    type: "document",
    size: "2.1 MB",
    modified: "Jan 15, 2024",
    parentId: "documents",
  },
  {
    id: "budget",
    name: "Budget 2024",
    type: "document",
    size: "1.8 MB",
    modified: "Jan 14, 2024",
    parentId: "documents",
  },
  {
    id: "contract",
    name: "Contract",
    type: "pdf",
    size: "4.5 MB",
    modified: "Jan 12, 2024",
    parentId: "documents",
  },
  // Images folder contents
  {
    id: "team-photo",
    name: "Team Photo",
    type: "image",
    size: "3.2 MB",
    modified: "Jan 13, 2024",
    parentId: "images",
  },
  {
    id: "logo",
    name: "Company Logo",
    type: "image",
    size: "1.1 MB",
    modified: "Jan 11, 2024",
    parentId: "images",
  },
];
