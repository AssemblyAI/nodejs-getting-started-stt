require('dotenv').config();
const fetch = require("node-fetch");

const apiKey = process.env.ASSEMBLYAI_API_KEY;
let args = process.argv.slice(2);
let id = args[0];
const url = `https://api.assemblyai.com/v2/transcript/${id}`;


const params = {
  headers: {
    "authorization": apiKey,
    "content-type": "application/json",
  },
  method: "GET"
};

function getTranscription(data) {
  if (data.status === 'queued') {
    console.log('AssemblyAI is still transcribing your audio, please try again in a few minutes!');
  }
  else if (data.status === 'completed') {
    console.log('Success:', data);
    console.log('Text:', data.text);
  }
  else {
    console.log('Something went wrong :-( :' + data.status);
  }
}

fetch(url, params)
  .then(response => response.json())
  .then(data => {
    getTranscription(data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });


