import { galleryItems } from "./gallery-items.js";

const gallery = document.querySelector(".gallery");

gallery.addEventListener("click", onModalOpen);

function renderMarkup(array) {
  gallery.innerHTML = array.reduce(
    (markup, { preview, original, description }) =>
      markup +
      `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`,
    ""
  );
}

renderMarkup(galleryItems);

function onModalOpen(e) {
  e.preventDefault();

  if (e.target.nodeName !== "IMG") return;

  document.addEventListener("keydown", onModalClose);

  const modalOpendImage = e.target.dataset.source;
  const instance = basicLightbox.create(
    `<img src="${modalOpendImage}" width="800" height="600">`
  );

  instance.show();

  function onModalClose(e) {
    if (e.code !== "Escape") return;
    else {
      instance.close();
      document.removeEventListener("keydown", onModalClose);
    }
  }
}
