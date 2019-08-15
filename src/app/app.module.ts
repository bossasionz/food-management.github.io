import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderComponent } from './pages/order/order.component';
import { FoodListComponent } from './pages/food-list/food-list.component';
import { TotalComponent } from './pages/total/total.component';
import { AuthComponent } from './pages/auth/auth.component';
import { NavBarComponent } from './option/nav-bar/nav-bar.component';
import { ItemService } from './services/item.service';
import { AddItemComponent } from './option/add-item/add-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './option/login/login.component';
import { CheckListComponent } from './pages/check-list/check-list.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    FoodListComponent,
    TotalComponent,
    AuthComponent,
    NavBarComponent,
    AddItemComponent,
    LoginComponent,
    CheckListComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'Food-Management'),
    AngularFirestoreModule,
    NgbModule,
    AngularFireAuthModule
  ],
  providers: [ItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }