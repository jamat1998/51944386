const firstNameInput = document.getElementById("firstNameInput");
const secondNameInput = document.getElementById("secondNameInput");
const firstSurnameInput = document.getElementById("firstSurnameInput");
const secondSurnameInput = document.getElementById("secondSurnameInput");
const contactInput = document.getElementById("contactInput");
const emailInput = document.getElementById("emailInput");
const imageInput = document.getElementById("imageInput");
const viewImage = document.getElementById("viewImage");
const btnSaveChanges = document.getElementById("btnSaveChanges");
const saveChanges = document.getElementById("saveChanges");

//asigno valor por defecto al campo email.
let emailValue = localStorage.getItem("emailValue");
emailInput.value = emailValue;
let imageUrl=''
//imagen en 64bits y la guardo en el localstorage
imageInput.addEventListener("change", (e) => {
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    imageUrl=reader.result
  });

  reader.readAsDataURL(e.target.files[0]);
});

//evento para manipular el formulario
saveChanges.addEventListener("submit", (e) => {
  e.preventDefault();
  let res = {
    secondName: secondNameInput.value,
    firstSurname: firstSurnameInput.value,
    contact: contactInput.value,
    firstName: firstNameInput.value,
    email: emailInput.value,
    secondSurname: secondSurnameInput.value,
    imageProfile:imageUrl
  };
  if(res.imageProfile === ''){
    if(localStorage.getItem(`${emailValue}`)){
      res.imageProfile = JSON.parse(localStorage.getItem(`${emailValue}`)).imageProfile;
    }else res.imageProfile = '/img/profile.jpg'
  }

  localStorage.setItem(`${emailValue}`, JSON.stringify(res));
  
  //alerta de formulario
  btnSaveChanges.innerHTML += 
  `<div id='alertSuccess' class="alert alert-success" role="alert">
  Informacion guardada satisfactoriamente!
  </div>`;
  setTimeout(() => {
    document.getElementById("alertSuccess").remove();
    location.reload();
  }, 2500);
});
//evento para asignarle a los campos la informacion guardada del usuario en el localstorage
document.addEventListener("DOMContentLoaded", () => {
  let items = JSON.parse(localStorage.getItem(`${emailValue}`));
  if (items) {
    secondNameInput.value = items.secondName;
    firstSurnameInput.value = items.firstSurname;
    contactInput.value = items.contact;
    firstNameInput.value = items.firstName;
    emailInput.value = items.email;
    secondSurnameInput.value = items.secondSurname;
    viewImage.setAttribute("src", items.imageProfile);
  }
  if (!items) {
    viewImage.setAttribute("src", "./img/profile.jpg");
  }
});
