const SERVER_ERROR = 'На сервере произошла ошибка';
const SERVER_WILL_CRASH = 'Сервер сейчас упадёт';
const THE_RESOURSE_IS_NOT_FOUND = 'Запрашиваемый ресурс не найден';
const AUTHORIZATION_REQUIRED = 'Необходима авторизация';
const FIELD_ID = 'Поле должно быть не больше 24 символов';
const ARTICLE_REMOVED = 'Статья удалена';
const ARTICLE_CANNOT_BE_DELETED = 'это не Ваша статья, её нельзя удалить!';
const ARTICLE_NOT_FOUND = 'Статья не найдена';
const USER_NOT_FOUND = 'Нет пользователя с таким id';
const ENTER_LINK = 'Введите ссылку!';
const INVALID_MAIL_FORMAT = 'Неправильный формат почты';
const INCORRECT_EMAIL_OR_PASS = 'Неправильные почта или пароль';
const INCORRECT_FIELD_FORMAT = 'Некорректный формат поля';
const EMAIL_CONFLIG = 'Пользователь с таким {PATH} уже существует.';

const errorMessage = (field) => ({
  'string.empty': `Поле ${field} не может быть пустым`,
  'string.min': `Поле ${field} должно быть не меньше 2 символов`,
  'string.max': `Поле ${field} должно быть не больше 30 символов`,
  'any.required': `Поле ${field} обязательно`,
  'string.email': `Неверный формат поля  ${field}`,
  'string.pattern.base': `${field} должен быть не менее 8 символов.Может содержать только заглавные и прописные буквы латинского алфавита, цифры и служебные символы @*#-_%|`,
});

module.exports = {
  SERVER_ERROR,
  THE_RESOURSE_IS_NOT_FOUND,
  FIELD_ID,
  AUTHORIZATION_REQUIRED,
  ARTICLE_REMOVED,
  ARTICLE_CANNOT_BE_DELETED,
  ARTICLE_NOT_FOUND,
  USER_NOT_FOUND,
  SERVER_WILL_CRASH,
  ENTER_LINK,
  INVALID_MAIL_FORMAT,
  INCORRECT_EMAIL_OR_PASS,
  INCORRECT_FIELD_FORMAT,
  EMAIL_CONFLIG,
  errorMessage,
};
