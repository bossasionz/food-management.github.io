import { OrderComponent } from './../order/order.component';
import { Component, OnInit } from '@angular/core';
import { curryData } from "src/assets/JSON/Curry";
import { friedData } from 'src/assets/JSON/Fried';
import { soupData } from 'src/assets/JSON/Soup';
import { extraData } from 'src/assets/JSON/Extra';
import { newData } from 'src/assets/JSON/New';
import { otherData } from 'src/assets/JSON/Other';
import { ItemService } from 'src/app/services/item.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {
  menuCurry: any = curryData;
  menuFried: any = friedData;
  menuSoup: any = soupData;
  menuExtra: any = extraData;
  menuNew: any = newData;
  menuOther: any = otherData;
  orderSelectedList = [];
  cloneData = [];
  items: any;
  total: any;
  sumNum: number;

  constructor(private ItemService: ItemService, private route: ActivatedRoute, public router: Router) {
    this.route.params.subscribe(params=> {
      this.ItemService.getDetailById(params['id']).subscribe( i => {
        this.items = i;
        
      console.log(this.items);
    })
 });
 }

  ngOnInit() {
  }

  
  submitCurryMenu(menuCurrys) {
    const cloneData = JSON.parse(JSON.stringify(menuCurrys));
    this.orderSelectedList.push(cloneData);
    console.log(this.orderSelectedList);
  }
  
  submitNewMenu(menuNews) {
    const cloneData = JSON.parse(JSON.stringify(menuNews));
    this.orderSelectedList.push(cloneData);
    console.log(this.orderSelectedList);
  }

  submitFriedMenu(menuFrieds) {
    const cloneData = JSON.parse(JSON.stringify(menuFrieds));
    this.orderSelectedList.push(cloneData);
    console.log(this.orderSelectedList);
  }
  
  submitSoupMenu(menuSoups) {
    const cloneData = JSON.parse(JSON.stringify(menuSoups));
    this.orderSelectedList.push(cloneData);
    console.log(this.orderSelectedList);
  }
  
  submitExtra(menuExtras) {
    const cloneData = JSON.parse(JSON.stringify(menuExtras));
    this.orderSelectedList.push(cloneData);
    console.log(this.orderSelectedList);
  }
  
  submitOtherMenu(menuOthers) {
    const cloneData = JSON.parse(JSON.stringify(menuOthers));
    this.orderSelectedList.push(cloneData);
    console.log(this.orderSelectedList);
  }

  deleteSelectMenu(i) {
    this.orderSelectedList.splice(i, 1);
    console.log(this.orderSelectedList);
  }

  sum(menu) {
    let sumTotalPrice = 0;
    let sumNum = 0;
    const cloneData = JSON.parse(JSON.stringify(this.orderSelectedList));
    cloneData.forEach(order => {
      order.foodPrice *= order.foodNum;
      sumTotalPrice += order.foodPrice;
      if (order.optExtra == true){
        let extraPrice = order.foodNum * 5;
        sumTotalPrice = sumTotalPrice + extraPrice;
      }
      if (order.optEgg == true){
        let eggPrice = order.foodNum * 10;
        sumTotalPrice = sumTotalPrice + eggPrice;
      }
      sumNum += order.foodNum;
      console.log(order)
    });
    this.total = sumTotalPrice;
    this.sumNum = sumNum;
    console.log(this.total);
  }

  confirmOrder() {
    localStorage.setItem('id', JSON.stringify(this.items));
    localStorage.setItem('order', JSON.stringify(this.orderSelectedList));
    localStorage.setItem('total', JSON.stringify(this.total));
    localStorage.setItem('num', JSON.stringify(this.sumNum));
    this.router.navigate(['check-list']);
  }

}