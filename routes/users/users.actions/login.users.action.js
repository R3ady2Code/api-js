const { eq } = require("drizzle-orm");
const logger = require("../../../services/logger.service")(module);
const { OK, UNAUTHORIZED } = require("../../../constants/http-codes");
const JwtService = require("../../../services/jwt.service");
const jwtConfig = require("../../../config").jwt;
const { users } = require("../../../DB/sample-db/schemas/UserModel");
const { sampleDB } = require("../../../services/database.service");
const { comparePassword } = require("../../../helpers/password.helper");

/**
 * POST /user/login
 * Аутентификация пользователя и возврат JWT токена.
 * @param {Object} req - Объект запроса.
 * @param {Object} res - Объект ответа.
 * @return {Promise<void>}
 */
async function login(req, res) {
  logger.init("user login");
  const { username, password } = req.body;

  try {
    const [user] = await sampleDB.orm
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);

    if (!user) {
      logger.error("Invalid credentials");
      return res
        .status(UNAUTHORIZED)
        .json({ message: "Неверный логин или пароль" });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      logger.error("Invalid credentials");
      return res
        .status(UNAUTHORIZED)
        .json({ message: "Неверный логин или пароль" });
    }

    const token = new JwtService(jwtConfig).encode({
      id: user.id,
      username: user.username,
    }).data;

    res.header("Authorization", `Bearer ${token}`);
    logger.success();
    return res.status(OK).json({ token });
  } catch (error) {
    logger.error("Ошибка при логине пользователя", error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
}

module.exports = {
  login,
};
