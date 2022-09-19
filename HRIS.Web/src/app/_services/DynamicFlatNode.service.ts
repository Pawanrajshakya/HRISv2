import { Injectable } from '@angular/core';
import { IMyInfoTree } from 'src/app/_models/IMyInfoTree';
import { MyInfoService } from 'src/app/_services/my-info.service';
import { DynamicFlatNode } from '../_models/DynamicFlatNode';
import { LoginService } from './login.service';
import { UserService } from './user.service';

/**
 * Database for dynamic data. When expanding a node in the tree, the data source will need to fetch
 * the descendants data from the database.
 */

@Injectable({ providedIn: 'root' })
export class DynamicFlatNodeService {
  /**
   *
   */
  rootLevelNodes: IMyInfoTree[] = [];
  dataMap = new Map<IMyInfoTree, IMyInfoTree[]>();

  constructor(
    private myInfoService: MyInfoService,
    private loginService: LoginService
  ) {
    //this.rootLevelNodes = this.myInfoService.myInfoTreeStaffs;
    //console.log('0', this.rootLevelNodes);
  }

  /** Initial data from database */
  initialData(): DynamicFlatNode[] {
    this.rootLevelNodes = this.myInfoService.tree;
    return this.rootLevelNodes.map((tree) => {
      // if (tree.ein === this.loginService.currentUser.ein) {
      this.myInfoService.GetChildren(tree).then((data) => {
        if (data) this.dataMap.set(tree, data);
      });
      return new DynamicFlatNode(
        tree,
        0,
        tree.children ? tree.children?.length > 0 : false
      );
      // } else {
      //   return new DynamicFlatNode({}, 0, true);
      // }
    });
  }

  getChildren(node: IMyInfoTree): IMyInfoTree[] | undefined {
    return this.dataMap.get(node);
  }

  isExpandable(node: IMyInfoTree): boolean {
    this.myInfoService.GetChildren(node).then((data) => {
      if (data) this.dataMap.set(node, data);
    });
    return (node.employeesCount ?? 0) > 0;
  }
}
