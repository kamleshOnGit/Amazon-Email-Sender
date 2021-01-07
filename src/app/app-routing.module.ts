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
import { TextEditorComponent } from './modules/text-editor/text-editor.component';
import { AuthGuard } from './shared/auth.guard';
import {AllowUsersComponent} from './modules/allow-users/allow-users.component';
import { ViewproductsComponent} from './employee/viewproducts/viewproducts.component';
import { VieworderComponent} from './employee/vieworder/vieworder.component';
import { ViewuniquesComponent} from './employee/viewuniques/viewuniques.component';
import { CustomerInfoComponent} from './support/customer-info/customer-info.component';
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
      canActivate: [AuthGuard ],
      children : [
        {
          path: '',
          component: DashboardComponent,
          canActivateChild: [AuthGuard ]
        },
      {
        path: 'products',
        component: ProductsComponent,
        canActivateChild: [AuthGuard ]
      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivateChild: [AuthGuard ]
      },
      {
        path: 'uniqueKey',
        component: UniqueKeysComponent,
        canActivateChild: [AuthGuard ]
      },
      {
        path: 'emailtemplate',
        component: EmailTemplateComponent,
        canActivateChild: [AuthGuard ]
      },
      {
        path: 'settings',
        component: SettingComponent,
        canActivateChild: [AuthGuard ]
      },
      {
        path: 'allow-users',
        component: AllowUsersComponent,
        canActivateChild: [AuthGuard ]
      },
      {
        path: 'manual-Email',
        component: SendManualEmailComponent,
        canActivateChild: [AuthGuard ]
      },
      {
        path: 'edit-email-template',
        component: TextEditorComponent,
        canActivateChild: [AuthGuard ]
      }
    ]
  },
  {
    path: 'superadmin',
    component: DefaultComponent,
    canActivate: [AuthGuard ],
    children : [
      {
        path: '',
        component: DashboardComponent,
        canActivateChild: [AuthGuard ]
      },
    {
      path: 'manual-Order-Processing',
      component: ManualOrderProcessingComponent,
      canActivateChild: [AuthGuard ]
    },
    {
      path: 'email-settings',
      component: EmailSettingsComponent,
      canActivateChild: [AuthGuard ]
    },
    {
      path: 'users',
      component: UsersComponent,
      canActivateChild: [AuthGuard ]
    },
    {
      path: 'vendors',
      component: VendorsComponent,
      canActivateChild: [AuthGuard ]
    },
    {
      path: 'system-setting',
      component: SystemSettingComponent,
      canActivateChild: [AuthGuard ]
    }
  ]
},
{
  path: 'employee',
  component: DefaultComponent,
  canActivate: [AuthGuard ],
  children : [
    {
      path: '',
      component: DashboardComponent,
      canActivateChild: [AuthGuard ]
    },
  {
    path: 'products',
    component: ViewproductsComponent,
    canActivateChild: [AuthGuard ]
  },
  {
    path: 'orders',
    component: VieworderComponent,
    canActivateChild: [AuthGuard ]
  },
  {
    path: 'uniqueKey',
    component: ViewuniquesComponent,
    canActivateChild: [AuthGuard ]
  },

]
},
{
  path: 'support',
  component: DefaultComponent,
  canActivate: [AuthGuard ],
  children : [
    {
      path: '',
      component: DashboardComponent,
      canActivateChild: [AuthGuard ]
    },
  {
    path: 'customer-Info',
    component: CustomerInfoComponent,
    canActivateChild: [AuthGuard ]
  }

]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
