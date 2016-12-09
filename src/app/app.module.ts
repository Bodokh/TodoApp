import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { AppComponent } from './app.component';
import { ListComponent } from './todolist/todolist.component';
import { TodolistService } from './todolist.service';

import { AppToastModule } from './app-toast-module'
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AppToastModule,
    Ng2Bs3ModalModule],
  declarations: [AppComponent, ListComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
