import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DemoMaterialModule } from './modules/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { ProductsComponent } from './modules/products/products.component';
import { OrdersComponent } from './modules/orders/orders.component';
import { UniqueKeysComponent } from './modules/unique-keys/unique-keys.component';
import { EmailTemplateComponent } from './modules/email-template/email-template.component';
import { SettingComponent } from './modules/setting/setting.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DialogBoxComponent } from './shared/dialog-box/dialog-box.component';
// import { EmailTemplateDialogBoxComponent  } from './shared/email-template-dialog-box/email-template-dialog-box.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { CKEditorModule } from 'ng2-ckeditor';
import { MaterialTimePickerModule } from '@candidosales/material-time-picker';
import { TextEditorComponent } from './modules/text-editor/text-editor.component';
import { SendManualEmailComponent } from './modules/send-manual-email/send-manual-email.component';
import { VendorsComponent } from './superAdmin/vendors/vendors.component';
import { UsersComponent } from './superAdmin/users/users.component';
import { EmailSettingsComponent } from './superAdmin/email-settings/email-settings.component';
import { ManualOrderProcessingComponent } from './superAdmin/manual-order-processing/manual-order-processing.component';
import { SystemSettingComponent } from './superAdmin/system-setting/system-setting.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistorComponent } from './auth/registor/registor.component';
import { ForgetpasswordComponent } from './auth/forgetpassword/forgetpassword.component';
import { AuthInterceptor } from './shared/auth.config.interceptor';
import { AllowUsersComponent } from './modules/allow-users/allow-users.component';
import { VieworderComponent } from './employee/vieworder/vieworder.component';
import { ViewproductsComponent } from './employee/viewproducts/viewproducts.component';
import { ViewuniquesComponent } from './employee/viewuniques/viewuniques.component';
import { CustomerInfoComponent } from './support/customer-info/customer-info.component';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    OrdersComponent,
    UniqueKeysComponent,
    EmailTemplateComponent,
    SettingComponent,
    TextEditorComponent,
    SendManualEmailComponent,
    VendorsComponent,
    UsersComponent,
    EmailSettingsComponent,
    ManualOrderProcessingComponent,
    SystemSettingComponent,
    LoginComponent,
    RegistorComponent,
    ForgetpasswordComponent,
    AllowUsersComponent,
    VieworderComponent,
    ViewproductsComponent,
    ViewuniquesComponent,
    CustomerInfoComponent,
    DialogBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    CKEditorModule,
    MaterialTimePickerModule,
  ],
  entryComponents: [DialogBoxComponent, AppComponent],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
