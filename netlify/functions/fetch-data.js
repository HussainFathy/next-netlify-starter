const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const response = await fetch('https://raw.githubusercontent.com/HussainFathy/next-netlify-starter/main/data.json');
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
