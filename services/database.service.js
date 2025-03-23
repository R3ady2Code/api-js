const { drizzle } = require("drizzle-orm/node-postgres");
const { Pool } = require("pg");
const dbsConfig = require("../config").dbs;
const logger = require("./logger.service")(module);

/**
 * Базовый класс сервиса работы с базой данных
 */
class Database {
  #uri;

  #id;

  #database;

  #connection;

  #drizzleInstance;

  constructor(config) {
    this.#uri = config.uri;
    this.#id = config.id;
    this.#database = config.database;
  }

  /**
   * Открывает соединение с БД.
   * @return {Promise<void>}
   */
  async connect() {
    try {
      const pool = new Pool({
        connectionString: this.#uri,
      });
      this.#connection = pool;
      this.#drizzleInstance = drizzle(pool);
      logger.info(`Connected to ${this.#id}`);
    } catch (error) {
      logger.error(`Unable to connect to ${this.#id}:`, error.message);
    }
  }

  /**
   * Закрывает соединение с БД.
   * @return {Promise<void>}
   */
  async disconnect() {
    if (this.#connection) {
      try {
        await this.#connection.end();
        logger.info(`Disconnected from ${this.#id}`);
      } catch (error) {
        logger.error(`Unable to disconnect from ${this.#id}:`, error.message);
      }
    }
  }

  /**
   * Возвращает объект Drizzle.
   * @return {Object}
   */
  get orm() {
    return this.#drizzleInstance;
  }
}

const sampleDB = new Database(dbsConfig.sample_db);

module.exports = { sampleDB };
