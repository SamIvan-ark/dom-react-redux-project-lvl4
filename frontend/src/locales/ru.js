export default {
  translation: {
    errors: {
      emptyField: 'Обязательное поле',
      invalidCredentials: 'Неверные имя пользователя или пароль',
      networkError: 'Ошибка соединения',
      invalidToken: 'Не узнал вас, войдите заново',
      channelAlreadyExist: 'Канал с таким именем уже существует',
      userAlreadyExist: 'Такой пользователь уже существует',
      profanityUsername: 'У нас не матерятся',
      lengthFromTo: 'От {{from}} до {{to}} символов',
      minLength: 'Минимум {{length}} символов',
      passwordsMustMatch: 'Пароли должны совпадать',
    },
    credentials: {
      yourNick: 'Ваш ник',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      registration: 'Регистрация',
      noAcc: 'Нет аккаунта?',
    },
    actions: {
      signIn: 'Войти',
      register: 'Зарегистрироваться',
      remove: 'Удалить',
      rename: 'Переименовать',
      send: 'Отправить',
      cancel: 'Отменить',
      addChannel: 'Добавить канал',
      renameChannel: 'Переименовать канал',
      removeChannel: 'Удалить канал',
    },
    entities: {
      channels: {
        channels: 'Каналы',
        channelName: 'Имя канала',
        newChannelName: 'Новое имя канала',
      },
      messages: {
        count_one: '{{count}} сообщение',
        count_few: '{{count}} сообщения',
        count_many: '{{count}} сообщений',
      },
    },
    processes: {
      channelCreated: 'Канал создан',
      channelRenamed: 'Канал переименован',
      channelRemoved: 'Канал удален',
      loading: 'Загрузка...',
    },
    userInteractions: {
      confirm: 'Уверены?',
      enterMessage: 'Введите сообщение...',
    },
  },
};
