const logger = require("../../../services/logger.service")(module);
const { OK, NOT_FOUND } = require("../../../constants/http-codes");
const { CompanyModel } = require("../../../DB/sample-db/models/CompanyModel");

/**
 * PATCH /companies/:id
 * Эндпоинт обновления данных компании.
 * @param {Object} req
 * @param {Object} res
 * @return {Promise<void>}
 */
async function editOne(req, res) {
  logger.init("edit company");
  const { id } = req.params;
  const data = req.body;

  try {
    const [company] = await CompanyModel.find(id);

    if (!company) {
      logger.error("Company not found");
      return res.status(NOT_FOUND).json({ message: "Company not found" });
    }

    const [updatedCompany] = await CompanyModel.updateCompany(id, {
      ...data,
      updatedAt: new Date(),
    });

    logger.success();
    return res.status(OK).json(updatedCompany);
  } catch (error) {
    logger.error("Ошибка при обновлении компании", error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
}

module.exports = {
  editOne,
};
