const allowedCors = [
  'https://api.news-explorer-yp.tk',
  'http://api.news-explorer-yp.tk',
  'https://news-explorer-yp.tk',
  'http://news-explorer-yp.tk',
  'http://localhost:8080',
  'https://localhost:8080',
  'http://localhost',
  'https://localhost',
];

const cors = (err, req, res, next) => {
  const { origin } = req.headers; // Записываем в переменную origin соответствующий заголовок

  if (allowedCors.includes(origin)) { // Проверяем, что значение origin есть в разрешённых доменах
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
};

module.exports = cors;
