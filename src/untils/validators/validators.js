export const required = value => {
  if (value) return undefined;
  return "Это обязательное поле";
};

export const PasswordCheck = MinValue => value => {
  
  if (value.length < MinValue) return `Пароль не может быть меньше ${MinValue} символов`;
  return undefined;
};
/*
export const Email = value => {
  // if(value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))
};

export const Simbols=()=(value)=>{
    return undefined
}*/
