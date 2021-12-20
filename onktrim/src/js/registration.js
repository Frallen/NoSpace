//валидация формы регистрации
let formREG = document.getElementById("formREG");
let name = document.getElementById("name");
let family = document.getElementById("family");
let yearDest = document.getElementById("yearDest");
let workPlace = document.getElementById("workPlace");
let reginput = document.getElementsByName("reginput");
let RegEmail = document.getElementById("RegEmail");
let PassReg = document.getElementById("PassReg");
let PassReg2 = document.getElementById("PassReg2");

reginput.forEach((item) => {
  formREG.addEventListener("change", (e) => {
    e.preventDefault();
    //получаю все выбранные чекбоксы, использовать для получения выбранных чекбоксов
    let check = Array.from(reginput)
      .filter(
        (i) =>
          i.value === null || i.value === "" || i.value === i.value.defaultValue
      )
      .map((i) => i.id);
    if (check) {
      //Проверяю введено ли данное поле , если нет добавляю ошидки
      check.includes("name")
        ? document.querySelector(".regName").classList.add("help")
        : document.querySelector(".regName").classList.remove("help");
      check.includes("name")
        ? name.classList.add("is-danger")
        : name.classList.remove("is-danger");

      check.includes("family")
        ? document.querySelector(".regFamily").classList.add("help")
        : document.querySelector(".regFamily").classList.remove("help");
      check.includes("family")
        ? family.classList.add("is-danger")
        : family.classList.remove("is-danger");

      check.includes("countryINput")
        ? document.querySelector(".regCoutnry").classList.add("help")
        : document.querySelector(".regCoutnry").classList.remove("help");
      check.includes("countryINput")
        ? countryINput.classList.add("is-danger")
        : countryINput.classList.remove("is-danger");
      check.includes("workINput")
        ? document.querySelector(".regWork").classList.add("help")
        : document.querySelector(".regWork").classList.remove("help");
      check.includes("workINput")
        ? workINput.classList.add("is-danger")
        : workINput.classList.remove("is-danger");

      check.includes("yearDest")
        ? document.querySelector(".regLeadve").classList.add("help")
        : document.querySelector(".regLeadve").classList.remove("help");
      check.includes("yearDest")
        ? yearDest.classList.add("is-danger")
        : yearDest.classList.remove("is-danger");
      check.includes("workPlace")
        ? document.querySelector(".regWorkPlace").classList.add("help")
        : document.querySelector(".regWorkPlace").classList.remove("help");
      check.includes("workPlace")
        ? workPlace.classList.add("is-danger")
        : workPlace.classList.remove("is-danger");
      check.includes("specINput")
        ? document.querySelector(".regSpec").classList.add("help")
        : document.querySelector(".regSpec").classList.remove("help");
      check.includes("specINput")
        ? specINput.classList.add("is-danger")
        : specINput.classList.remove("is-danger");
      check.includes("RegEmail")
        ? document.querySelector(".regEmailErr").classList.add("help")
        : document.querySelector(".regEmailErr").classList.remove("help");
      check.includes("RegEmail")
        ? RegEmail.classList.add("is-danger")
        : RegEmail.classList.remove("is-danger");
      check.includes("PassReg")
        ? document.querySelector(".regPassErr").classList.add("help")
        : document.querySelector(".regPassErr").classList.remove("help");
      check.includes("PassReg")
        ? PassReg.classList.add("is-danger")
        : PassReg.classList.remove("is-danger");
      //Второе поле для пароля как отедльная единица
      check.includes("PassReg2")
        ? document.querySelector(".regPassErr2").classList.add("help")
        : document.querySelector(".regPassErr2").classList.remove("help");
      check.includes("PassReg2")
        ? PassReg2.classList.add("is-danger")
        : PassReg2.classList.remove("is-danger");
    }
  });
});

//страна проживания
let checkboxesSelectcheckedReg = document.querySelectorAll(
  "input[type=checkbox][name=country]"
);
let countryINput = document.getElementById("countryINput");

checkboxesSelectcheckedReg.forEach((item) => {
  item.addEventListener("change", () => {
    //получаю все выбранные чекбоксы, использовать для получения выбранных чекбоксов
    let check = Array.from(checkboxesSelectcheckedReg)
      .filter((i) => i.checked)
      .map((i) => i.id);

    //вывожу выбранные чебоксы
    let text = Array.from(checkboxesSelectcheckedReg)
      .filter((i) => i.checked)
      .map((i) => (countryINput.value = i.value));
    text.length === 0
      ? (countryINput.textContent = "Страна проживания")
      : (countryINput.textContent = text);
  });
});
//профессия
let checkboxesSelectcheckedReg2 = document.querySelectorAll(
  "input[type=checkbox][name=work]"
);
let workINput = document.getElementById("workINput");

checkboxesSelectcheckedReg2.forEach((item) => {
  item.addEventListener("change", () => {
    //получаю все выбранные чекбоксы, использовать для получения выбранных чекбоксов
    let check = Array.from(checkboxesSelectcheckedReg2)
      .filter((i) => i.checked)
      .map((i) => i.id);

    //вывожу выбранные чебоксы
    let text = Array.from(checkboxesSelectcheckedReg2)
      .filter((i) => i.checked)
      .map((i) => (workINput.value = i.value));
    text.length === 0
      ? (workINput.textContent = "Профессия")
      : (workINput.textContent = text);
  });
});

//специализация
let checkboxesSelectcheckedReg3 = document.querySelectorAll(
  "input[type=checkbox][name=spec]"
);
let specINput = document.getElementById("specINput");

checkboxesSelectcheckedReg3.forEach((item) => {
  item.addEventListener("change", () => {
    //получаю все выбранные чекбоксы, использовать для получения выбранных чекбоксов
    let check = Array.from(checkboxesSelectcheckedReg3)
      .filter((i) => i.checked)
      .map((i) => (specINput.value = i.id));

    //вывожу выбранные чебоксы
    let text = Array.from(checkboxesSelectcheckedReg3)
      .filter((i) => i.checked)
      .map((i) => i.value);
    text.length === 0
      ? (specINput.textContent = "Ваша медицинская специализация")
      : (specINput.textContent = text);
  });
});
