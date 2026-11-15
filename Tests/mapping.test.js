const fs = require("fs");
const path = require("path");

const specPath = path.join(__dirname, "..", "Src", "spec.csv");
const jsPath = path.join(__dirname, "..", "Src", "NepaliInput.js");

const specContent = fs.readFileSync(specPath, "utf8");
const jsContent = fs.readFileSync(jsPath, "utf8");

const specLines = specContent.trim().split("\n").slice(1);

const mappingMatch = jsContent.match(/var MAPPINGS = ({[\s\S]*?});/);
if (!mappingMatch) {
  console.log("ERROR: Could not find MAPPINGS in NepaliInput.js");
  process.exit(1);
}

const mappings = eval("(" + mappingMatch[1] + ")");

let passed = 0;
let failed = 0;
let errors = [];

for (const line of specLines) {
  const parts = line.split(",");
  if (parts.length < 3) {
    errors.push("Malformed spec line: " + line);
    continue;
  }

  const code = parts[0];
  const shiftVal = parts[1];
  const expectedOutput = parts[2];

  if (shiftVal === "false") {
    if (!mappings[code] || mappings[code].withoutShift !== expectedOutput) {
      errors.push(code + ": withoutShift mismatch — expected '" + expectedOutput + "', got '" + (mappings[code] ? mappings[code].withoutShift : "undefined") + "'");
      failed++;
      continue;
    }
  }

  if (shiftVal === "true") {
    if (!mappings[code] || mappings[code].withShift !== expectedOutput) {
      errors.push(code + ": withShift mismatch — expected '" + expectedOutput + "', got '" + (mappings[code] ? mappings[code].withShift : "undefined") + "'");
      failed++;
      continue;
    }
  }

  passed++;
}

console.log("Mapping test results:");
console.log("  Passed: " + passed);
console.log("  Failed: " + failed);

if (errors.length > 0) {
  console.log("\nErrors:");
  for (const err of errors) {
    console.log("  - " + err);
  }
  process.exit(1);
} else {
  console.log("\nAll mappings match spec.csv.");
}
