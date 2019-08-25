import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private Router: Router) { }

  ngOnInit() {
  }

  redirectToOrder() {
    this.Router.navigate(['/order']);
  }

  redirectToTotal() {
    this.Router.navigate(['/total']);
  }

}
