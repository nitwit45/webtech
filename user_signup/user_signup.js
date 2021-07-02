// all Form1 elements  
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const form = document.getElementById("form1");
const container1 = document.getElementById("container1");

// all Form2 elements 
const Mname = document.getElementById("Maidenname");
const surname = document.getElementById("surname");
const gender = document.getElementById("gender");
const occupation = document.getElementById("occupation");
const form2 = document.getElementById("form2");
const container2 = document.getElementById("container2");

// all Form3 elements 
const FavouriteArtist = document.getElementById("FavouriteArtist");
const price = document.getElementById("price");
const prefResults = document.getElementById("prefResults");
const Mail = document.getElementById("Mail");
const container3 = document.getElementById("container3");

// Show input error message in the small tag 
// Also color the input boxes in error color
const showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline in input box
const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check email is valid using regex
const checkEmail = (input) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
        return true;
    } else {
        showError(input, 'Email is not valid');
        return false;
    }
}

// Check if a given inputs in the array are empty, if so call show Error
const checkRequired = (inputArr) => {
    // Keep track whether all are not empty.
    let allOk = true
    inputArr.forEach((input) => {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
            allOk = false
        } else {
            showSuccess(input);
        }
    });
    return allOk;
}

// Check whether a input is within a given length
const checkLength = (input, min, max) => {
    if (input.value.length < min) {
        showError(input,
            `${getFieldName(input)} must be at least ${min} characters`
        );
        return false;
    } else if (input.value.length > max) {
        showError(input,
            `${getFieldName(input)} must be less than ${max} characters`
        );
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

// Check if the two passwords match
const checkPasswordsMatch = (input1, input2) => {
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
        return false;
    }
    return true;
}

// Get descriptor name for each input field, used for error messages
const getFieldName = (input) => {
    const name = input.getAttribute("data-desc");
    return name.charAt(0).toUpperCase() + name.slice(1);
}

// Check if afield has anumerandi within a givwn range
const checkNum = (input, min, max) => {
    let value = parseInt(input.value);
    if (isNaN(value)) {
        showError(input,
            `${getFieldName(input)} must be a number`
        );
        return false;
    } else if (value > max) {
        showError(input,
            `${getFieldName(input)} must be less than ${max}`
        );
        return false;
    } else if (value < min) {
        showError(input,
            `${getFieldName(input)} must be at least ${min}`
        );
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

//================Form Event listener Methods====================
// Usef javascipt event listeners over html because form onsubmit was messy.

let form1Done = false;
form.addEventListener('submit', (e) => {
    // Stops the default action of the form1 which is a redirection,,
    // In this case to prevent reloading the page.
    e.preventDefault();

    // Check if inputs are empty
    let Rcheck = checkRequired([username, email, password, password2]);
    let Lcheck = checkLength(username, 3, 15);
    let Lcheck2 = checkLength(password, 6, 25);
    let mailC = checkEmail(email);
    let pass = checkPasswordsMatch(password, password2);

    // Check if all the inputs in form1 are filled properly
    // If not does not allow to proceed 
    if (!(Rcheck && Lcheck && Lcheck2 && mailC && pass)) {
        return;
    }
    // updates a global vaiable used finally to check if the entire formed is filled.
    form1Done = true;

    // Make the second form visible and hide the current one. 
    container1.style.display = "none";
    container2.style.display = "block";
});

let form2Done = false;
form2.addEventListener("submit", (e) => {
    // Stops the default action of the form2 which is a redirection,,
    // In this case to prevent reloading the page.
    e.preventDefault();

    let Rcheck = checkRequired([Mname, surname, gender, occupation]);
    let Lcheck = checkLength(Mname, 2, 20);
    let Lcheck2 = checkLength(surname, 2, 20);
    let Lcheck3 = checkLength(occupation, 4, 30);

    // Check if all the inputs in form2 are filled properly
    // If not does not allow to proceed 
    if (!(Rcheck && Lcheck && Lcheck2 && Lcheck3)) {
        return;
    }

    // updates a global vaiable used finally to check if the entire formed is filled.
    form2Done = true;

    // Make the third form visible and hide the current one. 
    container2.style.display = "none";
    container3.style.display = "block";
});

form3.addEventListener("submit", (e) => {
    // Stops the default action of the form3 which is a redirection,,
    // In this case to prevent reloading the page.
    e.preventDefault();

    let Rcheck = checkRequired([FavouriteArtist, prefResults, Mail]);
    let Lcheck = checkLength(FavouriteArtist, 3, 20);
    let Lcheck2 = checkNum(prefResults, 1, 300);

    // Check if all the inputs in form3 are filled properly
    // If not does not allow to proceed
    if (!(Rcheck && Lcheck && Lcheck2)) {
        return;
    }

    // Corner case where it tackles the possibility of users manually
    // Changig display of the forms and submiting without filling properly.
    if (!(form1Done && form2Done)) {
        return;
    }

    // Start countdown for redirection.
    redirect();

    // Make the modal appear.
    modal_win.classList.add(isVisible);
});


// ========= Functionality for the price range animation =================
const pRange = document.getElementById("price");
const pH4 = document.querySelector("#h4-subcontainer h1");
const pSpan = document.querySelector("#h4-subcontainer span");
const prefPrice = document.getElementById("prefPrice");
let rangePercent = pRange.value;

const displayPrice = () => {
    // Get the value from slider
    rangePercent = pRange.value;
    prefPrice.innerHTML = `$ ${rangePercent}`;
    pH4.innerHTML = "<span></span>" + rangePercent;
    // Change hue of slider and bubble to make orangish look
    pRange.style.filter = "hue-rotate(" + (rangePercent / 1000) * 200 + "deg)";
    pH4.style.filter = "hue-rotate(" + ((rangePercent / 1000) * 200) + "deg)";
    pH4.style.transform = `translateX(-1px) scale(${1 + rangePercent / 1000})`;
    // Move the price bubble to right as the slider moves
    pH4.style.left = `${rangePercent/10}%`;
};


// Back button functionailites
const back1 = document.getElementById("back1");
const back2 = document.getElementById("back2");

// Check whether the user came directly to current page 
// If so direct to main else direct back to the page he came from.
const cancelSignin = () => {
    // Used 2 beause chrome landing page counts as 1.
    if (history.length > 2) {
        history.back();
    } else {
        // used .href insteadof replace so the user can come back to form 
        window.location.href = "../main.html";
    }

};

// Shows the first form while hiding the second one
const backAction1 = () => {
    container2.style.display = "none";
    container1.style.display = "block";
};

// Shows the second form while hiding the third one
const backAction2 = () => {
    container3.style.display = "none";
    container2.style.display = "block";
};