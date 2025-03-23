const { pgTable, serial, varchar, timestamp } = require("drizzle-orm/pg-core");

const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  lastname: varchar("lastname", { length: 255 }).notNull(),
  firstname: varchar("firstname", { length: 255 }).notNull(),
  patronymic: varchar("patronymic", { length: 255 }),
  phone: varchar("phone", { length: 15 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

module.exports = { contacts };
