const { eq } = require("drizzle-orm");
const { sampleDB } = require("../../../services/database.service");
const { users } = require("../schemas/UserSchema");

const UserModel = {
  async find(username) {
    return sampleDB.orm
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);
  },

  async create(data) {
    return sampleDB.orm.insert(users).values(data).returning();
  },
};

module.exports = { UserModel };
