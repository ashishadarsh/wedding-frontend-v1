import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { cardDataService } from 'src/app/cardData.service';
import {deleteBudget} from '../../graphql/queries.js';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  cardData: {
    expenseType: string,
    expense:string,
    estimatedPrice:string,
    assignedTo:string,
    lastUpdatedDate:string,
  }[] = [];
  private dataSubscription: Subscription;
  constructor(private cardDataService: cardDataService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Subscribe to data$
    this.dataSubscription = this.cardDataService.data$.subscribe((data) => {
      console.log({data});
      
      this.cardData = data;
    });
  }

  ngOnDestroy() {
    // Unsubscribe from the subscription to avoid memory leaks
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  openBudget(id) {
    this.router.navigate(['edit',id], { relativeTo: this.route });
  }

  deleteBudget(id) {
    this.cardDataService.deleteCardData(id);
    deleteBudget(id);
  }
}