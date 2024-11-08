import { loadConfig } from "@redocly/openapi-core";
import fs from "node:fs";
import openapiTS, { astToString } from "openapi-typescript";
import replace from "replace-in-file";
const paths = [
  "./target/cloudkit-service.yaml",
];

// Some swagger definitions still have the deffinition swagger: '2.0', but openapi-typescript only supports/accepts openapi: 3.0.3

// eslint-disable-next-line no-console
console.log("replacing all swagger: '2.0' with openapi: 3.0.3");
replace.sync({
  files: paths,
  from: /swagger: '2.0'/g,
  to: "openapi: 3.0.3",
});

// Delete the generated folder and create a new one
// eslint-disable-next-line no-console
console.log("Deleting the generated folder and creating a new one");
if (!fs.existsSync("./generated")) {
  fs.mkdirSync("./generated");
} else {
  fs.rmSync("./generated", { recursive: true });
  fs.mkdirSync("./generated");
}

const redoc = await loadConfig({ configPath: "redocly.yaml" });

for (const path of paths) {
  // eslint-disable-next-line no-console
  console.log("Generating types for: ", path.split("/").at(-1));
  const ast = await openapiTS(new URL(path, import.meta.url), {
    redoc,
    immutable: true,
    emptyObjectsUnknown: true
  });
  const contents = astToString(ast);
  fs.writeFileSync(
    `./generated/${path.split("/").at(-1).split(".")[0]}.ts`,
    contents
  );
}
// eslint-disable-next-line no-console
console.log("Types generated successfully!");
