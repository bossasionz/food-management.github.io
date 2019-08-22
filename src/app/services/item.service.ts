import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Item } from '../models/Item';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { total } from '../models/total';
import { AngularFireAuth } from '@angular/fire/auth';
import { firestore } from 'firebase';
import * as firebase from 'firebase';

@Injectable()
export class ItemService {
  itemCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  itemDoc: AngularFirestoreDocument<Item>;
  totalOrder: Observable<total[]>;
  totalCollection: any;
  menus: Observable<Item[]>;
  user: Observable<firebase.User>;
  totals: any;
  created: firebase.firestore.FieldValue;

  constructor(public detail: AngularFirestore, public menuOrder: AngularFirestore, private firebaseAuth: AngularFireAuth) {

    this.user = firebaseAuth.authState;
    this.itemCollection = this.detail.collection('items');
    this.totalCollection = this.menuOrder.collection('totalOrder');

    // this.items = this.detail.collection('items').valueChanges();
    this.menus = this.menuOrder.collection('totalOrder').snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Item;
          data.id = a.payload.doc.id;
          return data;
        });
      }));

    this.items = this.detail.collection('items').snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Item;
          data.id = a.payload.doc.id;
          return data;
        });
      }));
  }

  addItem(item: Item) {
    this.itemCollection.add(item);
  }

  getItems() {
    return this.items;
  }

  deleteItem(item: Item) {
    this.itemDoc = this.detail.doc(`items/${item.id}`);
    this.itemDoc.delete();
  }

  getDetailById(id) {
    return this.detail.collection('items').doc(id).valueChanges()
  }

  addOrder(totalOrder: total) {
    this.totalCollection.add(totalOrder)
  }

  getTotalOrder() {
    return this.menus;
  }

  getCurrentUser(){
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function(user){
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      })
    })
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this.firebaseAuth.auth.signOut();
        resolve();
      }
      else{
        reject();
      }
    });
  }

  timeStamp() {
    return firestore.FieldValue.serverTimestamp();
  }

  sortByDate() {
    this.items = this.menuOrder.collection('test', ref => ref.orderBy('createdAt')).valueChanges();
  }

}