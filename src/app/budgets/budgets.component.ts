import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cardDataService } from '../cardData.service';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css'],
  providers: [cardDataService]
})
export class BudgetsComponent {
  public newBudget: boolean = false;

  constructor(private cardDataService: cardDataService, private router: Router, private route: ActivatedRoute) {

  }

  AddBudget() {
    this.newBudget = true;
    // this.router.navigate(['65488e5ebc044ee16aa0b801'], { relativeTo: this.route });
    this.router.navigate(['add'], {relativeTo: this.route});
  }
}
