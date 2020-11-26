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
import {LoginComponent} from './auth/login/login.component';
import {ForgetpasswordComponent} from './auth/forgetpassword/forgetpassword.component';
import { VendorsComponent } from './superAdmin/vendors/vendors.component';
import { UsersComponent } from './superAdmin/users/users.component';
import { EmailSettingsComponent } from './superAdmin/email-settings/email-settings.component';
import { ManualOrderProcessingComponent } from './superAdmin/manual-order-processing/manual-order-processing.component';
import { SystemSettingComponent } from './superAdmin/system-setting/system-setting.component';


const routes: Routes = [{
      path: '',
      component: LoginComponent,
    },
    {
      path: 'forgetpassword',
      component: ForgetpasswordComponent,
    }, {
      path: 'admin',
      component: DefaultComponent,
      children : [
        {
          path: '',
          component: DashboardComponent,
        },
      {
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
      {
        path: 'manual-Order-Processing',
        component: ManualOrderProcessingComponent
      },
      {
        path: 'email-settings',
        component: EmailSettingsComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'vendors',
        component: VendorsComponent
      },
      {
        path: 'system-setting',
        component: SystemSettingComponent
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
