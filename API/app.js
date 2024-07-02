const btn = document.querySelector("button");
const quote = document.getElementById("quote");
const author = document.getElementById("author");

btn.addEventListener("click",async()=>{
    let API = await fetch("https://api.breakingbadquotes.xyz/v1/quotes");
    // console.log(API);
    let data = await API.json();
    // console.log(data);
    quote.innerHTML =data[0].quote;
    author.innerHTML = data[0].author;
});