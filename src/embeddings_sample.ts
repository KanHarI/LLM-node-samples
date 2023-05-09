import { correlation } from "./math";
import { get_embedding_vector } from "./embedding";

async function main() {
  const regulations_reduce_risk_text =
    "Adhering to regulations can significantly reduce the risk of a data breach.";
  const cyber_security_challenges_increasing_text =
    "Cybersecurity challenges have significantly increased in magnitude and complexity since 2017.";
  const functional_programming_text =
    "Functional programming (FP) is an approach to software development that uses pure functions to create maintainable software.";
  const cat_text =
    "The cat (Felis catus) is a domestic species of small carnivorous mammal.";

  const [
    regulations_reduce_risk_vector,
    cyber_security_challenges_increasing_vector,
    functional_programming_vector,
    cat_vector,
  ] = await Promise.all([
    get_embedding_vector(regulations_reduce_risk_text),
    get_embedding_vector(cyber_security_challenges_increasing_text),
    get_embedding_vector(functional_programming_text),
    get_embedding_vector(cat_text),
  ]);

  console.log("Embedding of '" + regulations_reduce_risk_text + "':");
  console.log(regulations_reduce_risk_vector);

  console.log("Embedding dimension:");
  console.log(regulations_reduce_risk_vector.length);

  console.log("Correlation between:");
  console.log(regulations_reduce_risk_text);
  console.log("and");
  console.log(cyber_security_challenges_increasing_text);
  console.log("is:");
  console.log(
    correlation(
      regulations_reduce_risk_vector,
      cyber_security_challenges_increasing_vector
    )
  );

  console.log("Correlation between:");
  console.log(regulations_reduce_risk_text);
  console.log("and");
  console.log(functional_programming_text);
  console.log("is:");
  console.log(
    correlation(regulations_reduce_risk_vector, functional_programming_vector)
  );

  console.log("Correlation between:");
  console.log(regulations_reduce_risk_text);
  console.log("and");
  console.log(cat_text);
  console.log("is:");
  console.log(correlation(regulations_reduce_risk_vector, cat_vector));

  // Output as of 2023-05-09:
  // Correlation between:
  // Adhering to regulations can significantly reduce the risk of a data breach.
  // and
  // Cybersecurity challenges have significantly increased in magnitude and complexity since 2017.
  // is:
  // 0.8045933722363742
  // Correlation between:
  // Adhering to regulations can significantly reduce the risk of a data breach.
  // and
  // Functional programming (FP) is an approach to software development that uses pure functions to create maintainable software.
  // is:
  // 0.7215067556492332
  // Correlation between:
  // Adhering to regulations can significantly reduce the risk of a data breach.
  // and
  // The cat (Felis catus) is a domestic species of small carnivorous mammal.
  // is:
  // 0.6919437953231862
}

main();
