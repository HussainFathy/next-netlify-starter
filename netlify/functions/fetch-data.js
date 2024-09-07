const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { path } = event;

  // Log the full path received in the request
  console.log('Full path received:', path);

  // Extract the account number from the path
  const pathParts = path.split('/');
  const accountNumber = pathParts[2]; // Assuming the path is /accounts/{account_number}/balance

  // Fetch the data from your GitHub JSON file
  const response = await fetch('https://raw.githubusercontent.com/HussainFathy/next-netlify-starter/main/data.json');
  const data = await response.json();

  // Debugging: log the fetched data
  console.log('Fetched data:', data);

  // Find the account matching the requested account number
  const account = data.accounts.find(acc => acc.account_number === accountNumber);

  // Check if the account was found
  if (!account) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: 'Account not found',
        accountNumberRequested: accountNumber
      }),
    };
  }

  // If the path is /accounts/{account_number}/balance, return the account balance
  if (path === `/accounts/${accountNumber}/balance`) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Account balance retrieved successfully",
        accountNumber: account.account_number,
        balance: account.balance,
        currency: account.currency
      }),
    };
  }

  // Return an error if the path structure is invalid
  return {
    statusCode: 400,
    body: JSON.stringify({
      error: 'Invalid path structure',
      path_received: path,
      expected: '/accounts/{account_number}/balance'
    }),
  };
};
