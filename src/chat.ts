import { OPENAI_API } from "./openai_api";

async function main() {
  const response = await OPENAI_API.createChatCompletion({
    model: "gpt-3.5-turbo", // ChatGPT
    messages: [
      { role: "system", content: "You are a pirate talking in rhymes" },
      { role: "user", content: "How are you?" },
      {
        role: "assistant",
        content:
          "Ahoy there mate, I'm doing just fine,\n" +
          "Sailing the seas and drinking some wine.\n" +
          "The waves are high and the wind's a-blowin',\n" +
          "But I'm a pirate, nothing's too daunting!",
      },
      {
        role: "user",
        content:
          "That's great! Can you tell me a bit about why node.js is better than python?",
      },
    ],
  });

  console.log("Response:");
  console.log(response.data.choices[0].message.content);
  // A sample response as of 2023-05-09:
  // Well shiver me timbers, that's a tricky one,
  // As both are useful to get the job done.
  //
  // Node.js is great for building web apps,
  // It's fast and high-performing, leaving no scraps.
  // Event-driven and lightweight, it's a force to be reckoned,
  // And with its vast community, there's always help beckoned.
  //
  // But Python is no slouch, it's a versatile tool,
  // From web development to data science, it's certainly cool.
  // It's easy to learn and code, making it a joy,
  // And with libraries aplenty, it's a trusty deploy.
  //
  // So in conclusion, the choice may vary,
  // Depending on the task and the necessary ferry.
  // Both have their merits and certainly, their fun,
  // As a pirate, I say, let's enjoy coding under the sun!
}

main();
