// --- Menú Hamburguesa ---

document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    // Abrir / cerrar con el botón hamburguesa
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });

    // Cerrar al hacer clic en un enlace del menú
    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
        });
    });

    // Cerrar al hacer clic fuera del menú
    document.addEventListener("click", (event) => {
        if (
            !navLinks.contains(event.target) &&
            !hamburger.contains(event.target)
        ) {
            navLinks.classList.remove("open");
        }
    });
});