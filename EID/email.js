emailjs.init("tly3RZZRloC8PEV1a");

function send(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const condition = document.getElementById("condition");

    // Check if fields are empty
    if (name == "" || email == "" || message == "") {

        window.alert("All information should be filled!");
        return false;

    }

    // Check cookies accepted
    if (!condition.checked) {

        window.alert("Please accept cookies");
        return false;

    }

    // Send email
    emailjs.send("service_oakwv8m", "template_htc7jbw", {
        name: name,
        email: email,
        message: message
    })

    .then(function(response) {

        alert("Message sent successfully!");

        // Reset form
        document.getElementById("contact_us").reset();

    })

    .catch(function(error) {

        alert("Failed to send message");

        console.log(error);

        alert(JSON.stringify(error))

    });

    return false;
}