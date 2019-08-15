import { ItemService } from './../../services/item.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  email: string;
  password: string;

  constructor(public ItemService: ItemService) { }

  ngOnInit() {
  }

  login() {
    this.ItemService.login(this.email, this.password);
    this.email = this.password = '';    
  }

  logout() {
    this.ItemService.logout();
  }
}
