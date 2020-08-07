
const Article = require('../models/article');
const NoAccessRights = require('../errors/no-access-rights');
const NotFoundError = require('../errors/not-found-err');

module.exports = {
  // Возвращает все сохранённые пользователем статьи
  getArticles(req, res, next) {
    Article.findById({ _id: req.user._id }).select('+owner')
      .populate(['owner'])
      .then((articles) => res.send({ data: articles }))
      .catch(next);
  },
  // Создаёт статью
  createArticle(req, res, next) {
    const {
      keyword, title, text, date, source, link, image,
    } = req.body;
    Article.create({
      keyword, title, text, date, source, link, image, owner: req.user._id,
    })
      .then((article) => res.status(201).send({ data: article }))
      .catch(next);
  },
  // Удаляет сохранённую статью  по _id
  deleteArticleById(req, res, next) {
    Article.findById({ _id: req.params.articleId }).select('+owner')
      .orFail(new NotFoundError('Статья не найдена'))
      // eslint-disable-next-line consistent-return
      .then((article) => {
        if (!(article.owner.toString() === req.user._id.toString())) {
          throw new NoAccessRights('это не Ваша статья, её нельзя удалить!');
        }
        return Article.deleteOne({ _id: article._id })
          .then(() => {
            res.send({ message: 'Статья удалена' });
          })
          .catch(next);
      });
  },

};
