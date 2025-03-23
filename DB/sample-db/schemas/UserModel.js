const {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
} = require("drizzle-orm/pg-core");

module.exports = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
