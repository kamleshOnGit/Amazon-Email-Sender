import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ProductsComponent } from './modules/products/products.component';
import { OrdersComponent } from './modules/orders/orders.component';
import { UniqueKeysComponent } from './modules/unique-keys/unique-keys.component';
import { EmailTemplateComponent } from './modules/email-template/email-template.component';
import { SettingComponent} from './modules/setting/setting.component';
import { SendManualEmailComponent} from './modules/send-manual-email/send-manual-email.component';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{
    path: '',
    component: DashboardComponent
  }, {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'uniqueKey',
    component: UniqueKeysComponent
  },
  {
    path: 'emailtemplate',
    component: EmailTemplateComponent
  },
  {
    path: 'settings',
    component: SettingComponent
  },
  {
    path: 'manual-Email',
    component: SendManualEmailComponent
  },
]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
