const { eq, ilike } = require("drizzle-orm");
const { companies } = require("../schemas/CompanySchema"); // Схема таблицы компаний
const { sampleDB } = require("../../../services/database.service");

const CompanyModel = {
  async createCompany(data) {
    return sampleDB.orm.insert(companies).values(data).returning();
  },

  async find(id) {
    return sampleDB.orm
      .select()
      .from(companies)
      .where(eq(companies.id, id))
      .limit(1);
  },

  async update(id, data) {
    return sampleDB.orm
      .update(companies)
      .set(data)
      .where(eq(companies.id, id))
      .returning();
  },

  async delete(id) {
    return sampleDB.orm
      .delete(companies)
      .where(eq(companies.id, id))
      .returning();
  },

  async get({ name, page = 1, limit = 10 }) {
    const offset = (page - 1) * limit;

    const query = sampleDB.orm.select().from(companies);

    // Фильтрация (не вариант для прода, нужно сделать FilterService)
    if (name) {
      query.where(ilike(companies.name, `%${name}%`));
    }

    // Пагинация
    query.limit(limit).offset(offset);

    return query;
  },
};

module.exports = { CompanyModel };
