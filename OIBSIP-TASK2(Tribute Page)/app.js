document.addEventListener("DOMContentLoaded", function() {

    const links = document.querySelectorAll(".navbar .tabs a");
    const navbarHeight = 60;

    links.forEach(link => {
        link.addEventListener("click", smoothScroll);
    });

    function smoothScroll(e) {
        e.preventDefault();

        const targetId = e.target.getAttribute("href").slice(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            const targetPosition = targetSection.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        }
    }
});
