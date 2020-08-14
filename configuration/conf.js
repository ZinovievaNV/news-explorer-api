const { NODE_ENV, JWT_SECRET, PORT = 3000 } = process.env;
const SECRET = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';
const DATABASE = 'mongodb://localhost:27017/newsexplorer';

module.exports = {
  PORT,
  DATABASE,
  NODE_ENV,
  JWT_SECRET,
  SECRET,

};
