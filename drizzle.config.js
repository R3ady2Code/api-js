const dbsConfig = require("./config").dbs;

module.exports = {
  schema: ["./DB/sample-db/schemas"],
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: dbsConfig.sample_db.uri,
  },
};
