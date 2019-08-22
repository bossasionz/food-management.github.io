import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { total } from 'src/app/models/total';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.css']
})
export class TotalComponent implements OnInit {
  menus: total[];
  items: any;
  total: any;
  allTotal: any;
  listOrder: any;
  foodName: any;
  orderSelectedList = [];
  menuByOrderList: any

  constructor(private itemService: ItemService, private modalService: NgbModal) { }

  ngOnInit() {
    this.itemService.sortByDate();
    this.itemService.getTotalOrder().subscribe(menus => {
      this.menus = menus;
      this.menus.forEach(item => {
        item.foodName = JSON.parse(item.foodName);
        });
      let allTotal = 0;
      menus.forEach(order => {
        allTotal += order['sumTotal']
      })
      this.allTotal = allTotal;
    });
  }

  openModal(modalShowMenuList, foodName) {
    this.menuByOrderList = [];
    this.modalService.open(modalShowMenuList, { size: 'lg' });
    this.menuByOrderList = foodName;
    console.log(this.menuByOrderList)
  }
}
