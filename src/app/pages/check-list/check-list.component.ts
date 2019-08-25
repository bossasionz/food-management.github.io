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
  dataOrder: any;

  constructor(public router: Router, private itemService: ItemService) { }

  ngOnInit() {
    this.dataOrder = JSON.parse(localStorage.getItem('orderList'));
    console.log(this.dataOrder)
  }

  confirmToSend(o, orderList) {
    console.log(this.totals)
    console.log(orderList)
    this.totals.name = orderList['item'].name;
    this.totals.tel = orderList['item'].tel;
    this.totals.address = orderList['item'].address;
    this.totals.foodName = JSON.stringify(orderList.order);
    this.totals.sumTotal = orderList.total;
    this.totals.timeStamp = this.itemService.timeStamp();
    this.itemService.addOrder(this.totals)
    this.dataOrder.splice(o, 1);
    localStorage.setItem('orderList', JSON.stringify(this.dataOrder));
    this.router.navigate(['total']);
  }

}