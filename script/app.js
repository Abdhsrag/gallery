let slider = document.querySelector(".gallery");
let left = document.querySelector(".left");
let right = document.querySelector(".right");
let heading = document.querySelector(".caption h1");
let caption = document.querySelector(".caption p");
let images = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg"];
let headings = ["Moose", "Moose", "Elephant", "Tiger"];
let captions = [
  "Canada, Alberta, Jasper National Park",
  "United States, Alaska, Denali National Park",
  "Africa, Congo, Serengeti National Park",
  "Africa, Kenya, Ngorongoro Crater",
];
let dots = document.querySelectorAll(".dots li");
let isPlaying = true;
let intervalId;
let touchStartX = 0;
let touchEndX = 0;
let id = 0;

// slide function
function slide(id) {
  slider.style.backgroundImage = `url(./media/${images[id]})`;
  heading.innerText = headings[id];
  caption.innerText = captions[id];
  updateDots(id);
}

// mouse click events
left.addEventListener("click", () => {
  id = (id - 1 + images.length) % images.length; 
  slide(id);
});

right.addEventListener("click", () => {
  id = (id + 1) % images.length; 
  slide(id);
});

// update dots function
function updateDots(id) {
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === id);
  });
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    id = index;
    slide(id);
  });
});

// phone swipe function with debounce
let debounceTimeout;
function handleSwipe() {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;

    if (swipeDistance > swipeThreshold) {
      id = (id - 1 + images.length) % images.length; 
    } else if (swipeDistance < -swipeThreshold) {
      id = (id + 1) % images.length; 
    }
    slide(id);
  }, 100); 
}

// phone swipe events
slider.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

slider.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

// auto play slide
function startPlaying() {
  intervalId = setInterval(() => {
    id = (id + 1) % images.length; 
    slide(id);
  }, 3000);
}

function stopPlaying() {
  clearInterval(intervalId);
}

function handleHover() {
  if (isPlaying) {
    stopPlaying();
  } else {
    startPlaying();
  }
  isPlaying = !isPlaying;
}

slider.addEventListener("mouseenter", handleHover);
slider.addEventListener("mouseleave", handleHover);

// call functions when page loads
startPlaying();
updateDots(0);