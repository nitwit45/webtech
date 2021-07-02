const openEl = document.querySelector(".open-modal");
const closeEl = document.querySelector("[data-close]");
const isVisible = "is-visible";
const modal_win = document.getElementById("modal");

// Closes the modal
const closeModal = () => {
    modal_win.classList.remove(isVisible);
};

// Checks when the user clicks on the webpage,
// Whether the the modal is visible and whether he clicked out of the modal container
// If so then close modal.
document.addEventListener("click", (e) => {
    if (e.target == document.querySelector(".modal.is-visible")) {
        closeModal();
    }
});

// Checks when the user presses a key,
// Whether the the modal is visible and whether he type the esc key
// If so then close modal.
document.addEventListener("keyup", (e) => {
    if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
        closeModal();
    }
});

// Functionality to implement Redirecting
const timepan = document.getElementById("reidrectTime");
const redirectMsg = document.getElementById("rMsg");
const redirect = () => {
    redirectMsg.innerHTML = `Dear ${Mname.value}, Thank you for registering with Euphoria, You will be directed to our Gallery page.`;
    let time = 5;
    let t = setInterval(() => {
        time--;
        timepan.innerHTML = `${time}s`;
        if (time == 0) {
            window.location.replace("../gallery/Gallery.html");
            clearInterval(t);
        }
    }, 1000);
}