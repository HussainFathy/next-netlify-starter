const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { path, queryStringParameters } = event;
  const { start_date, end_date } = queryStringParameters || {};

  // Fetch the data from your GitHub JSON file
  const response = await fetch('https://raw.githubusercontent.com/HussainFathy/next-netlify-starter/main/data.json');
  const data = await response.json();

  // Check if path contains '/.netlify/functions/fetch-data' and clean it up (if necessary)
  const cleanedPath = path.includes('/.netlify/functions/fetch-data')
    ? path.replace('/.netlify/functions/fetch-data', '')
    : path;

  // Split the cleaned path
  const pathParts = cleanedPath.split('/');

  // Return the full cleaned path and its parts for debugging
  if (pathParts.length < 4) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Invalid path structure',
        path_received: cleanedPath,         // The full path being processed
        path_parts: pathParts               // The individual parts of the path
      }),
    };
  }

  // Capture the account number and endpoint based on the URL structure
  const accountNumber = pathParts[2]; // The account number is at index 2
  const endpoint = pathParts[3]; // The endpoint (balance) is at index 3

  // Enhanced debugging to check what's being passed
  if (endpoint !== 'balance') {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Invalid endpoint',
        endpoint_received: endpoint,
        fullPath: cleanedPath,
        pathParts: pathParts
      })
    };
  }

  // Return the path and parts to confirm they are correct
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Debugging response',
      accountNumber: accountNumber,
      endpoint: endpoint,
      fullPath: cleanedPath,                // The full path after cleaning
      pathParts: pathParts                  // The split path parts
    }),
  };

  // Once debugging is complete, enable the logic to handle balance

  // Find the specific account from the fetched data
  const account = data.accounts.find(acc => acc.account_number === accountNumber);

  // If account is not found, return an error
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

  // Default to return the full account details if no specific endpoint is found
  return {
    statusCode: 200,
    body: JSON.stringify(account),
  };
};
