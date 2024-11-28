const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
const path = require("path");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function reviewCode(filePath) {
  const code = fs.readFileSync(filePath, "utf-8");

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Review the following code and provide suggestions for improvements and highlight any issues:\n\n${code}`,
    max_tokens: 500,
  });

  console.log(`Suggestions for ${filePath}:`);
  console.log(response.data.choices[0].text.trim());
}

function getAllFiles(dir, fileList = []) {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (file.endsWith(".js") || file.endsWith(".jsx")) { // Filter your target files
      fileList.push(filePath);
    }
  });
  return fileList;
}

(async () => {
  const files = getAllFiles("./src"); // Adjust for your project structure
  for (const file of files) {
    await reviewCode(file);
  }
})();
