import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TableComponent } from './component/table/table.component';
import { CardComponent } from './component/card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { BudgetsComponent } from './budgets/budgets.component';
import { GuestsComponent } from './guests/guests.component';
import { BudgetComponent } from './budgets/budget/budget.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    CardComponent,
    BudgetsComponent,
    GuestsComponent,
    BudgetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
