import { DEFAULT_CURRENCY_CODE, LOCALE_ID,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './template/header/header.component';
import { FooterComponent } from './template/footer/footer.component';
import { PaymentsComponent } from './components/payments/payments.component';

import { InputTextModule } from 'primeng/inputtext';
import { TabMenuModule } from 'primeng/tabmenu';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';

import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { ConfirmationService, MessageService } from "primeng/api";
registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PaymentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,

    InputTextModule,
    TabMenuModule,
    CardModule,
    ButtonModule,
    DialogModule,
    TooltipModule,
    ToastModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }, ConfirmationService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
