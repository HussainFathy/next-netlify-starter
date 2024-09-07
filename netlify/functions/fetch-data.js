const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { path, queryStringParameters } = event;
  const { start_date, end_date } = queryStringParameters || {};

  // Fetch the data from your GitHub JSON file
  const response = await fetch('https://raw.githubusercontent.com/HussainFathy/next-netlify-starter/main/data.json');
  const data = await response.json();

  // Split the path and check the structure
  const pathParts = path.split('/');

  // Validate path parts for debugging
  const accountNumber = pathParts[6]; // Corrected for account number
  const endpoint = pathParts[7]; // Corrected for endpoint (balance or transactions)

  // Log received values for debugging
  console.log(`Received account_number: ${accountNumber}, endpoint: ${endpoint}`);

  // If account_number is missing or invalid, return an error
  if (!accountNumber || !endpoint) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid account number or endpoint', account_received: accountNumber }),
    };
  }

  // Find the specific account from the fetched data
  const account = data.accounts.find(acc => acc.account_number === accountNumber);

  if (!account) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Account not found', account_received: accountNumber }),
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
