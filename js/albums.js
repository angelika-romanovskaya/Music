const albums = document.querySelector('.albums');

function renderAlbums(){
    fetch("../data/data.json").then(response => response.json()).then(data => {
        albums.innerHTML='';
        data.forEach(element => {
            albums.innerHTML+=`<div class="albums__item" id="${element.id}">
                                    <img class="albums__img" src="${element.img}" alt="Song">
                                    <div class="albums__hover">
                                        <div class="albums__text">
                                            <h3 class="albums__title">${element.title}</h3>
                                            <span class="albums__author">${element.author}</span>
                                        </div>
                                        <div class="albums__play" data-id='${element.audio}'>
                                            <img src="./img/icon/Play.svg" alt="Play">
                                        </div>
                                        <div class="albums__footer">
                                            <div class="albums__raiting">
                                                <img src="./img/icon/Rating-Icon-White.svg" alt="Rating">
                                                <img src="./img/icon/Rating-Icon-Red.svg" alt="Rating">
                                            </div>
                                            <h4 class="albums__number">#05</h4>
                                        </div>
                                    </div>
                                </div>`
        });
    });
}

renderAlbums();