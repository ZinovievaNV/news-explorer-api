const Article = require('../models/article');
const NoAccessRights = require('../errors/no-access-rights');
const NotFoundError = require('../errors/not-found-err');
const { ARTICLE_REMOVED, ARTICLE_CANNOT_BE_DELETED, ARTICLE_NOT_FOUND } = require('../configuration/constants');

module.exports = {
  // Возвращает все сохранённые пользователем статьи
  getArticles(req, res, next) {
    Article.find({ owner: req.user._id }).select('+owner')
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
      .orFail(new NotFoundError(ARTICLE_NOT_FOUND))
      .then((article) => {
        if (!(article.owner.toString() === req.user._id.toString())) {
          throw new NoAccessRights(ARTICLE_CANNOT_BE_DELETED);
        }
        Article.deleteOne({ _id: article._id })
          .then(() => {
            res.send({ ARTICLE_REMOVED });
          })
          .catch(next);
      })
      .catch(next);
  },

};
