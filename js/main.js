// Theme toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
  const html = document.documentElement;
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
});

// Typed.js initialization
const typed = new Typed("#typed", {
  strings: ["Web Developer", "Java Enthusiast", "React Developer", "Tech Explorer"],
  typeSpeed: 60,
  backSpeed: 40,
  loop: true,
});

// AOS (Animate on Scroll) initialization
AOS.init({
  duration: 1000,
  once: true,
});

// Contact form (optional enhancement: simple validation or alert)
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name && email && message) {
    alert("Thank you for reaching out, " + name + "! I'll get back to you soon.");
    this.reset();
  } else {
    alert("Please fill out all fields.");
  }
});
