/* script.js */
function toggleMenu() {
  const navLinks = document.getElementById("nav-links");
  const menuBtn = document.getElementById("menuBtn");
  
  navLinks.classList.toggle("active");
  const isExpanded = navLinks.classList.contains("active");
  
  if (menuBtn) {
    menuBtn.setAttribute("aria-expanded", isExpanded);
  }
}

function toggleProject(projectId) {
  var selectedProject = document.getElementById(projectId);
  if (!selectedProject) return;

  if (selectedProject.style.display === "flex") {
    selectedProject.style.display = "none";
  } else {
    var projects = document.querySelectorAll('.project-details');
    projects.forEach(function(project) {
      project.style.display = 'none';
    });
    selectedProject.style.display = "flex";
  }
}

/* FOR MODAL IMAGES */
let currentFiles = [];
let currentIndex = 0;
let lastFocusedElement = null;

function openModal(files) {
  currentFiles = files;
  currentIndex = 0;
  
  // Save focused element for WCAG focus restoration
  lastFocusedElement = document.activeElement;

  const modal = document.getElementById("imageModal");
  modal.style.display = "flex";
  showFile();

  // Focus on close button when modal opens
  const closeBtn = modal.querySelector(".close-btn");
  if (closeBtn) closeBtn.focus();
}

function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.style.display = "none";
  document.getElementById("modalContainer").innerHTML = "";

  // Restore focus to button that opened modal
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function showFile() {
  const container = document.getElementById("modalContainer");
  container.innerHTML = "";

  let file = currentFiles[currentIndex];

  if (file.endsWith(".mp4")) {
    container.innerHTML = `
      <video controls autoplay style="max-width:100%; max-height:70vh; border-radius:10px;" aria-label="Project Video">
        <source src="${file}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    `;
  } else if (file.includes("youtube.com/embed") || file.includes("youtu.be")) {
    container.innerHTML = `
      <iframe src="${file}" 
              title="Project Video Presentation"
              style="width:80vw; height:60vh; max-width:800px; border-radius:10px;" 
              frameborder="0" allowfullscreen>
      </iframe>
    `;
  } else {
    container.innerHTML = `
      <img src="${file}" alt="Project preview screenshot ${currentIndex + 1}" style="max-width:100%; max-height:70vh; border-radius:10px; object-fit:contain;">
    `;
  }
}

function nextImage() {
  if (currentFiles.length === 0) return;
  currentIndex = (currentIndex + 1) % currentFiles.length;
  showFile();
}

function prevImage() {
  if (currentFiles.length === 0) return;
  currentIndex = (currentIndex - 1 + currentFiles.length) % currentFiles.length;
  showFile();
}

// Keyboard controls for modal navigation (Operable Principle)
document.addEventListener("keydown", function (e) {
  const modal = document.getElementById("imageModal");
  if (modal && modal.style.display === "flex") {
    if (e.key === "Escape") {
      closeModal();
    } else if (e.key === "ArrowLeft") {
      prevImage();
    } else if (e.key === "ArrowRight") {
      nextImage();
    }
  }
});
