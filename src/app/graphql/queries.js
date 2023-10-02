import { GraphQLClient, gql } from 'graphql-request';

const client = new  GraphQLClient('http://localhost:9000/graphql');



export async function getBudgets(limit, offset) {
    const query =  gql`
    query Budget($limit: Int, $offset: Int) {
        budgets(limit: $limit, offset: $offset) {
            items {
            _id
            expense
            expenseType
            assignedTo
            estimatedPrice
            lastUpdatedDate
            }
            totalCount
        }
    }
    `;

    const { budgets } = await client.request(query,{limit, offset});
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