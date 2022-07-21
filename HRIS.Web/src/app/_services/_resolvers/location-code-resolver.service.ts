import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ILocation } from 'src/app/_models/ILocation';
import { CodeService } from '../code.service';

@Injectable({
  providedIn: 'root'
})
export class LocationCodeResolverService implements Resolve<ILocation[]> {

  constructor(private codeService: CodeService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ILocation[]> {
      return this.codeService.resolveLocation();
    }

}
