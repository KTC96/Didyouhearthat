const videos = document.querySelectorAll(".video");

function openRandomVideo() {
  // Choose a random video to play
  const randomIndex = Math.floor(Math.random() * videos.length);
  const video = videos[randomIndex];

  // Pause all videos and remove the 'playing' class
  videos.forEach((video) => {
    video.pause();
    video.classList.remove("playing");
  });

  // Play the selected video
  video.classList.add("playing");
  video.play();

  // Schedule the next video to play after a random interval
  setTimeout(openRandomVideo, getRandomInterval());

  // Add an event listener to hide the video when it ends
  video.addEventListener("ended", () => {
    video.classList.remove("playing");
  });
}

// Function to get a random interval in milliseconds
function getRandomInterval() {
  // Adjust the range and values as needed
  return Math.floor(Math.random() * (30000 - 20000) + 10000); // Random interval between 3 and 8 seconds
}

// Start the process
openRandomVideo();
