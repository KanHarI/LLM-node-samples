import * as fs from "fs";
import * as crypto from "crypto";
import * as path from "path";
import { promisify } from "util";
import { get_embedding_vector } from "./embedding";
import * as url from 'node:url';

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const mkdirAsync = promisify(fs.mkdir);

export async function create_file_embeddings(
  filePath: string,
  verbose = false
): Promise<{
  original_file_name: string;
  data: Array<{ paragraph: string; embedding: Array<number> }>;
}> {
  // Read file contents
  const fileContent = await readFileAsync(filePath, "utf-8");

  // Create hash of the file content
  const hash = crypto.createHash("md5").update(fileContent).digest("hex");

  // Check if the saved_embeddings folder exists, if not, create it
  if (!fs.existsSync("saved_embeddings")) {
    await mkdirAsync("saved_embeddings");
  }

  // Check if the JSON file with the same MD5 hash already exists
  const jsonFilePath = `saved_embeddings/${hash}.json`;
  if (fs.existsSync(jsonFilePath)) {
    if (verbose) {
      console.log("Embeddings already exist. Skipping.");
    }
    const json_content = await readFileAsync(jsonFilePath, "utf-8");
    return JSON.parse(json_content);
  }

  // Split file into paragraphs
  const paragraphs = fileContent
    .split("\n\n")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  // Get embedding vectors
  const embeddings = await Promise.all(paragraphs.map(get_embedding_vector));

  // Create the output JSON
  const outputJSON = {
    original_file_name: path.basename(filePath),
    data: paragraphs.map((paragraph, index) => ({
      paragraph: paragraph,
      embedding: embeddings[index],
    })),
  };

  // Save the JSON to the saved_embeddings folder
  await writeFileAsync(jsonFilePath, JSON.stringify(outputJSON));

  if (verbose) {
    console.log("Embeddings saved successfully.");
  }
  return outputJSON;
}

async function main() {
  if (process.argv.length < 3) {
    console.error("Please provide an input file path.");
    process.exit(1);
  }

  const inputFilePath = process.argv[2];
  await create_file_embeddings(inputFilePath, true);
}

if (import.meta.url.startsWith('file:')) { // (A)
  const modulePath = url.fileURLToPath(import.meta.url);
  if (process.argv[1] === modulePath) { // (B)
    main();
  }
}
