const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { path, queryStringParameters } = event;
  const { start_date, end_date } = queryStringParameters || {};

  // Fetch the data from your GitHub JSON file
  const response = await fetch('https://raw.githubusercontent.com/HussainFathy/next-netlify-starter/main/data.json');
  const data = await response.json();

  // Split the path and check the structure
  const pathParts = path.split('/');

  // Check the length of pathParts to avoid incorrect indexing
  if (pathParts.length < 8) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid path structure', path_received: path }),
    };
  }

  // Capture the account number and endpoint correctly based on the URL structure
  const accountNumber = pathParts[6]; // Account number should be in the 6th position
  const endpoint = pathParts[7]; // The endpoint (balance or transactions) should be in the 7th position

  // Return the account number and endpoint received for debugging
  if (!accountNumber || !endpoint) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid account number or endpoint', account_received: accountNumber, endpoint_received: endpoint }),
    };
  }

  // Find the specific account from the fetched data
  const account = data.accounts.find(acc => acc.account_number === accountNumber);

  // If account is not found, return the account number and the endpoint
  if (!account) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Account not found', account_received: accountNumber, endpoint_received: endpoint }),
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
