//Function For the validation through Javascript
function validation() {
    let fname = document.getElementById("fname").value; //Passes the first name input to a variable
    let lname = document.getElementById("lname").value; //Passes the last name input to a variable
    let phone = document.getElementById("phone").value; //Passes the phone number input to a variable
    let email = document.getElementById("email").value; //Passes the email input to a variable
    let message = document.getElementById("message").value; //Passes the message input to a variable
    let error_message = document.getElementById("error_message"); //Passes the error message output into a variable
    let success_message = document.getElementById("success_message"); //Passes the success message output to a variable
    let text;
    error_message.style.padding = "10px"; //Styling for the error messages
    //Checking First Name
    if (fname.length < 1) {
        text = "Please Enter First Name"
        error_message.innerHTML = text;
        return false;
        //Checking Last Name
    } else if (lname.length < 1) {
        text = "Please Enter Last Name"
        error_message.innerHTML = text;
        return false;
        //Checking Phone Number
    } else if (isNaN(phone) || phone.length != 10) {
        text = "Please Enter Phone Number"
        error_message.innerHTML = text;
        return false;
        //Checking E-Mail
    } else if (email.indexOf("@") == -1 || email.length < 6) {
        text = "Please Enter E-Mail"
        error_message.innerHTML = text;
        return false;
        //Checking Message
    } else if (message.length < 15) {
        text = "Please Enter A Message of 15 characters or more"
        error_message.innerHTML = text;
        return false;
    }
    //Checking The Rating
    let e = document.getElementById("rating");
    let result = e.options[e.selectedIndex].text;
    if (result == "-- Select --") {
        text = "Please Select A Value For The Drop-Down"
        error_message.innerHTML = text;
        return false;
    }
//Reset Button Function
    function resetForm() {
        document.getElementById("contactForm").reset();
    }
//Alert Prompt Box
    alert("Name: " + fname +
        " | Email: " + email +
        " | Rating: " + result +
        " | Comments: " + message
    );
}