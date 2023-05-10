import { OpenAI } from "langchain/llms/openai";
import { VectorDBQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

//Import file stystem node module
import * as fs from "fs";
import * as process from "process";
import url from "node:url";

async function main(): Promise<void> {
  const input_file_path = process.argv[2];

  const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
  });

  const text = fs.readFileSync(
    input_file_path ?? "input/state_of_the_union.txt",
    "utf8"
  );

  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });

  const docs = await textSplitter.createDocuments([text]);

  const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());

  const chain = VectorDBQAChain.fromLLM(model, vectorStore);

  const res = await chain.call({
    input_documents: docs,
    query: "What did the president say about the Cancer Moonshot?",
  });
  console.log({ res });
}

if (import.meta.url.startsWith("file:")) {
  // (A)
  const modulePath = url.fileURLToPath(import.meta.url);
  if (process.argv[1] === modulePath) {
    // (B)
    main();
  }
}
