const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { path, queryStringParameters } = event;
  const { start_date, end_date } = queryStringParameters || {};

  // Fetch the data from your GitHub JSON file
  const response = await fetch('https://raw.githubusercontent.com/HussainFathy/next-netlify-starter/main/data.json');
  const data = await response.json();

  // Use the original path as it's coming from the event
  const cleanedPath = path;

  // Split the cleaned path
  const pathParts = cleanedPath.split('/');

  // Check if pathParts contain enough segments
  if (pathParts.length < 4) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid path structure', path_received: cleanedPath }),
    };
  }

  // Capture the account number and endpoint correctly based on the URL structure
  const accountNumber = pathParts[2]; // The account number should now be at index 2
  const endpoint = pathParts[3]; // The endpoint (balance or transactions) should now be at index 3

  // Enhanced debugging to check what's being passed
  if (endpoint !== 'balance' && endpoint !== 'transactions') {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid endpoint', endpoint_received: endpoint })
    };
  }

  // Debugging response
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Debugging response',
      accountNumber: accountNumber,
      endpoint: endpoint,
      fullPath: cleanedPath,
      pathParts: pathParts
    }),
  };

  // Below logic can be used after debugging

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
