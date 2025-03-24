const logger = require("../../../services/logger.service")(module);
const { OK } = require("../../../constants/http-codes");
const { CompanyModel } = require("../../../DB/sample-db/models/CompanyModel");

/**
 * GET /companies
 * Эндпоинт получения списка компаний с фильтрацией и пагинацией.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function getAll(req, res) {
  logger.init("get companies");
  const { name, page = 1, limit = 10 } = req.query;

  try {
    const companies = await CompanyModel.get({ name, page, limit });

    logger.success();
    return res.status(OK).json(companies);
  } catch (error) {
    logger.error("Ошибка при получении списка компаний", error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
}

module.exports = {
  getAll,
};
