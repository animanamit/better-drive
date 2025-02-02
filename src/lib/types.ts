export type FileType = "folder" | "document" | "image" | "pdf";

export interface File {
  id: string;
  name: string;
  type: FileType;
  size?: string;
  modified: string;
  parentId: string | null;
}
