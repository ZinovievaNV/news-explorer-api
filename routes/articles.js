const articlesRouter = require('express').Router();
const { getArticles, createArticle, deleteArticleById } = require('../controllers/article');
const { articleValidation, articleIdValidationId } = require('../middlewares/article-validation');

articlesRouter.get('/', getArticles);
articlesRouter.post('/', articleValidation, createArticle);
articlesRouter.delete('/:articleId', articleIdValidationId, deleteArticleById);

module.exports = articlesRouter;
