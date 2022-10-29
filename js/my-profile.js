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

let emailValue = localStorage.getItem("emailValue");
emailInput.value = emailValue;

  imageInput.addEventListener('change',(e)=>{
    const reader= new FileReader();
  
    reader.addEventListener('load',()=>{
      localStorage.setItem(`imageProfile de ${emailValue}`, reader.result)
    })
    
    reader.readAsDataURL(e.target.files[0])
  })
  

saveChanges.addEventListener("submit", (e) => {
  e.preventDefault();
  const imageProfile= localStorage.getItem(`imageProfile de ${emailValue}`)
  let res = {
    secondName: secondNameInput.value,
    firstSurname: firstSurnameInput.value,
    contact: contactInput.value,
    firstName: firstNameInput.value,
    email: emailInput.value,
    secondSurname: secondSurnameInput.value,
    imageProfile
  };

  localStorage.setItem(`${emailValue}`, JSON.stringify(res));
  btnSaveChanges.innerHTML += 
  `<div id='alertSuccess' class="alert alert-success" role="alert">
         Informacion guardada satisfactoriamente!
         </div>`;
         setTimeout(() => {
           document.getElementById("alertSuccess").remove();
           location.reload()
          }, 2500);
        
          
        });
        
        document.addEventListener("DOMContentLoaded", () => {
          
          let items = JSON.parse(localStorage.getItem(`${emailValue}`));
          if(items){
            secondNameInput.value = items.secondName;
            firstSurnameInput.value = items.firstSurname;
            contactInput.value = items.contact;
            firstNameInput.value = items.firstName;
            emailInput.value = items.email;
            secondSurnameInput.value = items.secondSurname;
            viewImage.setAttribute('src', items.imageProfile)
          }
          if(!items){
            viewImage.setAttribute('src', './img/profile.jpg')
          }
          
});
