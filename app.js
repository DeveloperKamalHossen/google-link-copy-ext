// console.log("test")

// localStorage.setItem("text","this is a link");
// localStorage.setItem("text","this is a link");
// localStorage.setItem("text","this is a link");
// localStorage.setItem("text","this is a link");


// localStorage.clear();

let allLinks = [];
const input = document.getElementById("input");
const tabBtn = document.getElementById("tab-btn");
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const list = document.getElementById("list");

let getLinksFromStorage = JSON.parse(localStorage.getItem("links"));

if (getLinksFromStorage) {
    allLinks = getLinksFromStorage;
    renderArr(allLinks);
}

function renderArr(arr) {
    list.innerHTML = "";
    arr.forEach((item) => {
        list.innerHTML +=  `<li><a href=${item} class="link" target="_blank">${item}</a></li>`;
    });
    
}

inputBtn.addEventListener("click", () => {
    let links = input.value;
    allLinks.push(links);
    // console.log(allLinks);
    input.value = "";
    localStorage.setItem("links", JSON.stringify(allLinks));
    renderArr(allLinks);
});

deleteBtn.addEventListener("click", () => {
     localStorage.clear();
     allLinks = [];
     renderArr(allLinks);
});

tabBtn.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
        var activeTab = tabs[0].url;
        allLinks.push(activeTab);
        localStorage.setItem("links", JSON.stringify(allLinks));
        renderArr(allLinks);
      }); 
});