// API Used - https://apidocs.cheapshark.com/

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const API = "https://www.cheapshark.com/api/1.0/deals?";
const gameList = document.getElementById("game-list");

searchButton.addEventListener("click", () => {
  processData(API);
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    const value = searchInput.value;
    document.querySelector("h1").innerText = value;
    searchInput.value = "";
  }
});

async function processData(source) {
  let response = await fetch(source + "storeID=1");
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
      node.innerHTML = `<img src="${x["thumb"]}><a href="">${x["title"]} is on sale for $${x["salePrice"]} from $${x["normalPrice"]}</a>`;
      gameList.appendChild(node);
      dataArr.push(x["title"]);
    }
  });
  gameList.classList.remove("hidden");
}
