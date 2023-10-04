import { GraphQLClient, gql } from 'graphql-request';

let authToken = localStorage.getItem('authToken');

const client = new  GraphQLClient('http://localhost:9000/graphql',
    {headers: {
        Authorization: `Bearer ${authToken}`, // Include the token in the "Authorization" header
      },
    }
);

export async function updateAuthToken(newToken) {
    console.log({newToken});
    authToken = newToken; 
  }

export async function getBudgets(limit, offset) {
    console.log("called");
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

    const { budgets } = await client.request(query,{limit, offset}, {
        Authorization: `Bearer ${authToken}`,
      });
      console.log({budgets});
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

const { budget } = await client.request(query, { id: _id }, {
    Authorization: `Bearer ${authToken}`,
  });
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
    }, {
        Authorization: `Bearer ${authToken}`,
      });
    console.log({budget});
    return budget;
}

export async function deleteBudget(id) {
    const mutation = gql`
        mutation($id: ID!) {
            deleteBudget(_id: $id) {
                userId
                assignedTo
            }
        }
    `;
        const {budget} = await client.request(mutation,
            {
                id
            }, 
            {
            Authorization: `Bearer ${authToken}`,
        });
        return budget;
}