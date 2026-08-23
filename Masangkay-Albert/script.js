const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("nav");
const darkModeToggle = document.getElementById("darkModeToggle");

menuBtn.onclick = () => nav.classList.toggle("show");

darkModeToggle.onclick = () => {
  document.body.classList.toggle("dark-mode");
  darkModeToggle.innerHTML = document.body.classList.contains("dark-mode")
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
};

const projects = [
  {
    title: "Learniverse",
    image: "learniverse.png",
    description: "An online learning platform that provides educational resources with a modern and user-friendly interface.",
    link: "https://learniverse-website.vercel.app/landing"
  },
  {
    title: "Health Checker Kiosk",
    image: "health.png",
    description: "A health monitoring kiosk that helps users record and monitor their health information efficiently.",
    link: "https://bert-12.github.io/health-checker-kiosk/"
  },
  {
    title: "Water Bill Calculator",
    image: "waterbill.png",
    description: "A web application that computes water bills quickly and accurately based on user input.",
    link: "https://bert-12.github.io/water-bill/"
  },
  {
    title: "Survey Form",
    image: "survey.png",
    description: "An interactive survey form that collects user responses with validation and a clean interface.",
    link: "https://bert-12.github.io/survey-form/Masangkay_Lab2.index.html"
  }
];

const projectList = document.getElementById("projectList");

projects.forEach((project) => {
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

  card.querySelector("button").addEventListener("click", () => {
    document.getElementById("modalTitle").textContent = project.title;
    document.getElementById("modalImage").src = project.image;
    document.getElementById("modalImage").alt = project.title;
    document.getElementById("modalDescription").textContent = project.description;
    document.getElementById("modalLink").href = project.link;
    document.getElementById("projectModal").style.display = "flex";
  });

  projectList.appendChild(card);
});

const modal = document.getElementById("projectModal");

document.querySelector(".close").onclick = () => {
  modal.style.display = "none";
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const formMsg = document.getElementById("formMsg");

  if (!name || !email || !message) {
    formMsg.textContent = "Please complete all fields.";
    formMsg.style.color = "#b42318";
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formMsg.textContent = "Please enter a valid email address.";
    formMsg.style.color = "#b42318";
    return;
  }

  formMsg.textContent = "Message sent successfully!";
  formMsg.style.color = "#176b3a";
  contactForm.reset();
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    if (pageYOffset >= section.offsetTop - 120) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});

const hiddenElements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

hiddenElements.forEach((element) => observer.observe(element));