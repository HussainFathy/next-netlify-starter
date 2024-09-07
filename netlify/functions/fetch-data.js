const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { path, queryStringParameters } = event;
  const { start_date, end_date } = queryStringParameters || {};

  // Fetch the data from your GitHub JSON file
  const response = await fetch('https://raw.githubusercontent.com/HussainFathy/next-netlify-starter/main/data.json');
  const data = await response.json();

  // Debug: Return the original path received by the backend (no cleaning)
  const pathParts = path.split('/');

  // Hardcoded path handling for debugging
  if (path === "/accounts/1234567890/balance") {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Hardcoded path matched",
        accountNumber: "1234567890",
        balance: "1200.50",
        currency: "USD"
      }),
    };
  }

  // Return the full path and path parts for better debugging
  return {
    statusCode: 400,
    body: JSON.stringify({
      error: 'Invalid path structure',
      path_received: path,
      path_parts: pathParts,
      message: 'Expected path structure like /accounts/{account_number}/balance'
    }),
  };
};
