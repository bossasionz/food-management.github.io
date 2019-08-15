import { total } from 'src/app/models/total';
import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/Item';
import { Subject, Observable, combineLatest } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  item: Item = {
    name: '',
    address: '',
    tel: ''
  };
  startAt = new Subject();
  endAt = new Subject();
  nameFilter: BehaviorSubject<string|null>;
  telFilter: BehaviorSubject<string|null>;
  addressFilter: BehaviorSubject<string|null>;
  items$: Observable<Item[]>;
  total: total;


  constructor(private itemService: ItemService, detail: AngularFirestore) {
    this.nameFilter = new BehaviorSubject(null);
    this.telFilter = new BehaviorSubject(null);
    this.addressFilter = new BehaviorSubject(null);
    this.items$ = combineLatest(
      this.nameFilter,
      this.telFilter,
      this.addressFilter
    ).pipe(
      switchMap(([name, tel, address]) =>
    {
          return detail.collection<Item>('items', ref => {
            let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
            if (name) {
              query = query.where('item.name', '==', this.item.name);
            }
            ;
            if (tel) {
              query = query.where('item.tel', '==', this.item.tel);
            }
            ;
            if (address) {
              query = query.where('item.address', '==', this.item.address);
            }
            ;
            return query;
          }).valueChanges();
        }
    ));
   }

  ngOnInit() {
  }

  onInsert() {
    if(this.item.name != '' && this.item.tel != '' && this.item.address != ''){
      this.itemService.addItem(this.item);
    }
  }
  
  filter() {
    this.nameFilter.next(this.item.name ? this.item.name : null); 
    this.telFilter.next(this.item.tel ? this.item.tel : null); 
    this.addressFilter.next(this.item.address ? this.item.address : null); 
  }


}