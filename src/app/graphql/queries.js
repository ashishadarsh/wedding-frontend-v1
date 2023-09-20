import { GraphQLClient, gql } from 'graphql-request';

const client = new  GraphQLClient('http://localhost:9000/graphql');



export async function getBudgets() {
    const query =  gql`
    query Budget {
        budgets {
          _id
          expenseType
          expense
          estimatedPrice
          assignedTo
          lastUpdatedDate
        }
      }
    `;

    const { budgets } = await client.request(query);
    return budgets
}

export async function getBudgetById(_id) {
    const query = gql`
        query BudgetById($id: ID!) {
        budget(_id: $id) {
            _id
            expenseType
            expense
            estimatedPrice
            assignedTo
            lastUpdatedDate
        }
        }
    `;

const { budget } = await client.request(query, { id: _id });
return budget
}

export async function saveBudget({_id, expenseType,expense,estimatedPrice,assignedTo}) {
    console.log("front",expenseType);
    const mutation = gql`
        mutation saveBudget($input: BudgetInput!) {
            budget: saveBudget(input: $input) {
                _id
            }
        }
    `
    const {budget} = await client.request(mutation,{
        input : {
            _id,
            expenseType,
            expense,
            estimatedPrice,
            assignedTo
        }
    });
    console.log({budget});
    return budget;
}