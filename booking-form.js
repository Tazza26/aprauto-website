const form = document.getElementById("contact-form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData (form);

    const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        contact_method: formData.getAll("contact_method[]"),
        rego: formData.get("rego"),
        vehicle: formData.get("vehicle"),
        kilometers: formData.get("kilometers"),
        preferred_date: formData.get("preferred_date"),
        service: formData.getAll("service[]"),
        message: formData.get("message"),
    };

    try {
        const response = await fetch("/.netlify/functions/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Failed to send");
        }

        alert("Request submitted successfully!");
        form.reset();

        } catch (error) {
            alert("Something went wrong. Please try again later.");
            }
})