const { eq } = require("drizzle-orm");
const logger = require("../../../services/logger.service")(module);
const { CREATED, BAD_REQUEST } = require("../../../constants/http-codes");
const { users } = require("../../../DB/sample-db/schemas/UserModel");
const { sampleDB } = require("../../../services/database.service");
const { hashPassword } = require("../../../helpers/password.helper");

/**
 * POST /user/register
 * Регистрация нового пользователя.
 * @param {Object} req - Объект запроса.
 * @param {Object} res - Объект ответа.
 * @return {Promise<void>}
 */
async function register(req, res) {
  logger.init("user registration");
  const { username, password } = req.body;

  try {
    const existingUser = await sampleDB.orm
      .select()
      .from(users)
      .where(eq(users.username, username));

    if (existingUser.length > 0) {
      logger.error("Имя пользователя уже занято");
      return res
        .status(BAD_REQUEST)
        .json({ message: "Имя пользователя уже занято" });
    }

    const hashedPassword = await hashPassword(password);

    const [newUser] = await sampleDB.orm
      .insert(users)
      .values({
        username,
        password: hashedPassword,
      })
      .returning();

    logger.success();
    return res
      .status(CREATED)
      .json({ message: "Пользователь зарегистрировался", user: newUser });
  } catch (error) {
    console.log(error);
    logger.error("Ошибка при регистрации пользователя", error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
}

module.exports = {
  register,
};
