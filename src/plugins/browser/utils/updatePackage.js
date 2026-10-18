const fs = require("fs");
const path = require("path");

const configXML = path.resolve(__dirname, "../../../config.xml");
const menuJava = path.resolve(
  __dirname,
  "../../../platforms/android/app/src/main/java/com/foxdebug/browser/Menu.java"
);
const docProvider = path.resolve(
  __dirname,
  "../../../platforms/android/app/src/main/java/com/foxdebug/acode/rk/exec/terminal/AlpineDocumentProvider.java"
);

const repeatChar = (char, times) => char.repeat(times);

function replaceImport(filePath, applicationId) {
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠ File not found: ${filePath}`);
    return;
  }

  const data = fs.readFileSync(filePath, "utf8");

  const updated = data.replace(
    /(import\s+)(?:com\.foxdebug\.(?:acode|acodefree|devx)|com\.vexyn\.devx)(\.R;),
    `$1${applicationId}$2`
  );

  fs.writeFileSync(filePath, updated);
}

try {
  if (!fs.existsSync(configXML)) {
    throw new Error("config.xml not found");
  }

  const config = fs.readFileSync(configXML, "utf8");
  const match = /widget\s+id="([0-9a-zA-Z.\-_]+)"/.exec(config);

  if (!match) {
    throw new Error("Could not extract widget id from config.xml");
  }

  const applicationId = match[1];

  replaceImport(docProvider, applicationId);
  replaceImport(menuJava, applicationId);

  const msg = `==== Updated app resource imports to ${applicationId} ====`;

  console.log("\n" + repeatChar("=", msg.length));
  console.log(msg);
  console.log(repeatChar("=", msg.length) + "\n");

} catch (error) {
  console.error("❌ Error:", error.message);
  process.exit(1);
}