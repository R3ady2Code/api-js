const logger = require("../../../services/logger.service")(module);
const { UserModel } = require("../../../DB/sample-db/models/UserModel");
const { hashPassword } = require("../../../helpers/password.helper");
const { CREATED, BAD_REQUEST } = require("../../../constants/http-codes");

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
    const existingUser = await UserModel.find(username);

    if (existingUser.length > 0) {
      logger.error("Имя пользователя уже занято");
      return res
        .status(BAD_REQUEST)
        .json({ message: "Имя пользователя уже занято" });
    }

    const hashedPassword = await hashPassword(password);

    const [newUser] = await UserModel.create({
      username,
      password: hashedPassword,
    });

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
