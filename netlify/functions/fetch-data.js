const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { path } = event;

  // Fetch the data from your GitHub JSON file
  const response = await fetch('https://raw.githubusercontent.com/HussainFathy/next-netlify-starter/main/data.json');
  const data = await response.json();

  // Extract account number and endpoint from the path
  const pathParts = path.split('/');
  const accountNumber = pathParts[3]; // This should give us '0987654321'
  const endpoint = pathParts[4]; // e.g., 'balance' or 'transactions'

  // Temporary debugging: Return pathParts in the response
  return {
    statusCode: 200,
    body: JSON.stringify({ accountNumber, endpoint, pathParts, data }),
  };

  // Commented code to test after debug
  // const account = data.accounts.find(acc => acc.account_number === accountNumber);

  // if (!account) {
  //   return {
  //     statusCode: 404,
  //     body: JSON.stringify({ error: 'Account not found' }),
  //   };
  // }

  // if (endpoint === 'balance') {
  //   return {
  //     statusCode: 200,
  //     body: JSON.stringify({ balance: account.balance, currency: account.currency }),
  //   };
  // }

  // return {
  //   statusCode: 200,
  //   body: JSON.stringify(account),
  // };
};
