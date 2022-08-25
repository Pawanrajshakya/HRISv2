import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { IEmployeeBehavior } from 'src/app/_models/IEmployeeBehavior';
import { CodeService } from '../code.service';

@Injectable({
  providedIn: 'root'
})

export class EmployeeBehaviorCodeResolverService implements Resolve<IEmployeeBehavior[]> {
  constructor(private codeService: CodeService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<IEmployeeBehavior[]> {
    return this.codeService.resolveEmployeeBehavior();
  }

}