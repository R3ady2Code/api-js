const { eq } = require("drizzle-orm");
const { sampleDB } = require("../../../services/database.service");
const { users } = require("../schemas/UserSchema");

class UserModel {
  static async find(username) {
    return sampleDB
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);
  }

  static async create(data) {
    return sampleDB.insert(users).values(data).returning();
  }
}

exports.default = UserModel;
