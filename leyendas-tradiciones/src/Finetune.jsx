/*const { OpenAIApi } = require("openai");
const fs = require("fs");
/*const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi({
    apiKey: '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'});

async function uploadFile() {
    try {
        const f = await openai.createFile(
            fs.createReadStream("data.jsonl"),
            "fine-tune"
        );
        console.log(`File ID ${f.data.id}`);
        return f.data.id;
    }
    catch (err) {
        console.log('err uploadfile: ', err);
    } 
}
uploadFile();*/

//import dependencies
const OpenAI = require("openai");
//const fs = require("fs");
//const dotenv = require("dotenv");
//dotenv.config();
const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true});
//----------------------------------------------------------------
//1. Upload file to OpenAI
/*async function miFuncionAsync() {
    try {
      const response = await openai.files.create({
        file: fs.createReadStream("data.jsonl"),
        purpose: "fine-tune",
      });
      console.log('Respuesta:', response);
    } catch (error) {
      console.error('Error:', error);
    }
 }
  
miFuncionAsync();*/

//2. list files
/*async function listarArchivos() {
    try {
      const files = await openai.files.list();
      console.log(files);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  listarArchivos();*/

//3. Create Fine Tune
/*async function fineTuneModel() {
    try {
      const fineTune = await openai.fineTunes.create({
        training_file: "file-i5qBApNJ9MXs387Ptm5lenFu",
        model: "davinci",
      });
      console.log(fineTune);
    } catch (error) {
      if (error instanceof OpenAI.APIError) {
        console.error(error);
      } else {
        throw error;
      }
    }
  }
  
fineTuneModel();*/

//4. obtener fine tunes list
/*async function listFineTunes(){
  try{
    const response = await openai.fineTunes.list();
    console.log('data:', response)
  }catch(err){
    console.log('error:', err)
  }
}

listFineTunes();*/

//5. crear completion
/*async function createCompletion(){
  try{
    const response = await openai.Completion.create({
      model: 'davinci:ft-personal-2023-10-09-01-28-23',
      prompt: '',
    })
    if (response.data){
      console.log('choices', response.data.choices)
    }
  }catch(err){
    console.log('err: ', err)
  }
}

createCompletion();*/
//davinci:ft-personal-2023-10-08-23-26-45 //davinci:ft-personal-2023-10-09-01-28-23

/*console.log('Hello world');

function getCompletion(){

}*/

async function main() {
  const completion = await openai.completions.create({
    //messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "davinci:ft-personal-2023-10-09-01-28-23",
    prompt:"Start La Llorona",
    temperature:0.7,
    max_tokens:300,
    top_p:1,
    frequency_penalty:0,
    presence_penalty:0,
    stop:["_END"]
  });
  console.log(completion.choices[0]);
}

//main();

// Función para generar completaciones de texto
async function generarCompletacion(prompt) {
  try {
    const openai = new OpenAI({   apiKey: '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',
                                  dangerouslyAllowBrowser: true   });

    const completion = await openai.completions.create({
      //messages: [{ role: "system", content: "You are a helpful assistant." }],
      model: "davinci:ft-personal-2023-10-09-01-28-23",
      prompt: prompt,
      temperature:0.7,
      max_tokens:300,
      top_p:1,
      frequency_penalty:0,
      presence_penalty:0,
      stop:["_END"]
    });

    return completion.choices[0]['text'];
  } catch (error) {
    console.error("Error al generar la completación:", error);
    throw error;
  }
}

module.exports = { generarCompletacion };

/*curl --location 'https://api.openai.com/v1/chat/completions' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer API_KEY' \
--data '{
   "model": "gpt-3.5-turbo",
   "messages": [
       {
           "role": "user",
           "content": "cual es la suma de 2 * 2"
       }
   ],
   "temperature": 0.9
}'*/
