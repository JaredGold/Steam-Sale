// API Used - https://apidocs.cheapshark.com/

const loadButton = document.getElementById("load-button");
const nextButton = document.getElementById("next-button");
const previousButton = document.getElementById("previous-button");
const API = "https://www.cheapshark.com/api/1.0/deals?";
const gameList = document.getElementById("game-list");

let pageNum = 0;

loadButton.addEventListener("click", () => {
  processData(API);
});

nextButton.addEventListener("click", () => {
  if (previousButton.classList.contains("hidden")) {
    previousButton.classList.remove("hidden");
  }
  pageNum += 1;
  processData(API);
});

previousButton.addEventListener("click", () => {
  pageNum -= 1;
  if (pageNum == 0) {
    previousButton.classList.add("hidden");
  }
  processData(API);
});

async function processData(source) {
  let response = await fetch(source + "storeID=1" + `&pageNumber=${pageNum}`);
  let data = await response.json();
  putDataToScreen(data, true);
  console.log(data);
}

function putDataToScreen(data /*, filter*/) {
  // if (filter === true) console.log(true);
  let dataArr = [];
  gameList.innerHTML = "";

  data.forEach((x) => {
    if (!dataArr.includes(x["title"])) {
      let node = document.createElement("li");
      node.innerHTML = `
      <a href="https://store.steampowered.com/app/${x["steamAppID"]}">
      <img src="${x["thumb"]}">
      </a>
        ${x["title"]} is on sale for $${x["salePrice"]} from $${x["normalPrice"]}
      `;
      gameList.appendChild(node);
      dataArr.push(x["title"]);
    }
  });
  gameList.classList.remove("hidden");
}
