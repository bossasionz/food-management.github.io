import { ItemService } from './../services/item.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public firebaseAuth: AngularFireAuth,
    public ItemService: ItemService,
    private router: Router
  ) {}

  canActivate(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.ItemService.getCurrentUser()
      .then(user => {
        this.router.navigate(['/order']);
        return resolve(false);
      }, err => {
        return resolve(true);
      })
    })
  }
}