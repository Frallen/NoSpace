//selecors actions open/close
let expanded = false;
let checkboxes = document.getElementById("checkboxes");
let showCheckboxes = () => {
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
    expanded2 = false;
    checkboxes2.style.display = "none";
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
};
let expanded2 = false;
let checkboxes2 = document.getElementById("checkboxes2");
let showCheckboxes2 = () => {
  if (!expanded2) {
    checkboxes2.style.display = "block";
    checkboxes.style.display = "none";
    expanded2 = true;
    expanded = false;
  } else {
    checkboxes2.style.display = "none";
    expanded2 = false;
  }
};
let expandedReg = false;
let checkboxesReg = document.getElementById("checkboxesReg");
let showCheckboxesReg = () => {
  if (!expandedReg) {
    expandedReg = true;
    checkboxesReg.style.display = "block";
    checkboxesReg3.style.display = "none";
    checkboxesReg2.style.display = "none";
  } else {
    checkboxesReg.style.display = "none";
    expandedReg = false;
  }
};

let expandedReg2 = false;
let checkboxesReg2 = document.getElementById("checkboxesReg2");
let showCheckboxesReg2 = () => {
  if (!expandedReg2) {
    expandedReg2 = true;
    checkboxesReg2.style.display = "block";
    checkboxesReg3.style.display = "none";
    checkboxesReg.style.display = "none";
  } else {
    checkboxesReg2.style.display = "none";
    expandedReg2 = false;
  }
};

let expandedReg3 = false;
let checkboxesReg3 = document.getElementById("checkboxesReg3");
let showCheckboxesReg3 = () => {
  if (!expandedReg3) {
    expandedReg3 = true;
    checkboxesReg3.style.display = "block";
    checkboxesReg2.style.display = "none";
    checkboxesReg.style.display = "none";
  } else {
    checkboxesReg3.style.display = "none";
    expandedReg3 = false;
  }
};
//берет чекбоксы имененем one
let search = document.getElementById("search");
let labels = document.querySelectorAll("#checkboxes2 > label");

search &&
  search.addEventListener("input", () => {
    let data = [];
    //получаю все чекбоксы
    let count = Array.from(labels).forEach((i) => {
      const element = i;
      if (
        !element.childNodes[1].value
          .toLowerCase()
          .includes(search.value.toLowerCase())
      ) {
        element.style.display = "none";

    /*    showError.classList.contains("auth-form-show")
          ? showError.classList.remove("auth-form-show")
          : showError.classList.add("auth-form-show");
        showErrorBG.classList.contains("auth-form-bg")
          ? showErrorBG.classList.remove("auth-form-bg-show")
          : showErrorBG.classList.add("auth-form-bg-show");*/
      } else element.style.display = "block";
    });
  });
let checkboxesSelectchecked = document.querySelectorAll(
  "input[type=checkbox][name=one]"
);
let checkboxesSelectcheckedZones = document.querySelectorAll(
  "input[type=checkbox][name=zones]"
);

checkboxesSelectchecked.forEach((item) => {
  item.addEventListener("change", () => {
    //получаю все выбранные чекбоксы, использовать для получения выбранных чекбоксов
    let check = Array.from(checkboxesSelectchecked)
      .filter((i) => i.checked)
      .map((i) => i.id);

    //вывожу выбранные чебоксы
    let text = Array.from(checkboxesSelectchecked)
      .filter((i) => i.checked)
      .map((i) => i.value);
    search.value = text;
  });
});

let searchZones = document.getElementById("searchZones");

checkboxesSelectcheckedZones.forEach((item) => {
  item.addEventListener("change", () => {
    //получаю все выбранные чекбоксы, использовать для получения выбранных чекбоксов
    let check = Array.from(checkboxesSelectcheckedZones)
      .filter((i) => i.checked)
      .map((i) => i.id);

    //вывожу выбранные чебоксы
    let text = Array.from(checkboxesSelectcheckedZones)
      .filter((i) => i.checked)
      .map((i) => i.value);
    searchZones.value = text;

    text.length === 0
      ? (searchZones.textContent = "Все зоны")
      : (searchZones.textContent = text);
  });
});
