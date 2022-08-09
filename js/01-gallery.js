import { galleryItems } from "./gallery-items.js";

const gallery = document.querySelector(".gallery");

gallery.innerHTML = galleryItems.reduce(
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
gallery.addEventListener("click", onModalOpen);

function onModalOpen(e) {
  e.preventDefault();

  document.addEventListener("keydown", onModalClose);

  function onModalClose(e) {
    if (e.code !== "Escape") return;
    else {
      instance.close();
      document.removeEventListener("keydown", onModalClose);
    }
  }

  const modalOpendImage = e.target.dataset.source;
  const instance = basicLightbox.create(
    `<img src="${modalOpendImage}" width="700" height="500">`
  );

  instance.show();
}
