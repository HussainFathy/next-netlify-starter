const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { path, queryStringParameters } = event;
  const { start_date, end_date } = queryStringParameters || {};

  // Fetch the data from your GitHub JSON file
  const response = await fetch('https://raw.githubusercontent.com/HussainFathy/next-netlify-starter/main/data.json');
  const data = await response.json();

  // Debug: Return the original path received by the backend (before any cleaning)
  if (!path) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Path is missing in the request' }),
    };
  }

  // Log the full path for debugging
  const cleanedPath = path.includes('/.netlify/functions/fetch-data')
    ? path.replace('/.netlify/functions/fetch-data', '')
    : path;

  const pathParts = cleanedPath.split('/');

  // Return the full path and path parts for better debugging
  return {
    statusCode: 400,
    body: JSON.stringify({
      error: 'Invalid path structure',
      path_received: cleanedPath,
      path_parts: pathParts,
      message: 'The path is too short. Expected something like /accounts/{account_number}/balance'
    }),
  };
};
