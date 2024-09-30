const inputBox = document.querySelector("#input-box");
const listContainer = document.querySelector("#list");
const buttonClick = document.querySelector("button");
const errorMessage = document.querySelector("#error-message");

// Spara listan i local storage
function saveList() {
    window.localStorage.setItem("data", listContainer.innerHTML);
}

// Hämta listan från local storage
function loadList() {
    const storedData = window.localStorage.getItem("data");
    if (storedData) {
        listContainer.innerHTML = storedData;
    }
}

// Ladda listan när sidan laddas
window.onload = loadList;

buttonClick.addEventListener("click", () => {
    if (inputBox.value === '') {
        errorMessage.style.display = "block";
    } else {
        errorMessage.style.display = "none";
        let li = document.createElement("li");
        li.innerText = inputBox.value;
        listContainer.appendChild(li);
        inputBox.value = '';
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; //Unicode för X
        li.appendChild(span);
        saveList(); // Spara listan när ny uppgift läggs till
    }
});

listContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveList(); // Spara listan när en uppgift markeras som klar
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveList(); // Spara listan när en uppgift tas bort
    }
}, false);
