import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { cardDataService } from 'src/app/cardData.service';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import {saveBudget} from '../../graphql/queries.js'


@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
  providers: [cardDataService]
})
export class BudgetComponent implements OnInit {
  cardDataById: any;
  budgetForm: FormGroup;
  isOpen: boolean = false;

  constructor(private cardDataService: cardDataService, private route: ActivatedRoute, private router: Router) {
    console.log("hiii");
    
    this.route.params.subscribe((params: Params) => {
      console.log("hiiiiiii",params);
      if (params['id']) {
        console.log("hiiiiiii",params['id']);
        
        this.cardDataService.getCardData(params['id']).then((data) => {
          this.cardDataById = data;
          console.log({data});
          
          // setTimeout(() => {
            this.initializeForm();
            this.isOpen = true;
          // },2);
          
        });
      } else {
        this.initializeForm();
        this.isOpen = true;
      }
      
    })
    
  }

  ngOnInit() {
  }

  initializeForm() {
    if (this.cardDataById) {
      this.budgetForm = new FormGroup({
        'expenseType': new FormControl(this.cardDataById.expenseType, Validators.required),
        'expense': new FormControl(this.cardDataById.expense, Validators.required),
        'estimatedPrice': new FormControl(this.cardDataById.estimatedPrice, Validators.required),
        'assignedTo': new FormControl(this.cardDataById.assignedTo, Validators.required)
      });
    } else {
      this.budgetForm = new FormGroup({
        'expenseType': new FormControl(null, Validators.required),
        'expense': new FormControl(null, Validators.required),
        'estimatedPrice': new FormControl(null, Validators.required),
        'assignedTo': new FormControl(null, Validators.required)
      });
    }
  }

  onSubmit() {
    const _id = this.route.snapshot.params['id'];
    const { expenseType, expense, estimatedPrice, assignedTo } = this.budgetForm.value;
    
    saveBudget({ _id, expenseType, expense, estimatedPrice, assignedTo });
    this.router.navigate(['/budgets'], { relativeTo: this.route });
  }
}
