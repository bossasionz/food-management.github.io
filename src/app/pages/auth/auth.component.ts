import { map } from 'rxjs/operators';
import { ItemService } from './../../services/item.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  email: string;
  password: string;
  loginForm: FormGroup;
  errorMessage: '';
  fb: any;

  constructor(public ItemService: ItemService, private router: Router) { }

  ngOnInit() {
  }
  

  tryLogin(value){
    this.ItemService.doLogin(value)
    .then(res => {
      this.router.navigate(['/order']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    })
  }

}
