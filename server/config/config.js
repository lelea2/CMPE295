module.exports = {
  development: {
    host: process.env.DATABASE_URL,
    port: 3306,
    dialect: 'mariadb'
  },
  production: {
    host: process.env.DATABASE_URL,
    port: 3306,
    dialect: 'mariadb'
  },
  staging: {
    host: process.env.DATABASE_URL,
    port: 3306,
    dialect: 'mariadb'
  },
  test: {
    host: process.env.DATABASE_URL,
    port: 3306,
    dialect: 'mariadb'
  }
};
