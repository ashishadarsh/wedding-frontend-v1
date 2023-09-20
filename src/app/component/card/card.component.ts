import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cardDataService } from 'src/app/cardData.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  providers: [cardDataService]
})
export class CardComponent implements OnInit {
  cardData: {
    expenseType: string,
    expense:string,
    estimatedPrice:string,
    assignedTo:string,
    lastUpdatedDate:string,
  }[] = [];

  constructor(private cardDataService: cardDataService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.cardData = this.cardDataService.cardData;
  }

  openBudget(id) {
    this.router.navigate(['edit',id], { relativeTo: this.route });
  }
}
