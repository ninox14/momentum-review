const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const quoteBtn = document.querySelector(".change-quote");

function getRandomInt (max) {
  return Math.floor(Math.random() * max);
}

async function getQuote() {
  const url = "../assets/quotes/quotes.json";
  const res = await fetch(url);
  const data = await res.json();
  return new Promise((resolve) => {
    resolve(data);
  });
}
function printQuote(data) {
  quote.textContent =
    data[window.langSelected][
      getRandomInt(data[window.langSelected].length)
    ].text;
  author.textContent =
    data[window.langSelected][
      getRandomInt(data[window.langSelected].length)
    ].author;
}

export async function printOnResponse() {
  const data = await getQuote();
  printQuote(data);
}
printOnResponse();

quoteBtn.onclick = function () {
  printOnResponse();
  quoteBtn.disabled = true;
  setTimeout(function () {
    quoteBtn.disabled = false;
  }, 1000);
};
