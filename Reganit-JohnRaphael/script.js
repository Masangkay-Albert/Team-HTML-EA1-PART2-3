// DATA
const projectsData = [
  {
    title: "Cook Together",
    image: "assets/cook.png",
    description: "A web develoment final project that allows users to share and discover recipes as well as join together .",
    tags: ["HTML", "CSS", "JavaScript", "PHP"],
    link: "https://github.com/Raphael2334/dlsud-web-development-cook-together",
  },
  {
    title: "Lazo Dental",
    image: "assets/dental.png",
    description: "An ongoing capstone project that aims to provide a dental clinic patient management and appointment system for a Dental Clinic.",
    tags: ["HTML", "CSS", "JavaScript", "PHP"],
    link: "https://github.com/Raphael2334/SOLCapstone",
  },
];

// TESTIMONIALS DATA
const testimonialsData = [
  {
    name: "John Albert Masangkay",
    quote: "John Raphael is a dedicated and reliable person who consistently puts effort into his work. He stays committed to his responsibilities, works well with others, and always strives to improve and deliver quality results.",
    initial: "D.",
    role: "Developer",
  },
  {
    name: "Team Member 2",
    quote: "Team member quote",
    initial: "DI",
    role: "Role"
  },
  {
    name: "Team Member 3",
    quote: "Team member quote",
    initial: "DI",
    role: "Role"
  },
  {
    name: "Team Member 4",
    quote: "Team member quote",
    initial: "DI",
    role: "Role"
  }
];



// DOM ELEMENTS
const menuToggleBtn = document.getElementById("menu-toggle-btn");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll("nav a");
const projectList = document.getElementById("project-list");
const testimonialsList = document.getElementById("testimonials-list");

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

// RENDER TESTIMONIALS
function createTestimonialCard(testimonial) {
  const card = document.createElement("div");
  card.className = "testimonial-card";

  card.innerHTML = `
    <p class="quote">"${testimonial.quote}"</p>
    <div class="author">
      <div class="avatar">${testimonial.initial}</div>
      <div>
        <div class="name">${testimonial.name}</div>
        <div class="role">${testimonial.role}</div>
      </div>
    </div>
  `;

  return card;
}

function renderTestimonials() {
  testimonialsData.forEach((testimonial) => {
    testimonialsList.appendChild(createTestimonialCard(testimonial));
  });
}


// EVENT LISTENERS
menuToggleBtn.addEventListener("click", toggleNavMenu);

navLinks.forEach((link) => {
  link.addEventListener("click", closeNavMenu);
});

window.addEventListener("scroll", highlightActiveNavLink);



renderProjects();
renderTestimonials();
initScrollAnimations();
highlightActiveNavLink();
