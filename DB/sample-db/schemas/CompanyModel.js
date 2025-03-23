const {
  pgTable,
  serial,
  integer,
  varchar,
  text,
  timestamp,
  jsonb,
} = require("drizzle-orm/pg-core");

module.exports = pgTable("companies", {
  id: serial("id").primaryKey(),
  contactId: integer("contact_id").notNull(),
  name: text("name").notNull(),
  shortName: varchar("short_name", { length: 255 }).notNull(),
  businessEntity: varchar("business_entity", { length: 50 }).notNull(),
  contract: jsonb("contract").notNull(),
  type: jsonb("type").notNull(),
  status: varchar("status", { length: 50 }).notNull(),
  photos: jsonb("photos"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
