document.addEventListener("DOMContentLoaded", function () {

    /* ------------------------------
       MOBILE NAVBAR
    ------------------------------ */
    const toggleButton = document.querySelector(".toggle-button");
    const navbarLinks = document.querySelector(".navbar-links");
    const navItems = document.querySelectorAll(".navbar-links a");

    if (toggleButton) {
        toggleButton.addEventListener("click", (e) => {
            e.preventDefault();
            toggleButton.classList.toggle("active");
            navbarLinks.classList.toggle("active");
        });
    }

    if (navItems.length > 0) {
        navItems.forEach(link => {
            link.addEventListener("click", () => {
                navbarLinks.classList.remove('active');
                toggleButton.classList.remove("active");
            });
        });
    }

    /* ------------------------------
       FAQ DROPDOWN
    ------------------------------ */
    const faqQuestions = document.querySelectorAll('.faq_question');

    if (faqQuestions.length > 0) {
        faqQuestions.forEach((question) => {
            question.addEventListener('click', () => {
                question.classList.toggle('active');
                const answer = question.nextElementSibling;
                if (answer) answer.classList.toggle('show');
            });
        });
    }

}); // END DOMContentLoaded

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");

    if (!form) return;

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("/.netlify/functions/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert("Message sent successfully!");
                form.reset();
            } else {
                alert("There was an error sending your message.");
            }   
        } catch (error) {
            alert("Network error. Please try again.");
        }
    });
});