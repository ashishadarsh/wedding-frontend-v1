import {getBudgets, getBudgetById} from './graphql/queries.js'
export class cardDataService {
    // cardData = [
    //     {
    //         expenseType: "Food & Beverage",
    //         expense:"Starters",
    //         estimatedPrice:"Rs. 250000",
    //         assignedTo:"Ashish",
    //         lastUpdateDate:"Sept 9, 2023",
    //     },
    //     {
    //         expenseType: "Apparel",
    //         expense:"Manicure & Pedicure",
    //         estimatedPrice:"Rs 30000",
    //         assignedTo:"Akash",
    //         lastUpdateDate:"Sept 9, 2023",
    //     },
    //     {
    //         expenseType: "Apparel",
    //         expense:"Bridesmaid Accessories",
    //         estimatedPrice:"Rs 15000",
    //         assignedTo:"Juhi",
    //         lastUpdateDate:"Sept 9, 2023",
    //     },
    //     {
    //         expenseType: "Entertainment",
    //         expense:"Sound System & DJ",
    //         estimatedPrice:"Rs 20000",
    //         assignedTo:"Abhik",
    //         lastUpdateDate:"Sept 9, 2023",
    //     },
    //]
    public cardData = []; // Initialize an empty array
    public cardDataById = {};
    constructor() {
      
       
        getBudgets().then((budget) => {
            this.cardData.push(budget); // Add the budget object to the cardData array
            // Check if cardData contains 4 objects and then merge them into the main array
            if (this.cardData.length === 4) {
                const mergedArray = [].concat.apply([], this.cardData); // Flatten the nested array
                console.log(mergedArray);
            }
        });
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
}