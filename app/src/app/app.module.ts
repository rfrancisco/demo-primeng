import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BasicClientSideTableComponent } from './components/basic-client-side.component';
import { BasicServerSideTableComponent } from './components/basic-server-side.component';
import { CompleteServerSideTableComponent } from './components/complete-server-side.component';
import { CompleteClientSideTableComponent } from './components/complete-client-side.component';

import { ServicesModule } from './services';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    BasicClientSideTableComponent,
    BasicServerSideTableComponent,
    CompleteServerSideTableComponent,
    CompleteClientSideTableComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ServicesModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    InputSwitchModule,
    InputTextModule,
    MultiSelectModule,
    ProgressBarModule,
    SelectButtonModule,
    TableModule,
    TabMenuModule,
    ToggleButtonModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'basic-client-side', pathMatch: 'full' },
      { path: 'basic-client-side', component: BasicClientSideTableComponent },
      { path: 'basic-server-side', component: BasicServerSideTableComponent },
      { path: 'complete-server-side', component: CompleteServerSideTableComponent },
      { path: 'complete-client-side', component: CompleteClientSideTableComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
