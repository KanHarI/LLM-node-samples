import {OPENAI_API} from "./openai_api";

async function main() {
  const instruct_model_prompt = "Please write a rap song about a dog named Biscuit.";

  const completion = await OPENAI_API.createCompletion({
    model: "text-davinci-003",
    prompt: instruct_model_prompt,
    max_tokens: 128,
  });

  console.log("Instruct prompt:");
  console.log(instruct_model_prompt);
  console.log("\n");
  console.log("Completion text:");
  console.log(completion.data.choices[0].text);

  // Sample response as of 2023-05-09:
  // Verse 1
  //
  // Biscuit the doggy, so cute and small,
  // His coat's always shining, no matter the fall.
  // Cardio everyday, running around the yard,
  // Making sure he stays fit, and looking real hard.
  //
  // Chorus
  //
  // Biscuit the doggy, living his best life
  // Taking a long walk, with his faithful wife.
  // He's always on the move, ensuring his health
  // Making sure his bonds stay strong, and his love will never melt.
  //
  // Verse 2
  //
  // Playing in the sun, peeps cheering him on,
  // B

  // We can see the response was cut in half due to `max_tokens: 128`.
}

main();
