import { BehaviorSubject } from 'rxjs';
import {getBudgets, getBudgetById} from './graphql/queries.js'
export class cardDataService {
    public cardData = []; // Initialize an empty array
    public cardDataById = {};
    public Budgets_Per_Page = 8;
    public currentPage = 1;
    private dataSubject = new BehaviorSubject<any>(null);
    private countSubject = new BehaviorSubject<any>(null);
    public totalPageCount: number;

  // Expose an observable for subscribers to listen for changes
  public data$ = this.dataSubject.asObservable();
  public countData$ = this.countSubject.asObservable();

    constructor() {
         this.getBudgetsData(this.Budgets_Per_Page, 0);
    }

    async getBudgetsData(limit, offset) {
        try {
            const budgets = await getBudgets(limit, offset);
            console.log("this.currentPage * this.Budgets_Per_Page", this.currentPage * this.Budgets_Per_Page);
            console.log("inside carddataservice", budgets);
          this.cardData = [];
            this.cardData.push(...budgets.items); // Add the budget object to the cardData array
            this.dataSubject.next(this.cardData);
            this.totalPageCount = budgets.totalCount/ this.Budgets_Per_Page;
            this.countSubject.next(budgets);
            // Check if cardData contains 4 objects and then merge them into the main array
            if (this.cardData.length === 4) {
                const mergedArray = [].concat.apply([], this.cardData); // Flatten the nested array
                console.log(mergedArray);
                // Clear the cardData array after merging
                this.cardData.length = 0;
            }
        } catch (error) {
            console.error("Error fetching budgets:", error);
        }
    }
    
    
    addCardData(expenseType: string, expense: string, estimatedPrice: string, assignedTo: string, lastUpdateDate: string) {
        this.cardData.push({
            expenseType: expenseType,
            expense: expense, 
            estimatedPrice: estimatedPrice,
            assignedTo: assignedTo,
            lastUpdateDate: lastUpdateDate
        });
    }

    async getCardData(id) {
        return getBudgetById(id);
    }

    deleteCardData(id) {
        this.cardData = this.cardData.filter(item => {
          return item._id !== id; // Use '!==' to exclude the matching item
        });
        this.dataSubject.next(this.cardData);
      }
}