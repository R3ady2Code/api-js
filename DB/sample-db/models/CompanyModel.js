const { eq, ilike } = require("drizzle-orm");
const { companies } = require("../schemas/CompanySchema"); // Схема таблицы компаний
const { sampleDB } = require("../../../services/database.service");

class CompanyModel {
  static async createCompany(data) {
    return sampleDB.insert(companies).values(data).returning();
  }

  static async find(id) {
    return sampleDB
      .select()
      .from(companies)
      .where(eq(companies.id, id))
      .limit(1);
  }

  static async update(id, data) {
    return sampleDB
      .update(companies)
      .set(data)
      .where(eq(companies.id, id))
      .returning();
  }

  static async delete(id) {
    return sampleDB.delete(companies).where(eq(companies.id, id)).returning();
  }

  static async get({ name, page = 1, limit = 10 }) {
    const offset = (page - 1) * limit;

    const query = sampleDB.select().from(companies);

    // Фильтрация (не вариант для прода, нужно сделать FilterService)
    if (name) {
      query.where(ilike(companies.name, `%${name}%`));
    }

    // Пагинация
    query.limit(limit).offset(offset);

    return query;
  }
}

module.exports = CompanyModel;
