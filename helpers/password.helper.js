const bcrypt = require("bcrypt");

/**
 * Хэширует пароль.
 * @param {string} password - Пароль для хэширования.
 * @return {Promise<string>} - Хэшированный пароль.
 */
async function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

/**
 * Сравнивает пароль с хэшированным паролем.
 * @param {string} password - Обычный пароль.
 * @param {string} hashedPassword - Хэшированный пароль.
 * @return {Promise<boolean>} - Результат сравнения.
 */
async function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

module.exports = {
  hashPassword,
  comparePassword,
};
