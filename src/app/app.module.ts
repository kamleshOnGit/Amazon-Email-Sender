import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DemoMaterialModule } from './modules/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { ProductsComponent } from './modules/products/products.component';
import { OrdersComponent } from './modules/orders/orders.component';
import { UniqueKeysComponent } from './modules/unique-keys/unique-keys.component';
import { EmailTemplateComponent } from './modules/email-template/email-template.component';
import { SettingComponent } from './modules/setting/setting.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DialogBoxComponent } from './shared/dialog-box/dialog-box.component';
import { EmailTemplateDialogBoxComponent  } from './shared/email-template-dialog-box/email-template-dialog-box.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MaterialTimePickerModule } from '@candidosales/material-time-picker';
import { TextEditorComponent } from './modules/text-editor/text-editor.component';
import { SendManualEmailComponent } from './modules/send-manual-email/send-manual-email.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    OrdersComponent,
    UniqueKeysComponent,
    EmailTemplateComponent,
    SettingComponent,
    TextEditorComponent,
    SendManualEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    CKEditorModule,
    MaterialTimePickerModule
  ],
  entryComponents: [DialogBoxComponent, EmailTemplateDialogBoxComponent, AppComponent],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
