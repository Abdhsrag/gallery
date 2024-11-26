const slider = document.querySelector(".gallery");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const heading = document.querySelector(".caption h1");
const caption = document.querySelector(".caption p");
const dots = document.querySelectorAll(".dots li");

const images = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg"];
const headings = ["Moose", "Moose", "Elephant", "Tiger"];
const captions = [
  "Canada, Alberta, Jasper National Park",
  "United States, Alaska, Denali National Park",
  "Africa, Congo, Serengeti National Park",
  "Africa, Kenya, Ngorongoro Crater",
];

let currentIndex = 0;
let intervalId;
let isPlaying = true;
let touchStartX = 0;
let touchEndX = 0;

// Helper function to update slide
function slide(newIndex) {
  if (newIndex === currentIndex) return;

  // Add fade-out animation
  slider.classList.remove("fade-in");
  slider.classList.add("fade-out");

  setTimeout(() => {
    currentIndex = newIndex;
    slider.style.backgroundImage = `url(./media/${images[currentIndex]})`;
    heading.innerText = headings[currentIndex];
    caption.innerText = captions[currentIndex];
    updateDots(currentIndex);

    // Add fade-in animation
    slider.classList.remove("fade-out");
    slider.classList.add("fade-in");
  }, 300); 
}

// Update dots
function updateDots(index) {
  dots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === index);
  });
}

// Click events for navigation buttons
left.addEventListener("click", () => {
  slide((currentIndex - 1 + images.length) % images.length);
});

right.addEventListener("click", () => {
  slide((currentIndex + 1) % images.length);
});

// Dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    slide(index);
  });
});

// Swipe functionality
function handleSwipe() {
  const swipeThreshold = 50;
  const swipeDistance = touchEndX - touchStartX;

  if (swipeDistance > swipeThreshold) {
    slide((currentIndex - 1 + images.length) % images.length);
  } else if (swipeDistance < -swipeThreshold) {
    slide((currentIndex + 1) % images.length);
  }
}

slider.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

slider.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

// Auto-play functionality
function startPlaying() {
  intervalId = setInterval(() => {
    slide((currentIndex + 1) % images.length);
  }, 3000);
}

function stopPlaying() {
  clearInterval(intervalId);
}

// Pause auto-play on hover
slider.addEventListener("mouseenter", () => {
  if (isPlaying) stopPlaying();
});

slider.addEventListener("mouseleave", () => {
  if (isPlaying) startPlaying();
});

// Initialize
function init() {
  slider.style.backgroundImage = `url(./media/${images[currentIndex]})`;
  updateDots(currentIndex);
  startPlaying();
}

init();
