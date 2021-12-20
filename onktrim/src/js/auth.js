// если пользователь авторизован
/*
let isAuth=true
isAuth &&document.querySelector(".userImage").setAttribute("src","./img/home.svg")
*/
//открытие и закрытите формы авторизации
const authform = document.querySelector(".auth-form");
const authformbg = document.querySelector(".auth-form-bg");

document
  .querySelector(".main-container-header-enter")
  .addEventListener("click", () => {
    if (checkboxesReg2 || checkboxesReg3 || checkboxesReg) {
      checkboxesReg2.style.display = "none";
      checkboxesReg3.style.display = "none";
      checkboxesReg.style.display = "none";
    }
    if (checkboxes || checkboxes2) {
      checkboxes.style.display = "none";
      checkboxes2.style.display = "none";
    }
    authform.classList.contains("auth-form-show")
      ? authform.classList.remove("auth-form-show")
      : authform.classList.add("auth-form-show");
    authformbg.classList.contains("auth-form-bg")
      ? authformbg.classList.remove("auth-form-bg-show")
      : authformbg.classList.add("auth-form-bg-show");
  });
//закрытите формы авторизации по крестику
document.querySelector(".auth-form-closebtn").addEventListener("click", () => {
  authformbg.classList.add("auth-form-bg-show");
  authform.classList.add("auth-form-show");
  resetForm.classList.remove("visible");
  authSection.classList.remove("collapse");
  newPasswordSection.classList.remove("visible");
  resetSectionCode2.classList.remove("vible");
});

const InputErr = document.querySelector(".auth-form-title-Input");

const AuthEmail = document.getElementById("AuthEmail");
const AuthPass = document.getElementById("AuthPass");
const form = document.getElementById("authform");
const showpass = document.getElementById("showpass");
const btnSubmit = document.getElementById("btnSubmit");
const registratonBtn = document.getElementById("registratonBtn");
const authInput = document.getElementsByName("authInput");

//скрыть показать пароль
showpass &&
  showpass.addEventListener("click", () => {
    if (AuthPass.type === "password") {
      AuthPass.type = "text";
    } else {
      AuthPass.type = "password";
    }
  });
//валидация формы авторизации
authInput.forEach((item) => {
  form.addEventListener("change", (e) => {
    e.preventDefault();
    let check = Array.from(authInput)
      .filter(
        (i) =>
          i.value === null || i.value === "" || i.value === i.value.defaultValue
      )
      .map((i) => i.id);
    if (check) {
      //Проверяю введено ли данное поле , если нет добавляю ошидки
      check.includes("AuthEmail")
        ? document.querySelector(".authInputErr").classList.add("help")
        : document.querySelector(".authInputErr").classList.remove("help");
      check.includes("AuthEmail")
        ? AuthEmail.classList.add("is-danger")
        : AuthEmail.classList.remove("is-danger");

      check.includes("AuthPass")
        ? document.querySelector(".authInputErr2").classList.add("help")
        : document.querySelector(".authInputErr2").classList.remove("help");
      check.includes("AuthPass")
        ? AuthPass.classList.add("is-danger")
        : AuthPass.classList.remove("is-danger");
    }
  });
});

let btnSubmitResetCode = document.getElementById("btnSubmitResetCode");
let btnSubmitResetCode2 = document.getElementById("btnSubmitResetCode2");
let resetPassword = document.getElementById("resetPassword");
let resetForm = document.querySelector(".resetSection");
let authSection = document.querySelector(".authSection");
let newPasswordSection = document.querySelector(".newPasswordSection");
let resetSectionCode = document.querySelector(".resetSectionCode");
let resetSectionCode2 = document.querySelector(".resetSectionCode2");

resetPassword.addEventListener("click", () => {
  resetForm.classList.add("visible");
  authSection.classList.add("collapse");
});

btnSubmitResetCode.addEventListener("click", () => {
  resetForm.classList.remove("visible");
  resetSectionCode2.classList.add("visible");
});
btnSubmitResetCode2.addEventListener("click", () => {
  resetSectionCode2.classList.remove("visible");
  newPasswordSection.classList.add("visible");
});
