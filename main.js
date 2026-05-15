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

   /* ------------------------------
        CONTACT POPUP
    ------------------------------ */
// const buttons = document.querySelectorAll(".contact-trigger");
// const popup = document.querySelector(".contactPopup");

// buttons.forEach(button => {
//     button.addEventListener("click", function () {
//         popup.style.display = "flex";
//     });
// });

// popup.addEventListener("click", function () {
//     popup.style.display = "none";
// });

   /* ------------------------------
        inputDate - PREVENT PAST DATES
    ------------------------------ */
const dateInput = document.getElementById('preferred_date');

if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

       /* ------------------------------
        SERVICES SLIDER
    ------------------------------ */
const servicesSection = document.getElementById('services');
const servicesGrid = document.querySelector('.services_grid');
const servicesToggle = document.querySelector('.services_toggle');
const toggleText = servicesToggle.querySelector('span');

servicesToggle.addEventListener('click', () => {
    servicesGrid.classList.toggle('expanded');

    if (servicesGrid.classList.contains('expanded')) {
        toggleText.textContent = 'Show Less';
    } else {
        toggleText.textContent = 'View All Services';

        servicesSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
});