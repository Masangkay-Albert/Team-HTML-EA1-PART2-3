// DATA
const projectsData = [
  {
    title: "Cook Together",
    image: "assets/cook.png",
    description: "A web develoment final project that allows users to share and discover recipes as well as join together .",
    tags: ["HTML", "CSS", "JavaScript, PHP"],
    link: "https://github.com/Raphael2334/dlsud-web-development-cook-together",
  },
  {
    title: "Lazo Dental",
    image: "assets/dental.png",
    description: "An ongoing capstone project that aims to provide a dental clinic patient management and appointment system for a Dental Clinic.",
    tags: ["HTML", "CSS", "JavaScript, PHP"],
    link: "https://github.com/Raphael2334/SOLCapstone",
  },
];

// DOM ELEMENTS
const menuToggleBtn = document.getElementById("menu-toggle-btn");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll("nav a");
const projectList = document.getElementById("project-list");
const contactForm = document.getElementById("contact-form");
const formStatusMsg = document.getElementById("form-status-msg");

// NAVIGATION
function toggleNavMenu() {
  navMenu.classList.toggle("show");
  const expanded = navMenu.classList.contains("show");
  menuToggleBtn.setAttribute("aria-expanded", expanded);
}

function closeNavMenu() {
  navMenu.classList.remove("show");
  menuToggleBtn.setAttribute("aria-expanded", "false");
}

function highlightActiveNavLink() {
  const sections = document.querySelectorAll("section");
  let currentSectionId = "";

  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 120) {
      currentSectionId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    const targetId = href ? href.substring(1) : "";
    link.classList.toggle("active", targetId === currentSectionId);
  });
}

// RENDER PROJECTS
function createProjectCard(project) {
  const card = document.createElement("div");
  card.className = "project-card";

  const tagsHTML = project.tags.map((tag) => `<span>${tag}</span>`).join("");

  card.innerHTML = `
        <a href="${project.link}" target="_blank" rel="noopener" style="text-decoration: none; color: inherit;">
            <img src="${project.image}" alt="${project.title}" onerror="this.src='https://placehold.co/600x400/e8e4dc/171716?text=${encodeURIComponent(project.title)}'">
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">${tagsHTML}</div>
            </div>
        </a>
    `;

  return card;
}

function renderProjects() {
  projectsData.forEach((project) => {
    projectList.appendChild(createProjectCard(project));
  });
}

// CONTACT FORM
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormMessage(message, isSuccess) {
  formStatusMsg.textContent = message;
  formStatusMsg.className = isSuccess ? "success" : "error";
}

function handleContactSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("name-input").value.trim();
  const email = document.getElementById("email-input").value.trim();
  const message = document.getElementById("message-input").value.trim();

  if (!name || !email || !message) {
    showFormMessage("Please complete all fields.", false);
    return;
  }

  if (!isValidEmail(email)) {
    showFormMessage("Please enter a valid email address.", false);
    return;
  }

  showFormMessage("Sending...", true);

  setTimeout(() => {
    showFormMessage(
      "Message sent successfully! I'll get back to you soon.",
      true,
    );
    contactForm.reset();
  }, 1000);
}

// SCROLL ANIMATIONS
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  const animatedElements = document.querySelectorAll(
    ".skill-card, .project-card, .interest-card",
  );

  animatedElements.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
    observer.observe(el);
  });
}

// EVENT LISTENERS
menuToggleBtn.addEventListener("click", toggleNavMenu);

navLinks.forEach((link) => {
  link.addEventListener("click", closeNavMenu);
});

window.addEventListener("scroll", highlightActiveNavLink);

contactForm.addEventListener("submit", handleContactSubmit);

// INIT
renderProjects();
initScrollAnimations();
highlightActiveNavLink();
