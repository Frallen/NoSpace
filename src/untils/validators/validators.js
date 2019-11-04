export const required = value => {
  if (value) return undefined;
  return "Это обязательное поле";
};

export const OnlyLetters = value => {
  if (!/^[a-zA-Zа-яА-Я\s]*$/.test(value)) return `ФИО должен состоять только из букв`;
  return undefined;
};

export const PasswordCheck = MinValue => value => {
  if (value.length < MinValue)
    return `Пароль не может быть меньше ${MinValue} символов`;
  return undefined;
};
