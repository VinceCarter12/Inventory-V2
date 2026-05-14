/**
 * Oracle Inventory — FTP Deploy Script
 * Builds oracle-inventory and uploads out/ to Hostinger public_html/
 *
 * Usage:  node deploy.js
 */

const ftp = require("basic-ftp");
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const FTP = {
  host: "145.223.108.35",
  port: 21,
  user: "u847457060.oracleinventory.lubesmastery.com",
  password: "Inventory123@#",
  remotePath: "/public_html",
};

const OUT_DIR = path.join(__dirname, "oracle-inventory", "out");

async function build() {
  console.log("\n[1/3] Building oracle-inventory...");
  execSync("npm run build", {
    cwd: path.join(__dirname, "oracle-inventory"),
    stdio: "inherit",
  });
  console.log("✓ Build complete");
}

async function upload() {
  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    console.log("\n[2/3] Connecting to Hostinger FTP...");
    await client.access({
      host: FTP.host,
      port: FTP.port,
      user: FTP.user,
      password: FTP.password,
      secure: false,
    });
    console.log("✓ Connected");

    console.log(`\n[3/3] Uploading to ${FTP.remotePath}...`);
    await client.ensureDir(FTP.remotePath);
    await client.uploadFromDir(OUT_DIR);
    console.log("✓ Upload complete");

  } finally {
    client.close();
  }
}

async function main() {
  console.log("=== Oracle Inventory Deploy ===");
  console.log(`Target: ${FTP.host}${FTP.remotePath}`);

  if (!fs.existsSync(OUT_DIR)) {
    await build();
  } else {
    console.log("\n[1/3] Rebuilding oracle-inventory...");
    execSync("npm run build", {
      cwd: path.join(__dirname, "oracle-inventory"),
      stdio: "inherit",
    });
    console.log("✓ Build complete");
  }

  await upload();

  console.log("\n✅ Deployed to https://oracleinventory.lubesmastery.com");
}

main().catch((err) => {
  console.error("\n✗ Deploy failed:", err.message);
  process.exit(1);
});
