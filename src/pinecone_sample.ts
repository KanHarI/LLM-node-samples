import { PineconeClient } from "@pinecone-database/pinecone";
import {undefined} from "zod";

function generateRandomVector(length: number): Array<number> {
  const list = [];
  for (let i = 0; i < length; i++) {
    list.push(Math.random() * 2 - 1);
  }
  return list;
}


async function main() {
  const pinecone = new PineconeClient();
  await pinecone.init({
    environment: "us-west4-gcp-free",
    apiKey: "d634b676-dfee-4510-b257-651158f704dc",
  });
  const indexesList = await pinecone.listIndexes();
  console.log(indexesList);
  const indexDescription = await pinecone.describeIndex({
    indexName: "sample-index",
  });
  console.log(indexDescription);
  const index = pinecone.Index("sample-index");
  const insertResponse = await index.upsert({
    upsertRequest: {
      vectors: [
        {
          id: "id_1",
          values: generateRandomVector(1536),
          metadata: {
            is_random: true,
          }
        },
        {
          id: "id_2",
          values: generateRandomVector(1536),
          metadata: {
            is_random: true,
          }
        }
      ]
    },
  });
  // Fetch the vector for the first document
  const index_response = await index.query({
    queryRequest: {
      vector: generateRandomVector(1536),
      topK: 2,
    }
  });
  console.log(index_response);
}

main();
