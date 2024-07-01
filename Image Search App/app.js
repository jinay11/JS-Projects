const searchForm = document.querySelector("form");
const imagesContainer = document.querySelector(".images-container");
const searchInput = document.querySelector(".search-input");
const accessKey = "9cgarYV7F4rY_MQHgLIyS2aXzr6XT05DBWLweJs35MQ";

// function to fetch images using unsplace
const fetchImages = async (query) => {
    imagesContainer.innerHTML='';
    const url = `https://api.unsplash.com/search/photos/?query=${query}&per_page=28&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();
    
    data.results.forEach(photo =>{
        // creating IMG element
        const imageElement = document.createElement("div");
        imageElement.innerHTML = `<img src=${photo.urls.regular} />`;
        imageElement.classList.add("imageDiv");

        // creating overlay
        const overlayElement = document.createElement('div');
        overlayElement.classList.add("overlay");

        // overlay text
        const overlayText = document.createElement("h3");
        overlayText.innerText = `${photo.alt_description}`;

        overlayElement.appendChild(overlayText);
        imageElement.appendChild(overlayElement);
        imagesContainer.appendChild(imageElement);
    });
}

// adding eventlistner
searchForm.addEventListener("click",(e)=>{
    e.preventDefault();
    const inputText = searchInput.value.trim();
    if (inputText !== '') {
        fetchImages(inputText)
    }else{
        imagesContainer.innerHTML = `<h2>Pleace enter a search query</h2>`
    }
});