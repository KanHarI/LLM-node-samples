//Import the OpenAPI Large Language Model (you can import other models here eg. Cohere)
import { OpenAI } from "langchain/llms/openai";

//Import the Vector DB QA chain
import { VectorDBQAChain } from "langchain/chains";

//Import the Hierarchical Navigable Small World Graphs vector store (you'll learn
//how it is used later in the code)
import { HNSWLib } from "langchain/vectorstores/hnswlib";

//Import OpenAI embeddings (you'll learn
//how it is used later in the code)
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

//Import the text splitter (you'll learn
//how it is used later in the code)
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
