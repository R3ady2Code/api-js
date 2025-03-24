const { seed } = require("drizzle-seed");
const { drizzle } = require("drizzle-orm/node-postgres");
const dbsConfig = require("../../config").dbs;
const { contacts } = require("../../DB/sample-db/schemas/ContactSchema");
const { companies } = require("../../DB/sample-db/schemas/CompanySchema");
const logger = require("../../services/logger.service")(module);

async function main() {
  try {
    const db = await drizzle(dbsConfig.sample_db.uri);
    await seed(db, { contacts, companies });

    logger.success("Database seeded successfully");
  } catch (error) {
    logger.error(error);
  }
}

main();
