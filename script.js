function toggleProject(projectId) {
  // Get the selected project details div
  var selectedProject = document.getElementById(projectId);
  
  // Check if the selected project is currently visible
  if (selectedProject.style.display === "flex") {
    // If visible, hide it
    selectedProject.style.display = "none";
  } else {
    // If not visible, show it
    // First, hide all project details
    var projects = document.querySelectorAll('.project-details');
    projects.forEach(function(project) {
      project.style.display = 'none';
    });

    // Then show the selected project's details
    selectedProject.style.display = "flex"; // Or "block" if you prefer
  }
}

/*FOR MODAL IMAGES*/
let currentFiles = [];
let currentIndex = 0;

function openModal(files) {
  currentFiles = files;
  currentIndex = 0;
  document.getElementById("imageModal").style.display = "flex";
  showFile();
}

function closeModal() {
  document.getElementById("imageModal").style.display = "none";
  document.getElementById("modalContainer").innerHTML = "";
}
function showFile() {
  const container = document.getElementById("modalContainer");
  container.innerHTML = "";

  let file = currentFiles[currentIndex];

  if (file.endsWith(".mp4")) {
    container.innerHTML = `
      <video controls autoplay style="max-width:80%; max-height:70vh; border-radius:10px;">
        <source src="${file}" type="video/mp4">
      </video>
    `;
  } else if (file.includes("youtube.com/embed") || file.includes("youtu.be")) {
    container.innerHTML = `
      <iframe src="${file}" 
              style="max-width:90%; max-height:60vh; border-radius:10px;" 
              frameborder="0" allowfullscreen>
      </iframe>
    `;
  } else {
    container.innerHTML = `
      <img src="${file}" style="max-width:90%; max-height:70vh; border-radius:10px;">
    `;
  }
}
function nextImage() {
  currentIndex = (currentIndex + 1) % currentFiles.length;
  showFile();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + currentFiles.length) % currentFiles.length;
  showFile();
}