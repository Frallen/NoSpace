const helpbadge = document.getElementById("helpbadgestky");
// плавающий хедер
let prevScrollpos = window.pageYOffset;
window.onscroll = () => {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("stkheader").style.top = "0";
    if (helpbadge && window.matchMedia("(min-width: 460px)").matches) {
      helpbadge.style.top = "13%";
    } else {
      if(helpbadge) {
        helpbadge.style.top = "14%";
      }
    }
  } else {
    document.getElementById("stkheader").style.top = "-100%";
    if (helpbadge) {
      helpbadge.classList.add("helpbadge-fixed");
      helpbadge.style.top = "-100%";
    }
  }
  prevScrollpos = currentScrollPos;
};

//показать скрыть пароль для регистрации
const showpass2 = document.getElementById("showpass2");

//скрыть показать пароль
showpass2 &&
  showpass2.addEventListener("click", () => {
    if (PassReg.type === "password") {
      PassReg.type = "text";
    } else {
      PassReg.type = "password";
    }
  });
