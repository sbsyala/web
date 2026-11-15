// Production Drizzle config — reads DATABASE_URL from the environment.
// Usage:
//   npx drizzle-kit push --config drizzle.config.prod.ts
// (The default drizzle.config.json is for the local sandbox database.)
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error(
    "DATABASE_URL is not set. Add it to your .env file or export it in your shell."
  );
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  dbCredentials: { url },
});
