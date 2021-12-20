let selectTOdowload = document.querySelector(".selectTOdowload");
//берет чекбоксы имененем choose
let choose = document.querySelectorAll("input[type=checkbox][name=choose]");
let chooseFiles = document.getElementById("chooseFiles");
choose.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    //получаю все чекбоксы
    let count = Array.from(choose)
      .filter((i) => i.checked)
      //кол-во чекнутых чекбоксов
      .map((i) => i).length;
    chooseFiles.textContent = "Выбрано файлов:" + count;
    count > 0
      ? selectTOdowload.classList.add("visibleFlex")
      : selectTOdowload.classList.remove("visibleFlex");
  });
});

let RedZone3=document.getElementById("RedZone3")
let GreenZone3 = document.getElementById("GreenZone3");
let scrollToGrennSec = document.getElementById("scrollToGrennSec");
let scrollToRedSec=document.getElementById("scrollToRedSec")
let scrollToGraySec=document.getElementById("scrollToGraySec")
let scrollToOrangeSec=document.getElementById("scrollToOrangeSec")


scrollToRedSec.addEventListener("click", () => {
  RedZone3.scrollIntoView({ block: "center", inline: "center",behavior:"smooth" });
});

scrollToGrennSec.addEventListener("click", () => {
  GreenZone3.scrollIntoView({ block: "center", inline: "center",behavior:"smooth" });
});
