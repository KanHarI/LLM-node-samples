import { OPENAI_API } from "./openai_api";

const EMBEDDING_MODEL = "text-embedding-ada-002";

export async function get_embedding_vector(
  text: string
): Promise<Array<number>> {
  const response = await OPENAI_API.createEmbedding({
    model: EMBEDDING_MODEL,
    input: text,
  });
  return response.data.data[0].embedding;
}
