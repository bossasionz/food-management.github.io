import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/services/item.service';
import { Item } from '../../models/Item';
import { ActivatedRoute } from '@angular/router';
import { total } from 'src/app/models/total';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  items: Item[];
  totals: total[];
  router: any;

  
  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.getItems().subscribe(items => {
      this.items = items;
    });
    
  }

  deleteItem(event, item) {
    this.itemService.deleteItem(item);
  }

  goToProductDetails(id) {
    this.router.navigate(['/food-list', id]);
  }
}
