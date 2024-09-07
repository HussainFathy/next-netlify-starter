const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { path, queryStringParameters } = event;
  const { start_date, end_date } = queryStringParameters || {};

  // Fetch the data from your GitHub JSON file
  const response = await fetch('https://raw.githubusercontent.com/HussainFathy/next-netlify-starter/main/data.json');
  const data = await response.json();

  // Extract the path and parameters
  const pathParts = path.split('/');
  const accountNumber = pathParts[5]; // Path like /accounts/{account_number}
  const endpoint = pathParts[6]; // e.g., 'balance' or 'transactions'

  // If it's the /accounts endpoint (no account number provided), return the list of all accounts
  if (pathParts[3] === 'accounts' && !accountNumber) {
    return {
      statusCode: 200,
      body: JSON.stringify(data.accounts),
    };
  }

  // Find the specific account
  const account = data.accounts.find(acc => acc.account_number === accountNumber);

  if (!account) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Account not found' }),
    };
  }

  // Handle /balance endpoint
  if (endpoint === 'balance') {
    return {
      statusCode: 200,
      body: JSON.stringify({ balance: account.balance, currency: account.currency }),
    };
  }

  // Handle /transactions endpoint
  if (endpoint === 'transactions') {
    let filteredTransactions = account.transactions;

    // Optionally filter by date range if provided
    if (start_date && end_date) {
      const startDate = new Date(start_date);
      const endDate = new Date(end_date);
      filteredTransactions = account.transactions.filter(tx => {
        const transactionDate = new Date(tx.date);
        return transactionDate >= startDate && transactionDate <= endDate;
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify(filteredTransactions),
    };
  }

  // Default to return the full account details if no specific endpoint is found
  return {
    statusCode: 200,
    body: JSON.stringify(account),
  };
};
