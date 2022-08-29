
export interface IMyInfoTree {
  ein?: string;
  name?: string;
  employeesCount?: number;
  children?: IMyInfoTree[];
}

export interface ITreeNode {
  expandable:boolean;
  name:string;
  level:number;
}

// export class DynamicFlatNode {
//   constructor(
//     public item: string,
//     public level = 1,
//     public expandable = false,
//     public isLoading = false,
//   ) {}
// }