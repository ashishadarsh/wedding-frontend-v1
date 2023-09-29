import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BudgetsComponent } from "./budgets/budgets.component";
import { GuestsComponent } from "./guests/guests.component";
import { BudgetComponent } from "./budgets/budget/budget.component";
import { AuthComponent } from "./auth/auth.component";


const appRoutes: Routes = [
    {path: 'budgets', component: BudgetsComponent},
    {path: 'guests', component: GuestsComponent},
    {path:'budgets/edit/:id', component: BudgetComponent},
    {path:'budgets/add', component: BudgetComponent},
    {path: 'auth', component: AuthComponent},
    {path:'**', redirectTo: '/', pathMatch:'full'}
]
  
@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports : [
        RouterModule
    ]
})
export class AppRoutingModule {

}