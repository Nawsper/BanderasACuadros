// --- Botón "Leer más" ---

document.addEventListener("DOMContentLoaded", () => {
    const readMoreBtn = document.getElementById("read-more-btn");
    const textContent = document.querySelector(".notices-text-content");

    if (readMoreBtn && textContent) {
        readMoreBtn.addEventListener("click", () => {
            textContent.classList.toggle("expanded");
            readMoreBtn.textContent = textContent.classList.contains("expanded")
                ? "Leer menos"
                : "Leer más";
        });
    }
});