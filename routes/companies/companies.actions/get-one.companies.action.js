const logger = require("../../../services/logger.service")(module);
const { OK, NOT_FOUND } = require("../../../constants/http-codes");
const { CompanyModel } = require("../../../DB/sample-db/models/CompanyModel");

/**
 * GET /companies/:id
 * Эндпоинт получения данных компании.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function getOne(req, res) {
  logger.init("get company");
  const { id } = req.params;

  try {
    const [company] = await CompanyModel.find(id);

    if (!company) {
      logger.error("Company not found");
      return res.status(NOT_FOUND).json({ message: "Компания не найдена" });
    }

    logger.success();
    return res.status(OK).json(company);
  } catch (error) {
    logger.error("Ошибка при получении компании", error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
}

module.exports = {
  getOne,
};
