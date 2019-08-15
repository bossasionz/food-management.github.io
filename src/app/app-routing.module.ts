import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TotalComponent } from './pages/total/total.component';
import { OrderComponent } from './pages/order/order.component';
import { FoodListComponent } from './pages/food-list/food-list.component';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './option/login/login.component';
import { CheckListComponent } from './pages/check-list/check-list.component';


const routes: Routes = [
  { path: 'auth', component: AuthComponent},
  { path: 'login', component: LoginComponent, canActivate: [AuthComponent] },
  { path: 'order', component: OrderComponent},
  { path: 'food-list/:id', component: FoodListComponent},
  { path: 'total', component: TotalComponent},
  { path: 'check-list', component: CheckListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }