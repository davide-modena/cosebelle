const { TextServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");

const MODEL_NAME = "models/text-bison-001";
const API_KEY = "AIzaSyCF3K2X6VNKv_2qPecRRW3tJt9GtcHGtxI";

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

const promptString = `Ask me 10 questions about "Kanye" at a medium level. The question type is: quiz. Organize these questions in a JSON with an array called "questions", indicating the question ("question"), options ("options", 4 for the quiz, 2 for the true or false) and the right answer ("answer"). Make sure that the right answer is not always the first option. Make sure that the right answer is present in the options. Do not use double quotes in arguments, because they give problems to the JSON.`;
const stopSequences = [];
let jsonFile;

console.log('prompt: ',promptString)

client.generateText({
  // required, which model to use to generate the result
  model: MODEL_NAME,
  // optional, 0.0 always uses the highest-probability result
  temperature: 0.7,
  // optional, how many candidate results to generate
  candidateCount: 1,
  // optional, number of most probable tokens to consider for generation
  topK: 40,
  // optional, for nucleus sampling decoding strategy
  topP: 0.95,
  // optional, maximum number of output tokens to generate
  maxOutputTokens: 1024,
  // optional, sequences at which to stop model generation
  stopSequences: stopSequences,
  // optional, safety settings
  safetySettings: [{"category":"HARM_CATEGORY_DEROGATORY","threshold":"BLOCK_LOW_AND_ABOVE"},{"category":"HARM_CATEGORY_TOXICITY","threshold":"BLOCK_LOW_AND_ABOVE"},{"category":"HARM_CATEGORY_VIOLENCE","threshold":"BLOCK_MEDIUM_AND_ABOVE"},{"category":"HARM_CATEGORY_SEXUAL","threshold":"BLOCK_MEDIUM_AND_ABOVE"},{"category":"HARM_CATEGORY_MEDICAL","threshold":"BLOCK_MEDIUM_AND_ABOVE"},{"category":"HARM_CATEGORY_DANGEROUS","threshold":"BLOCK_MEDIUM_AND_ABOVE"}],
  prompt: {
    text: promptString,
  },
}).then(result => {
  jsonFile = JSON.stringify(result, null, 2);
  jsonFile = JSON.parse(jsonFile);
  output = jsonFile[0].candidates[0].output;
  console.log(output);
});

