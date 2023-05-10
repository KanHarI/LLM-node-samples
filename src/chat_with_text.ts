import { create_file_embeddings } from "./create_embeddings";
import * as readline from "readline";
import { get_embedding_vector } from "./embedding";
import { cosine_similarity } from "./math";
import { OPENAI_API } from "./openai_api";

const TOP_K_NUM_ITEMS = 3;

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error("Please provide a file path as a command line argument.");
    process.exit(1);
  }

  const fileEmbeddings = await create_file_embeddings(filePath);

  const system_prompt =
    "You are a helpful assistant that provides informative answers based on the given text.\n" +
    "You are given a question and text fetched from embeddings that appears to be relevant.\n" +
    "Provide an answer to the question based on the text.\n" +
    "Do not tell the user about being fed information from embeddings, just answer the question to the best of your ability.\n";

  const messages: Array<{
    role: "system" | "user" | "assistant";
    content: string;
  }> = [{ role: "system", content: system_prompt }];

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  console.log("Type 'exit' to exit.");
  console.log("Question:");
  for await (const question of rl) {
    if (question == "exit") {
      rl.close();
      return;
    }
    const questionEmbedding = await get_embedding_vector(question);
    const sorted_embeddings = fileEmbeddings.data
      .map((entry) => ({
        paragraph: entry.paragraph,
        cosine_similarity: cosine_similarity(
          entry.embedding,
          questionEmbedding
        ),
      }))
      .sort((a, b) => b.cosine_similarity - a.cosine_similarity);
    const top_k_paragraphs = sorted_embeddings
      .slice(0, TOP_K_NUM_ITEMS)
      .map((entry) => entry.paragraph);
    console.log("Top " + TOP_K_NUM_ITEMS + " paragraphs:");
    console.log(top_k_paragraphs);
    const user_message =
      question +
      "\n" +
      "TOP " +
      TOP_K_NUM_ITEMS +
      " PARAGRAPHS:\n" +
      top_k_paragraphs.join("\n") +
      "\n";
    messages.push({ role: "user", content: user_message });
    console.log("Awaiting OpenAI API...");
    const response = await OPENAI_API.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });
    console.log("Received OpenAI API response!");
    const response_text = response.data.choices[0].message.content;
    console.log("Response:");
    console.log(response_text);
    messages.push({ role: "assistant", content: response_text });
    console.log("\nQuestion: ['exit' to exit]");
  }
}

main();
