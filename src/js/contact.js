//Submit Button
let submitButton = document.getElementById("submitButton");

//Contact Form Validation
function createUser(event) {
    event.preventDefault();

    let firstname1 = document.getElementById("firstname").value;
    let lastname1 = document.getElementById("lastname").value;
    let calldate = document.getElementById("calldate").value;
    let calltime = document.getElementById("calltime").value;
    let email1 = document.getElementById("email").value;

    //Validations for when the form is empty and completed
    if (firstname1 !== "" && lastname1 !== "" && calldate !== "" && calltime !== "" && email1 !== "") {
        alert("Thank you for completing the Contact Form!");

        // Clear the form inputs after submit
        document.getElementById("firstname").value = '';
        document.getElementById("lastname").value = '';
        document.getElementById("calldate").value = '';
        document.getElementById("calltime").value = '';
        document.getElementById("email").value = '';
    }
    else if (firstname1 !== "") {
        if (lastname1 == "") {
            alert("Kindly enter your Last Name!");
        } else if (calldate == "") {
            alert("Kindly enter a date we can call you!");
        } else if (calltime == "") {
            alert("Kindly enter a suitable time we can call you!");
        } else if (email1 == "") {
            alert("Kindly enter your email address");
        }
    }
    else {
        alert("Please complete your Contact Form ");
    }
}
submitButton.addEventListener("click", createUser);

