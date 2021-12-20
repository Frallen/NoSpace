// step2 // ШАГ 2
let male = document.getElementById("male");
let female = document.getElementById("female");
let age = document.getElementById("age");
let stepTwoNextBtn = document.querySelector(".stepTwo-next");
let firstsection = document.getElementById("firstsection");
let resultGender = document.getElementById("resultGender");
let changeButton1 = document.querySelector(".stepTwo-profile-item-change1");
let changeButton2 = document.querySelector(".stepTwo-profile-item-change2");
let changeButton3 = document.querySelector(".stepTwo-profile-item-change3");
let changeButton4 = document.querySelector(".stepTwo-profile-item-change4");
let blockresult1 = document.querySelector(".stepTwo-profile-result1");
let blockresult2 = document.querySelector(".stepTwo-profile-result2");
let blockresult3 = document.querySelector(".stepTwo-profile-result3");

let blockresult4 = document.querySelector(".stepTwo-profile-result4");
let resultAge = document.getElementById("resultAge");
let prevterapy1 = document.getElementById("prev-terapy1");
let prevterapy2 = document.getElementById("prev-terapy2");
let prevterapy3 = document.getElementById("prev-terapy3");
let prevterapy4 = document.getElementById("prev-terapy4");
let status1 = document.getElementById("status1");
let status2 = document.getElementById("status2");
let status3 = document.getElementById("status3");
let trueTerapy = document.getElementById("trueTerapy");
let OverStatus = document.getElementById("OverStatus");
let sectondSection = document.getElementById("sectondSection");
let fourSection = document.getElementById("fourSection");

let opuh1 = document.getElementById("opuh1");
let opuh2 = document.getElementById("opuh2");
let opuh3 = document.getElementById("opuh3");
let opuh4 = document.getElementById("opuh4");
let opuh5 = document.getElementById("opuh5");

let stage1 = document.getElementById("stage1");
let stage2 = document.getElementById("stage2");
let stage3 = document.getElementById("stage3");
let stage4 = document.getElementById("stage4");
let stage5 = document.getElementById("stage5");
let stage6 = document.getElementById("stage6");

let metastaz1 = document.getElementById("metastaz1");
let metastaz2 = document.getElementById("metastaz2");
let metastaz3 = document.getElementById("metastaz3");
let metastaz4 = document.getElementById("metastaz4");

let gitstolog1 = document.getElementById("gitstolog1");
let gitstolog2 = document.getElementById("gitstolog2");
let gitstolog3 = document.getElementById("gitstolog3");
let gitstolog4 = document.getElementById("gitstolog4");
let gitstolog5 = document.getElementById("gitstolog5");

let msi1 = document.getElementById("msi1");
let msi2 = document.getElementById("msi2");
let msi3 = document.getElementById("msi3");
let msi4 = document.getElementById("msi4");
let msi5 = document.getElementById("msi5");

let NTRK1 = document.getElementById("NTRK1");
let NTRK2 = document.getElementById("NTRK2");
let NTRK3 = document.getElementById("NTRK3");

let BRCA1 = document.getElementById("BRCA1");
let BRCA2 = document.getElementById("BRCA2");
let BRCA3 = document.getElementById("BRCA3");

let PALB1 = document.getElementById("PALB1");
let PALB2 = document.getElementById("PALB2");
let PALB3 = document.getElementById("PALB3");

let CaED1 = document.getElementById("CaED1");

let thirdSection = document.getElementById("thirdSection");
let opuh = document.getElementById("opuh");
let stage = document.getElementById("stage");
let metastaz = document.getElementById("metastaz");
let gitstolog = document.getElementById("gitstolog");
let msi = document.getElementById("msi");
let CaED = document.getElementById("CaED");
let NTRK = document.getElementById("NTRK");
let PALB = document.getElementById("PALB");
let BRCA = document.getElementById("BRCA");
//первая кнопка изменения
changeButton1 &&
  changeButton1.addEventListener("click", () => {
    //скрываю резуьтаты
    blockresult1.classList.remove("visible");
    //показываю радиокнопки/ поля
    firstsection.classList.remove("collapse");
    //скрываю кнопку изменений
    changeButton1.classList.remove("visible");
  });
//вторая кнопка изменения
changeButton2 &&
  changeButton2.addEventListener("click", () => {
    //скрываю резуьтаты
    blockresult2.classList.remove("visible");
    //показываю радиокнопки/ поля
    sectondSection.classList.remove("collapse");
    //скрываю кнопку изменений
    changeButton2.classList.remove("visible");
  });

//вторая кнопка изменения
changeButton3 &&
  changeButton3.addEventListener("click", () => {
    //скрываю резуьтаты
    blockresult3.classList.remove("visible");
    //показываю радиокнопки/ поля
    thirdSection.classList.remove("collapse");
    //скрываю кнопку изменений
    changeButton3.classList.remove("visible");
  });

//вторая кнопка изменения
changeButton4 &&
  changeButton4.addEventListener("click", () => {
    //скрываю резуьтаты
    blockresult4.classList.remove("visible");
    //показываю радиокнопки/ поля
    fourSection.classList.remove("collapse");
    //скрываю кнопку изменений
    changeButton4.classList.remove("visible");
  });
//беру рабобаттон гедеров
const inputs = document.getElementsByName("gender");

window.document.addEventListener("input", () => {
  //первый аккордеон гендер и возраст
  let agesValues =
    age &&
    age.value !== age.value.defaultValue &&
    age.value !== null &&
    age.value !== "";
  //слушаю первую часть радиобтн и полей
  if (
    (agesValues === true && male.checked) ||
    (agesValues === true && female.checked)
  ) {
    //делаю кнопку изменения видимой
    changeButton1.classList.add("visible");
    //скрываю радиобтн и поля
    firstsection.classList.add("collapse");
    //показываю результаты
    blockresult1.classList.add("visible");
    //задаю результаты в поля
    resultGender.textContent =
      (male.checked && "Мужской") || (female.checked && "Женский");
    resultAge.textContent = age.value;
  }
  if (prevterapy1 && prevterapy2 && prevterapy3 && prevterapy4) {
    let prevTerrapy =
      prevterapy1.checked ||
      prevterapy2.checked ||
      prevterapy3.checked ||
      prevterapy4.checked;
    let status = status1.checked || status2.checked || status3.checked;
    if (prevTerrapy && status) {
      //делаю кнопку изменения видимой
      changeButton2.classList.add("visible");
      //скрываю радиобтн и поля
      sectondSection.classList.add("collapse");
      //показываю результаты
      blockresult2.classList.add("visible");
      //задаю результаты в поля
      trueTerapy.textContent =
        (prevterapy1.checked && "Нет spa") ||
        (prevterapy2.checked && "Радикальное лечение завершено") ||
        (prevterapy3.checked && "Одна линия терапии") ||
        (prevterapy4.checked && "Две или более линии терапии");

      OverStatus.textContent =
        (status1.checked && "ECOG 0-1") ||
        (status2.checked && "ECOG 2") ||
        (status3.checked && "ECOG 3-4 | высокая коморбидность");
    }
  }
  if (
    opuh1 &&
    opuh2 &&
    opuh3 &&
    opuh4 &&
    opuh5 &&
    stage1 &&
    stage2 &&
    stage3 &&
    stage4 &&
    stage5 &&
    stage6 &&
    metastaz1 &&
    metastaz2 &&
    metastaz3 &&
    metastaz4 &&
    gitstolog1 &&
    gitstolog2 &&
    gitstolog3 &&
    gitstolog4 &&
    gitstolog5 &&
    msi1 &&
    msi2 &&
    msi3 &&
    msi4 &&
    msi5 &&
    CaED1
  ) {
    let opuhCheck =
      opuh1.checked ||
      opuh2.checked ||
      opuh3.checked ||
      opuh4.checked ||
      opuh5.checked;
    let stageCheck =
      stage1.checked ||
      stage2.checked ||
      stage3.checked ||
      stage4.checked ||
      stage5.checked ||
      stage6.checked;
    let metastazCheck =
      metastaz1.checked ||
      metastaz2.checked ||
      metastaz3.checked ||
      metastaz4.checked;
    let gitstologCheck =
      gitstolog1.checked ||
      gitstolog2.checked ||
      gitstolog3.checked ||
      gitstolog4.checked ||
      gitstolog5.checked;
    let msiCheck =
      msi1.checked ||
      msi2.checked ||
      msi3.checked ||
      msi4.checked ||
      msi5.checked;
    let CaEDCheck =
      CaED1.value !== CaED1.value.defaultValue &&
      CaED1.value !== null &&
      CaED1.value !== "";
    if (
      CaEDCheck &&
      msiCheck &&
      gitstologCheck &&
      metastazCheck &&
      stageCheck &&
      opuhCheck
    ) {
      //делаю кнопку изменения видимой
      changeButton3.classList.add("visible");
      //скрываю радиобтн и поля
      thirdSection.classList.add("collapse");
      //показываю результаты
      blockresult3.classList.add("visible");

      CaED.textContent = CaED1.value;

      //задаю результаты в поля
      opuh.textContent =
        (opuh1.checked && "Резектабельная") ||
        (opuh2.checked && "Погранично резектабельная") ||
        (opuh3.checked && "Нерезектабельная") ||
        (opuh4.checked && "Отсутствует") ||
        (opuh5.checked && "Неизвестно");

      stage.textContent =
        (stage1.checked && "Стадия 0") ||
        (stage2.checked && "Стадия IA") ||
        (stage3.checked && "Стадия IB") ||
        (stage4.checked && "Стадия III") ||
        (stage5.checked && "Стадия IV") ||
        (stage6.checked && "Неизвестно");
      metastaz.textContent =
        (metastaz1.checked && "Есть, резектабельные") ||
        (metastaz2.checked && "Есть, нерезектабельные") ||
        (metastaz3.checked && "Нет") ||
        (metastaz4.checked && "Неизвестно");
      gitstolog.textContent =
        (gitstolog1.checked && "Аденокарцинома") ||
        (gitstolog2.checked && "Плоскоклеточный рак") ||
        (gitstolog3.checked && "Цистаденокарциноматозный рак") ||
        (gitstolog4.checked && "Ацинарно-клеточная опухоль") ||
        (gitstolog5.checked && "Неизвестно");
      msi.textContent =
        (msi1.checked && "Аденокарцинома") ||
        (msi2.checked && "Плоскоклеточный рак") ||
        (msi3.checked && "Цистаденокарциноматозный рак") ||
        (msi4.checked && "Ацинарно-клеточная опухоль") ||
        (msi5.checked && "Неизвестно");
    }
  }
  if (
    BRCA1 &&
    BRCA2 &&
    BRCA3 &&
    PALB1 &&
    PALB2 &&
    PALB3 &&
    NTRK1 &&
    NTRK2 &&
    NTRK3
  ) {
    let brcaCheck = BRCA1.checked || BRCA2.checked || BRCA3.checked;
    let palbCheck = PALB1.checked || PALB2.checked || PALB3.checked;
    let NTRKCheck = NTRK1.checked || NTRK2.checked || NTRK3.checked;
    if (brcaCheck && palbCheck && NTRKCheck) {
      //делаю кнопку изменения видимой
      changeButton4.classList.add("visible");
      //скрываю радиобтн и поля
      fourSection.classList.add("collapse");
      //показываю результаты
      blockresult4.classList.add("visible");

      BRCA.textContent =
        (BRCA1.checked && "Да") ||
        (BRCA2.checked && "Нет") ||
        (BRCA3.checked && "Неизвестно");
      PALB.textContent =
        (PALB1.checked && "Да") ||
        (PALB2.checked && "Нет") ||
        (PALB3.checked && "Неизвестно");
      NTRK.textContent =
        (NTRK1.checked && "Да") ||
        (NTRK2.checked && "Нет") ||
        (NTRK3.checked && "Неизвестно");
    }
    if (
      brcaCheck &&
      palbCheck &&
      NTRKCheck &&
      CaEDCheck &&
      msiCheck &&
      gitstologCheck &&
      metastazCheck &&
      stageCheck &&
      opuhCheck &&
      prevTerrapy &&
      status &&
      agesValues
    ) {
      stepTwoNextBtn.classList.add("stepTwo-next-active");
    } else {
      stepTwoNextBtn.classList.remove("stepTwo-next-active");
    }
  }
});
