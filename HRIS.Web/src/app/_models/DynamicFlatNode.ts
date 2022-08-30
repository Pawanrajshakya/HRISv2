import { IMyInfoTree } from 'src/app/_models/IMyInfoTree';

/** Flat node with expandable and level information */

export class DynamicFlatNode {
  constructor(
    public item: IMyInfoTree,
    public level = 1,
    public expandable = item.employeesCount && item.employeesCount > 0
      ? true
      : false,
    public isLoading = false
  ) { }
}
