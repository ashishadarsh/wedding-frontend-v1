import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cardDataService } from '../cardData.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent {
  public newBudget: boolean = false;
  public currentPage: number;
  public totalPageCount: number;
  private countDataSubscription: Subscription;
  constructor(private cardDataService: cardDataService, private router: Router, private route: ActivatedRoute) {
    this.currentPage = this.cardDataService.currentPage;
    this.countDataSubscription = this.cardDataService.countData$.subscribe((data) => {
      console.log("inside card component",data);
      
      if(data) {
        this.totalPageCount = Math.ceil(data.totalCount/this.cardDataService.Budgets_Per_Page);
      }
      
    });
    
  }

  AddBudget() {
    this.newBudget = true;
    // this.router.navigate(['65488e5ebc044ee16aa0b801'], { relativeTo: this.route });
    this.router.navigate(['add'], {relativeTo: this.route});
  }

  onNext() {
    if(this.cardDataService.currentPage < this.totalPageCount) {
      this.cardDataService.currentPage++;
      this.currentPage = this.cardDataService.currentPage;
      this.cardDataService.getBudgetsData(this.cardDataService.Budgets_Per_Page, (this.currentPage-1) * this.cardDataService.Budgets_Per_Page);
    
    }
    
  }

  onPrevious() {
    if(this.cardDataService.currentPage > 1) {
      this.cardDataService.currentPage--;
      this.currentPage = this.cardDataService.currentPage;
      this.cardDataService.getBudgetsData(this.cardDataService.Budgets_Per_Page, (this.currentPage-1) * this.cardDataService.Budgets_Per_Page);
    }
  }
}
