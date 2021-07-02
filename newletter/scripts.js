function popupToggle() {
    const popup = document.getElementById('popup');
    popup.classList.toggle('active');
}

// Validation functions
function emailValidate(user_val) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(user_val)) {
        return true;
    } else {
        return false;
    }
};


function checkAvailable(user_input) {
    if (user_input.value.trim() === "") {
        return false;
    }
    return true;
};

function submitonclick() {
    let userName = document.getElementById("name");
    let userEmail = document.getElementById("email");
    let userError = document.getElementById("nameError");
    let emailError = document.getElementById("emailError");

    userError.innerHTML = "";
    emailError.innerHTML = "";


    let emailValid = emailValidate(userEmail.value);
    let nameValid = checkAvailable(userName);
    let allValid = true;
    if (!nameValid) {
        allValid = false;
        userError.innerHTML = "Enter a name";
    }
    if (!emailValid) {
        allValid = false;
        emailError.innerHTML = "Enter a valid email"
    }
    if (allValid) {
        let popupmsg = document.querySelector(".popup2 h2")
        popupToggle()
        const popup2 = document.getElementsByClassName("popup2");
        popup2[0].classList.add("active");
        popupmsg.innerHTML = `Dear ${userName.value}, you have successfully subscribed for a personalized newsletter`;
        setTimeout(() => {
            window.location.href = "../main.html";
        }, 3000);
    }
}