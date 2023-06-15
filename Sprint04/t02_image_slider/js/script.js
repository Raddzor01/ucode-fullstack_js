let slideIndex = 1;
showSlides(slideIndex);

let timer = setInterval(() => {
  showSlides(slideIndex += 1);
}, 3000);

function plusSlides(n) {
  showSlides(slideIndex += n);
  clearInterval(timer);
  timer = setInterval(() => {
    showSlides(slideIndex += 1);
  }, 3000);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block"
}