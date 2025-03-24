const logger = require("../../../services/logger.service")(module);
const { OK, NOT_FOUND } = require("../../../constants/http-codes");
const { ContactModel } = require("../../../DB/sample-db/models/ContactModel");

/**
 * GET /contacts/:id
 * Эндпоинт получения данных контакта.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function getOne(req, res) {
  logger.init("get contact");
  const { id } = req.params;

  try {
    const [contact] = await ContactModel.findById(id);

    if (!contact) {
      logger.error("Contact not found");
      return res.status(NOT_FOUND).json({ message: "Контакт не найден" });
    }

    logger.success();
    return res.status(OK).json(contact);
  } catch (error) {
    logger.error("Ошибка при получении контакта", error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
}

module.exports = {
  getOne,
};
