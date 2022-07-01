export interface IFile extends Blob {
  readonly lastModified: number;
  readonly name: string;
}
