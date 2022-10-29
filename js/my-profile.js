const firstNameInput=document.getElementById('firstNameInput')
const secondNameInput=document.getElementById('secondNameInput')
const firstSurnameInput=document.getElementById('firstSurnameInput')
const secondSurnameInput=document.getElementById('secondSurnameInput')
const contactInput=document.getElementById('contactInput')
const emailInput=document.getElementById('emailInput')
const btnSaveChanges=document.getElementById('btnSaveChanges')
const saveChanges=document.getElementById('saveChanges')

let emailValue = localStorage.getItem("emailValue");
emailInput.value=`${emailValue}`

saveChanges.addEventListener('submit',(e)=>{
  e.preventDefault()

  let res = {
    secondNameInput:secondNameInput.value,
    firstSurnameInput:firstSurnameInput.value,
    contactInput:contactInput.value,
    firstNameInput:firstNameInput.value,
    emailInput:emailInput.value,
    secondSurnameInput:secondSurnameInput.value
  };
  localStorage.setItem(`${emailValue}`, JSON.stringify(res));
});
document.addEventListener('DOMContentLoaded',()=>{
  let items = JSON.parse(localStorage.getItem(`${emailValue}`));
    secondNameInput.value=items.secondNameInput
    firstSurnameInput.value=items.firstSurnameInput
    contactInput.value=items.contactInput
    firstNameInput.value=items.firstNameInput
    emailInput.value=items.emailInput
    secondSurnameInput.value=items.secondSurnameInput
})
