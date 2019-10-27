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
export const ProjectNameCheck = MinValue => value => {
  if (value.length < MinValue)
    return `Проект не может имень название меньше ${MinValue} символов`;
  return undefined;
};
/*
export const Email = value => {
  // if(value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))
};

export const Simbols=()=(value)=>{
    return undefined
}*/
