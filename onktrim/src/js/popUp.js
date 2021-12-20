let background=document.getElementById("backgroundPopUp")
let popUpMain=document.getElementById("popUpMain")


//закрытите формы ошибки по крестику
document.querySelector(".auth-form-closebtn2") &&
document
    .querySelector(".auth-form-closebtn2")
    .addEventListener("click", () => {
        background.classList.remove("BackroundErr");
        background.classList.add("popUpClosed")
        popUpMain.classList.add("popUpClosed")
    });

document.querySelector(".auth-form-closebtn") &&
document
    .querySelector(".auth-form-closebtn")
    .addEventListener("click", () => {
        background.classList.remove("BackroundErr");
        background.classList.add("popUpClosed")
        popUpMain.classList.add("popUpClosed")
    });

let showPopUp=()=>{
    background.classList.add("BackroundErr")
    background.classList.remove("popUpClosed")
    popUpMain.classList.remove("popUpClosed")
}
