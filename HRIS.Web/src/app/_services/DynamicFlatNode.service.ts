import { Injectable } from '@angular/core';
import { IMyInfoTree } from 'src/app/_models/IMyInfoTree';
import { MyInfoService } from 'src/app/_services/my-info.service';
import { DynamicFlatNode } from "../_models/DynamicFlatNode";

/**
 * Database for dynamic data. When expanding a node in the tree, the data source will need to fetch
 * the descendants data from the database.
 */

@Injectable({ providedIn: 'root' })
export class DynamicFlatNodeService {
  /**
   *
   */
  rootLevelNodes: IMyInfoTree[];
  dataMap = new Map<IMyInfoTree, IMyInfoTree[]>();

  constructor(private myInfoService: MyInfoService) {
    this.rootLevelNodes = this.myInfoService.root;
    console.log('0',this.myInfoService.root[0]);
    // this.myInfoService.selectedRoot.emit(this.myInfoService.root[0]);
  }

  /** Initial data from database */
  initialData(): DynamicFlatNode[] {
    return this.rootLevelNodes.map((tree) => {
      this.myInfoService.GetChildren(tree).then((data) => {
        console.log('2', data);
        if (data)
          this.dataMap.set(tree, data);
      });
      return new DynamicFlatNode(tree, 0, true);
    });
  }

  getChildren(node: IMyInfoTree): IMyInfoTree[] | undefined {
    return this.dataMap.get(node);
  }

  isExpandable(node: IMyInfoTree): boolean {
    this.myInfoService.GetChildren(node).then((data) => {
      if (data)
        this.dataMap.set(node, data);
    });
    return (node.employeesCount ?? 0) > 0;
  }
}
