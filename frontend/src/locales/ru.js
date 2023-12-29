export default {
  translation: {
    loginForm: {
      username: 'Ваш ник',
      password: 'Пароль',
      submit: 'Войти',
      registration: 'Регистрация',
      errors: {
        emptyField: 'Не должно быть пустым',
        invalidCredentials: 'Неверные имя пользователя или пароль',
        networkError: 'Ошибка соединения',
      },
    },
    loginPage: {
      noAcc: 'Нет аккаунта?',
      registration: 'Регистрация',
    },
    chat: {
      loading: 'Загрузка...',
      channelsList: {
        remove: 'Удалить',
        rename: 'Переименовать',
        channels: 'Каналы',
      },
      messages: {
        count_one: '{{count}} сообщение',
        count_few: '{{count}} сообщения',
        count_many: '{{count}} сообщений',
      },
      inputPlaceholder: 'Введите сообщение...',
    },
    modals: {
      addChannel: {
        header: 'Добавить канал',
        label: 'Имя канала',
        notification: 'Канал создан',
      },
      renameChannel: {
        header: 'Переименовать канал',
        label: 'Новое имя канала',
        notification: 'Канал переименован',
      },
      removeChannel: {
        header: 'Удалить канал',
        confirm: 'Уверены?',
        notification: 'Канал удален',
      },
      errors: {
        existing: 'Канал с таким именем уже существует',
      },
      buttons: {
        submit: 'Отправить',
        remove: 'Удалить',
        cancel: 'Отменить',
      },
    },
  },
};
