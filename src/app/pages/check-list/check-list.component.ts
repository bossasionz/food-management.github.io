import { FoodListComponent } from './../food-list/food-list.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { total } from 'src/app/models/total';
import { timestamp } from 'rxjs/operators';

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.css']
})
export class CheckListComponent implements OnInit {
  totals: total = {
    orderId: 62001,
    id: '',
    name:'',
    address:'',
    tel:'',
    foodName: '',
    sumTotal: 0,
    timeStamp: null,
  };
  orderSelectedList = [
    {
      id: null,
      order: [],
      total: null,
      sumNum: null
     }
   ]
  cloneData = [];
  order: any;
  items: any;
  total: any;
  sumNum: number;
  dialog: any;
  isCollapsed = [];

  constructor(public router: Router, private itemService: ItemService) { }

  ngOnInit() {
    this.items = JSON.parse(localStorage.getItem('id'))
    this.order = JSON.parse(localStorage.getItem('order'))
    this.total = JSON.parse(localStorage.getItem('total'))
    this.sumNum = JSON.parse(localStorage.getItem('num'))
    const cloneData = JSON.parse(JSON.stringify(this.orderSelectedList));
    this.orderSelectedList.push(cloneData);
    console.log(this.orderSelectedList)
  }

  confirmToSend() {
    this.totals.name = this.items.name;
    this.totals.tel = this.items.tel;
    this.totals.address = this.items.address;
    this.totals.foodName = JSON.stringify(this.order);
    this.totals.sumTotal = this.total;
    this.totals.timeStamp = this.itemService.timeStamp();
    this.itemService.addOrder(this.totals)
    this.router.navigate(['total']);
  }

  
  showOrder() {
    
  }
  
}