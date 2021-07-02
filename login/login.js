const username = document.querySelector("#user");
const password = document.querySelector("#pass");
const btn = document.querySelector("#btn");
const errp = document.querySelector("#error");

// passwords are lasal, chamx, crazywheels
const dummy_users = {
  "lasal@gmail.com":"BwlixQ0wSskDbDujbwBSq2ndMSyZZEbvk4YBwvIJUk8=",
  "chamix@hotmail.com":"mifS/bLRsUkqUL52ovbIFDsSdn4y4a9DZB+IuIXhWQY=",
  "nitiwt@hotwheels.org":"I4Y2hn2iW05YYcDEile4Cwf/97/cC8H7GfoNprM2s7c="
}; 

// Hash the password to check
async function hash(target){
   let buffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(target));
   let chars = Array.prototype.map.call(new Uint8Array(buffer), ch => String.fromCharCode(ch)).join('');
   return btoa(chars);
};

// const test = async () =>{
//     let j = await hash("crazywheels");
//     console.log(j);
// }
// test()

const isEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}


const valid_username = (name) => {
    valid = true;
    if(name.length < 5 || name.length > 70){
        valid = false;
    }
    if(! isEmail(name)){
        valid = false;
    }
    return valid;
}

const valid_password = (pass) => {
    return pass.length > 4 && pass.length < 20;
}

const valid_cred = (uname,  pass)  =>{
    let v_uname = valid_username(uname);
    let v_pass = valid_password(pass);

    return (v_uname && v_pass);
}

const checkSubmit = function(){
    let uname = username.value;
    let pass = password.value;

    if(valid_cred(uname, pass)){
        btn.disabled = false;
    }
} 

const handleSubmit = async function(e){
    e.preventDefault();
    let uname = username.value;
    let pass = password.value;

    if (!valid_cred(uname, pass)) {
        btn.disabled = true;
        return
    }

    let hashed =  await hash(pass);
    if((uname in dummy_users) && (dummy_users[uname] == hashed)){
        document.cookie= "login=success";
        document.cookie= "user="+uname;
        window.location.href = "../main.html";
        return;
    }else{
        document.cookie = "login=failed";
        window.location.href = "./login.html";
    }

}

const extractCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const HandleLoginFail = () => {
    let login =  extractCookie("login");
    if(login =="failed"){
        errp.innerHTML = "Username or password does not match";
    }
}

username.addEventListener("keyup", checkSubmit);
password.addEventListener("keyup", checkSubmit);
btn.addEventListener("click", handleSubmit);
window.onload = HandleLoginFail();
