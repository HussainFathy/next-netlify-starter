const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { accountNumber, transactionId } = event.queryStringParameters;
  
  // Fetch the data from your GitHub JSON file
  const response = await fetch('https://raw.githubusercontent.com/HussainFathy/next-netlify-starter/main/data.json');
  const data = await response.json();
  
  // If accountNumber is provided, filter the account
  if (accountNumber) {
    const account = data.accounts.find(acc => acc.account_number === accountNumber);
    if (!account) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Account not found' }),
      };
    }
    
    // If transactionId is also provided, filter the transaction
    if (transactionId) {
      const transaction = account.transactions.find(tx => tx.transaction_id === transactionId);
      if (!transaction) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: 'Transaction not found' }),
        };
      }
      return {
        statusCode: 200,
        body: JSON.stringify(transaction),
      };
    }
    
    // If no transactionId, return the account details
    return {
      statusCode: 200,
      body: JSON.stringify(account),
    };
  }
  
  // If no accountNumber provided, return all data
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
