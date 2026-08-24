const menuToggleBtn = document.getElementById("menu-toggle-btn");
const navMenu = document.getElementById("nav-menu");
const darkModeToggleBtn = document.getElementById("dark-mode-toggle-btn");
const projectListContainer = document.getElementById("project-list");
const projectModal = document.getElementById("project-modal");
const contactForm = document.getElementById("contact-form");
const formStatusMsg = document.getElementById("form-status-msg");

const projectsData = [
  {
    title: "Learniverse",
    image: "assets/learniverse.png",
    description: "An online learning platform that provides educational resources with a modern and user-friendly interface.",
    link: "https://learniverse-website.vercel.app/landing"
  },
  {
    title: "Health Checker Kiosk",
    image: "assets/health.png",
    description: "A health monitoring kiosk that helps users record and monitor their health information efficiently.",
    link: "https://bert-12.github.io/health-checker-kiosk/"
  },
  {
    title: "Water Bill Calculator",
    image: "assets/waterbill.png",
    description: "A web application that computes water bills quickly and accurately based on user input.",
    link: "https://bert-12.github.io/water-bill/"
  },
  {
    title: "Survey Form",
    image: "assets/survey.png",
    description: "An interactive survey form that collects user responses with validation and a clean interface.",
    link: "https://bert-12.github.io/survey-form/Masangkay_Lab2.index.html"
  }
];

function toggleNavMenu() {
  navMenu.classList.toggle("show");
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");

  const isDarkMode = document.body.classList.contains("dark-mode");
  darkModeToggleBtn.innerHTML = isDarkMode
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
}

function createProjectCard(project) {
  const card = document.createElement("div");
  card.className = "project-card hidden";
  card.innerHTML = `
    <img src="${project.image}" alt="${project.title}">
    <div class="project-content">
      <h3>${project.title}</h3>
      <p>${project.description.substring(0, 70)}...</p>
      <button>View Details</button>
    </div>
  `;

  card.querySelector("button").addEventListener("click", () => openProjectModal(project));

  return card;
}

function renderProjectCards() {
  projectsData.forEach((project) => {
    projectListContainer.appendChild(createProjectCard(project));
  });
}

function openProjectModal(project) {
  document.getElementById("modal-title").textContent = project.title;
  document.getElementById("modal-image").src = project.image;
  document.getElementById("modal-image").alt = project.title;
  document.getElementById("modal-description").textContent = project.description;
  document.getElementById("modal-link").href = project.link;
  projectModal.classList.add("show-modal");
}

function closeProjectModal() {
  projectModal.classList.remove("show-modal");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormError(message) {
  formStatusMsg.textContent = message;
  formStatusMsg.classList.remove("success");
  formStatusMsg.classList.add("error");
}

function showFormSuccess(message) {
  formStatusMsg.textContent = message;
  formStatusMsg.classList.remove("error");
  formStatusMsg.classList.add("success");
}

function handleContactFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("name-input").value.trim();
  const email = document.getElementById("email-input").value.trim();
  const message = document.getElementById("message-input").value.trim();

  if (!name || !email || !message) {
    showFormError("Please complete all fields.");
    return;
  }

  if (!isValidEmail(email)) {
    showFormError("Please enter a valid email address.");
    return;
  }

  showFormSuccess("Message sent successfully!");
  contactForm.reset();
}

function highlightActiveNavLink() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");
  let currentSectionId = "";

  sections.forEach((section) => {
    if (pageYOffset >= section.offsetTop - 120) {
      currentSectionId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentSectionId}`);
  });
}

function initScrollRevealObserver() {
  const hiddenElements = document.querySelectorAll(".hidden");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  hiddenElements.forEach((element) => observer.observe(element));
}

menuToggleBtn.addEventListener("click", toggleNavMenu);
darkModeToggleBtn.addEventListener("click", toggleDarkMode);
contactForm.addEventListener("submit", handleContactFormSubmit);
document.querySelector(".close-btn").addEventListener("click", closeProjectModal);

window.addEventListener("click", (event) => {
  if (event.target === projectModal) {
    closeProjectModal();
  }
});

window.addEventListener("scroll", highlightActiveNavLink);

renderProjectCards();
initScrollRevealObserver();

document.addEventListener('DOMContentLoaded', function() {
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 150);
      }
    });
  }, { threshold: 0.1 });

  testimonialCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
});