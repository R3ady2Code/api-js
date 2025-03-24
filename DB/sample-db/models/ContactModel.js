const { eq } = require("drizzle-orm");
const { sampleDB } = require("../../../services/database.service");
const { contacts } = require("../schemas/ContactSchema");

class ContactModel {
  static async create(data) {
    return sampleDB.insert(contacts).values(data).returning();
  }

  static async find(id) {
    return sampleDB.select().from(contacts).where(eq(contacts.id, id)).limit(1);
  }

  static async update(id, data) {
    return sampleDB
      .update(contacts)
      .set(data)
      .where(eq(contacts.id, id))
      .returning();
  }

  static async delete(id) {
    return sampleDB.delete(contacts).where(eq(contacts.id, id)).returning();
  }

  static async getAll() {
    return sampleDB.select().from(contacts);
  }
}

module.exports = ContactModel;
