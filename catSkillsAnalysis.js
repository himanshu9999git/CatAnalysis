// Read the input data from a JSON file
const fs = require("fs");
const rawData = fs.readFileSync("catSkills.json");
const data = JSON.parse(rawData);

// Calculate the ranks for 2019 and 2024 scores
data.forEach((skill) => {
  const ranks = {
    2019: 1,
    2024: 1,
  };
  data.forEach((otherSkill) => {
    if (skill["2019 score"] < otherSkill["2019 score"]) {
      ranks["2019"]++;
    }
    if (skill["2024 score"] < otherSkill["2024 score"]) {
      ranks["2024"]++;
    }
  });
  skill["2019 rank"] = ranks["2019"];
  skill["2024 rank"] = ranks["2024"];
});

// Sort the skills by their 2019 rank
const sortedSkills = data.sort((a, b) => a["2019 rank"] - b["2019 rank"]);

// Identify the top/bottom 3 skills based on 2019 rank
const top3 = sortedSkills.slice(0, 3);
const bottom3 = sortedSkills.slice(-3);

// Identify the top 3 accelerating and decelerating skills
const growthRates = [];
data.forEach((skill) => {
  const growthRate =
    (skill["2024 score"] - skill["2019 score"]) / skill["2019 score"];
  growthRates.push({ name: skill["Skills/Capabilities"], growthRate });
});
const sortedGrowthRates = growthRates.sort(
  (a, b) => b.growthRate - a.growthRate
);
const top3Accelerating = sortedGrowthRates.slice(0, 3).map((item) => item.name);
const top3Decelerating = sortedGrowthRates.slice(-3).map((item) => item.name);

// Output the results
console.log("Top 3 skills:");
top3.forEach((skill) =>
  console.log(`${skill["Skills/Capabilities"]}: Rank ${skill["2019 rank"]}`)
);
console.log("\nBottom 3 skills:");
bottom3.forEach((skill) =>
  console.log(`${skill["Skills/Capabilities"]}: Rank ${skill["2019 rank"]}`)
);
console.log("\nTop 3 accelerating skills:");
top3Accelerating.forEach((name) =>
  console.log(
    `${name}: Growth rate ${
      growthRates.find((item) => item.name === name).growthRate
    }`
  )
);
console.log("\nTop 3 decelerating skills:");
top3Decelerating.forEach((name) =>
  console.log(
    `${name}: Growth rate ${
      growthRates.find((item) => item.name === name).growthRate
    }`
  )
);

// Function to output the rank of a specific skill
function outputSkillRank(skillName) {
  const skill = data.find((item) => item["Skills/Capabilities"] === skillName);
  if (skill) {
    console.log(
      `${skill["Skills/Capabilities"]} rank in 2019: ${skill["2019 rank"]}`
    );
    console.log(
      `${skill["Skills/Capabilities"]} rank in 2024: ${skill["2024 rank"]}`
    );
  } else {
    console.log(`Skill '${skillName}' not found.`);
  }
}

// Example usage: Output the rank of the 'Balance' skill
outputSkillRank("Balance");
