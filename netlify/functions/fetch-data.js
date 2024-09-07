const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { path } = event;

  // Fetch the data from your GitHub JSON file
  const response = await fetch('https://raw.githubusercontent.com/HussainFathy/next-netlify-starter/main/data.json');
  const data = await response.json();

  // Extract account number and endpoint from the correct part of the path
  const pathParts = path.split('/');
  const accountNumber = pathParts[5]; // Adjusting index to 5 to get the correct account number
  const endpoint = pathParts[6]; // Adjusting index to 6 for the endpoint

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

  // Default to return the full account details
  return {
    statusCode: 200,
    body: JSON.stringify(account),
  };
};
