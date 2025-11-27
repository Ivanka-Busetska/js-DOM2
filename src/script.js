let page = 1
const photos = [];

async function fetchGallery(){
    const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=4`);
    const data = await response.json();
    return data
}

async function getNextPhotos() {
    const photosData = await fetchGallery();
    // console.log(photosData);
    photos.push(...photosData);
    page++;
    console.log(photos)
    renderGallery();
}

function clearGallery(){
    photos.splice(0, photos.length);
    console.log(photos);
    page = 1;
    let gallery = document.getElementById('gallery-id');
    gallery.innerHTML = '';
}

function deleteLastPhoto() {
    photos.pop();
    console.log(photos);
    renderGallery();
}

function reverseGallery() {
    photos.reverse();
    console.log(photos);
    renderGallery();
}

function shuffleGallery() {
    photos.sort(() => Math.random() - 0.5);
    console.log(photos);
    renderGallery();
}

function deletePhotoById(event) {
    let card = event.target.parentNode.parentNode.parentNode.parentNode;
    console.log(card.id);

    let photoIndex = photos.findIndex(el => el['id'] === card.id);
    if (photoIndex !== -1) {
        photos.splice(photoIndex, 1);
    }
    console.log(photos);
    renderGallery();
}

function createPhotoCard(photo){
    let galleryCard = document.createElement('div');

    let galleryCardMedia = document.createElement('figure');
    let image = document.createElement('img');

    let galleryCardBody = document.createElement('div');
    let galleryCardHeader = document.createElement('div');
    let galleryCardHeaderName = document.createElement('h2');
    let galleryCardDescription = document.createElement('p');
    let galleryCardActions = document.createElement('div');
    let galleryCardDeleteBtn = document.createElement('button');
    let galleryCardDeleteBtnSVG = document.createElement('svg');

    galleryCard.classList.add('gallery-card');
    galleryCardMedia.classList.add('gallery-card__media');
    image.src = photo["download_url"];
    image.alt = photo['author'];
    image.className = "gallery-card__photo";
    galleryCardMedia.appendChild(image);

    galleryCardHeaderName.className = "gallery-card__name";
    galleryCardHeaderName.innerText = `#${photo['id']} ` + photo["author"];

    galleryCardHeader.className = "gallery-card__header";

    galleryCardHeader.appendChild(galleryCardHeaderName);

    galleryCardDescription.className = "gallery-card__description";
    galleryCardDescription.innerText = "";

    galleryCardDeleteBtnSVG.innerHTML = '<path fill-rule="evenodd" d="M36 26v10.997c0 1.659-1.337 3.003-3.009 3.003h-9.981c-1.662 0-3.009-1.342-3.009-3.003v-10.997h16zm-2 0v10.998c0 .554-.456 1.002-1.002 1.002h-9.995c-.554 0-1.002-.456-1.002-1.002v-10.998h12zm-9-5c0-.552.451-1 .991-1h4.018c.547 0 .991.444.991 1 0 .552-.451 1-.991 1h-4.018c-.547 0-.991-.444-.991-1zm0 6.997c0-.551.444-.997 1-.997.552 0 1 .453 1 .997v6.006c0 .551-.444.997-1 .997-.552 0-1-.453-1-.997v-6.006zm4 0c0-.551.444-.997 1-.997.552 0 1 .453 1 .997v6.006c0 .551-.444.997-1 .997-.552 0-1-.453-1-.997v-6.006zm-6-5.997h-4.008c-.536 0-.992.448-.992 1 0 .556.444 1 .992 1h18.016c.536 0 .992-.448.992-1 0-.556-.444-1-.992-1h-4.008v-1c0-1.653-1.343-3-3-3h-3.999c-1.652 0-3 1.343-3 3v1z" filter="url(#a)"></path>';
    galleryCardDeleteBtnSVG.style.width = "32";
    galleryCardDeleteBtnSVG.style.height = "32";
    galleryCardDeleteBtnSVG.viewBox = "-2.5 0 61 61"
    galleryCardDeleteBtn.className = "gallery-btn";
    galleryCardDeleteBtn.innerHTML = '<svg width="32" height="32" viewBox="-2.5 0 61 61" xmlns="http://www.w3.org/2000/svg" fill="#000000"><path fill-rule="evenodd" d="M36 26v10.997c0 1.659-1.337 3.003-3.009 3.003h-9.981c-1.662 0-3.009-1.342-3.009-3.003v-10.997h16zm-2 0v10.998c0 .554-.456 1.002-1.002 1.002h-9.995c-.554 0-1.002-.456-1.002-1.002v-10.998h12zm-9-5c0-.552.451-1 .991-1h4.018c.547 0 .991.444.991 1 0 .552-.451 1-.991 1h-4.018c-.547 0-.991-.444-.991-1zm0 6.997c0-.551.444-.997 1-.997.552 0 1 .453 1 .997v6.006c0 .551-.444.997-1 .997-.552 0-1-.453-1-.997v-6.006zm4 0c0-.551.444-.997 1-.997.552 0 1 .453 1 .997v6.006c0 .551-.444.997-1 .997-.552 0-1-.453-1-.997v-6.006zm-6-5.997h-4.008c-.536 0-.992.448-.992 1 0 .556.444 1 .992 1h18.016c.536 0 .992-.448.992-1 0-.556-.444-1-.992-1h-4.008v-1c0-1.653-1.343-3-3-3h-3.999c-1.652 0-3 1.343-3 3v1z" filter="url(#a)"></path></svg><span class="gallery-card__follow-label">Видалити</span>';
    galleryCardDeleteBtn.addEventListener('click', deletePhotoById);
    galleryCardActions.className = "gallery-card__actions";
    galleryCardActions.appendChild(galleryCardDeleteBtn);

    galleryCardBody.className = "gallery-card__body";
    galleryCardBody.appendChild(galleryCardHeader);
    galleryCardBody.appendChild(galleryCardDescription);
    galleryCardBody.appendChild(galleryCardActions);

    galleryCard.appendChild(galleryCardMedia);
    galleryCard.appendChild(galleryCardBody);
    galleryCard.id = photo['id'];

    return galleryCard;
}

function renderGallery() {
    let gallery = document.getElementById('gallery-id');
    gallery.innerHTML = '';
    for (const photo of photos) {
        let galleryCard = createPhotoCard(photo);
        gallery.appendChild(galleryCard);
    }
}
