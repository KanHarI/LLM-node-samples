import {OPENAI_API} from "./openai_api";
import {correlation} from "./math";

async function main() {
  const regulations_reduce_rist_text = "Adhering to regulations can significantly reduce the risk of a data breach.";
  const regulations_reduce_risk_embedding_response = await OPENAI_API.createEmbedding({
    model: "text-embedding-ada-002",
    input: regulations_reduce_rist_text,
  });

  const regulations_reduce_risk_embedding_vector =
    regulations_reduce_risk_embedding_response.data.data[0].embedding;

  console.log("Embedding vector:");
  console.log(regulations_reduce_risk_embedding_vector);

  const cybercecurity_challenges_increasing_text = "Cybersecurity challenges have significantly increased in magnitude and complexity since 2017.";
  const cybercecurity_challenges_increasing_embedding_response = await OPENAI_API.createEmbedding({
    model: "text-embedding-ada-002",
    input: cybercecurity_challenges_increasing_text,
  });

  const cybercecurity_challenges_increasing_embedding_vector =
    cybercecurity_challenges_increasing_embedding_response.data.data[0].embedding;

  const functional_programming_text = "Functional programming (FP) is an approach to software development that uses pure functions to create maintainable software.";
  const functional_programming_embedding_response = await OPENAI_API.createEmbedding({
    model: "text-embedding-ada-002",
    input: functional_programming_text,
  });

  const functional_programming_embedding_vector =
    functional_programming_embedding_response.data.data[0].embedding;

  const cat_text = "The cat (Felis catus) is a domestic species of small carnivorous mammal.";
  const cat_embedding_response = await OPENAI_API.createEmbedding({
    model: "text-embedding-ada-002",
    input: cat_text,
  });

  const cat_embedding_vector =
    cat_embedding_response.data.data[0].embedding;

  console.log("Correlation between:");
  console.log(regulations_reduce_rist_text);
  console.log("and");
  console.log(cybercecurity_challenges_increasing_text);
  console.log("is:");
  console.log(
    correlation(regulations_reduce_risk_embedding_vector, cybercecurity_challenges_increasing_embedding_vector)
  );

  console.log("Correlation between:");
  console.log(regulations_reduce_rist_text);
  console.log("and");
  console.log(functional_programming_text);
  console.log("is:");
  console.log(
    correlation(regulations_reduce_risk_embedding_vector, functional_programming_embedding_vector)
  );

  console.log("Correlation between:");
  console.log(regulations_reduce_rist_text);
  console.log("and");
  console.log(cat_text);
  console.log("is:");
  console.log(
    correlation(regulations_reduce_risk_embedding_vector, cat_embedding_vector)
  );
}

main();
