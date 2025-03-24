const logger = require("../../../services/logger.service")(module);
const { OK, NOT_FOUND } = require("../../../constants/http-codes");
const { ContactModel } = require("../../../DB/sample-db/models/ContactModel");

/**
 * PATCH /contacts/:id
 * Эндпоинт редактирования данных контакта.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function editOne(req, res) {
  logger.init("edit contact");
  const { id } = req.params;
  const data = req.body;

  try {
    const [contact] = await ContactModel.findById(id);
    if (!contact) {
      logger.error("Contact not found");
      return res.status(NOT_FOUND).json({ message: "Контакт не найден" });
    }

    const [updatedContact] = await ContactModel.update(id, data);

    logger.success();
    return res.status(OK).json(updatedContact);
  } catch (error) {
    logger.error("Ошибка при редактировании контакта", error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
}

module.exports = {
  editOne,
};
