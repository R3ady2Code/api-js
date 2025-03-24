const { eq } = require("drizzle-orm");
const { sampleDB } = require("../../../services/database.service");
const { contacts } = require("../schemas/ContactSchema");

const ContactModel = {
  async create(data) {
    return sampleDB.orm.insert(contacts).values(data).returning();
  },

  async find(id) {
    return sampleDB.orm
      .select()
      .from(contacts)
      .where(eq(contacts.id, id))
      .limit(1);
  },

  async update(id, data) {
    return sampleDB.orm
      .update(contacts)
      .set(data)
      .where(eq(contacts.id, id))
      .returning();
  },

  async delete(id) {
    return sampleDB.orm.delete(contacts).where(eq(contacts.id, id)).returning();
  },

  async getAll() {
    return sampleDB.orm.select().from(contacts);
  },
};

module.exports = { ContactModel };
