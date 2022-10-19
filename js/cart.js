const container = document.getElementById("containerCart");
let costWithSend = document.getElementById("costWithSend");
let sendCost = document.getElementById("sendCost");
let subtotalCost = document.getElementById("subtotalCost");
let inputExpress = document.getElementById("inputExpress");
let inputStandar = document.getElementById("inputStandar");
let inputPremium = document.getElementById("inputPremium");

function inner(img, name, currency, cost, id) {
  container.innerHTML += `
  <td><img src='${img}' width='100px'></td>
  <td>${name}</td>
    <td>${currency}</td>
    <td>${cost}</td>
    <td><div class="input-group-sm col-5">
    <input type='number'class="form-control input" value=1 min=1 required>
    </div>
    </td>
    <td class='ttl'>${currency} ${cost}</td>
    <td>
    <button type="button" class="btn btn-outline-danger btnDelete" value=${id}>Eliminar</button>
    </td>
    </tbody>
    </table>
    `;
}
function calcs(porcent, innerSendCost, innerTotal) {
  let subTotalValue = subtotalCost.textContent.slice(
    4,
    subtotalCost.textContent.length
  );
  let total =
    parseInt(subTotalValue) + (parseInt(subTotalValue) / 100) * porcent;
  let sendType = (parseInt(subTotalValue) / 100) * porcent;
  innerTotal.innerHTML = `USD ${total}`;
  innerSendCost.innerHTML = `USD ${sendType}`;
}

function totalsBuy() {
  let ttl = document.querySelectorAll(".ttl");
  let totalBuy = [];
  for (let element of ttl) {
    let allCount = element.textContent.slice(4, element.textContent.length);
    totalBuy.push(parseInt(allCount));
    let childElements = -element.parentElement.parentElement.childElementCount;
    totalBuy.slice(childElements);
    let subtotal = totalBuy.reduce(function (a, b) {
      return a + b;
    });
    subtotalCost.innerHTML = `USD ${parseInt(subtotal)}`;
    if (inputExpress.checked) {
      calcs(7, sendCost, costWithSend);
    }
    if (inputStandar.checked) {
      calcs(5, sendCost, costWithSend);
    }
    if (inputPremium.checked) {
      calcs(15, sendCost, costWithSend);
    }
  }
}
async function getData() {
  let data = await fetch(CART_INFO_URL);
  if (data.ok) {
    let response = await data.json();

    // INSERTAR RESPUESTA DEL JSON(PRIMER ARTICULO)

    inner(
      response.articles[0].image,
      response.articles[0].name,
      response.articles[0].currency,
      response.articles[0].unitCost,
      response.articles[0].id
    );

    //OBTENER ARTICULOS GUARDADOS EN EL LOCALSTORAGE

    let storage = JSON.parse(localStorage.getItem("CART"));
    let array = [];
    let ids = [];
    array.push(storage);
    for (let item of array[0]) {
      let id = item.id;
      let name = item.name;
      let image = item.image;
      let currency = item.currency;
      let cost = item.cost;
      inner(image, name, currency, cost, id);
      ids.push(item.id);
    }
    const input = document.querySelectorAll(".input");

    //EVENTO INPUT PARA MODIFICAR EN TIEMPO REAL EL SUBTOTAL

    for (let i of input) {
      i.addEventListener("input", (e) => {
        let cuantity = e.target.value;
        let cost = e.path[3].cells[3].textContent;
        let calc = parseInt(cuantity) * parseInt(cost);
        let subtotal = e.path[3].cells[5];
        let currency = e.path[3].cells[2].textContent;
        if (calc > 0) {
          subtotal.innerHTML = `${currency} ${calc}`;
        } else subtotal.innerHTML = `${currency} 0`;
        totalsBuy();
      });
    }
    //FUNCIONALIDAD DEL BOTON ELIMINAR

    let btn = document.querySelectorAll(".btnDelete");

    for (let i of btn) {
      i.addEventListener("click", (e) => {
        e.preventDefault();
        e.path[2].remove();
        let itemId = parseInt(e.target.value);
        if (ids.includes(itemId)) {
          let index = ids.indexOf(itemId);
          array[0].splice(index, 1);
          ids.splice(index, 1);
          localStorage.setItem("CART", JSON.stringify(array[0]));
        }
      });
    }
    totalsBuy();
  }
}
getData();
(() => {
  "use strict";

  //VALIDACIONES INPUTS

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        event.preventDefault();
          const alert = (message, type) => {
            const alertPlaceholder = document.getElementById(
              "liveAlertPlaceholder"
            );

            const wrapper = document.createElement("div");
            wrapper.innerHTML = [
              `<div class="alert alert-${type} alert-dismissible" role="alert">`,
              `   <div>${message}</div>`,
              '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
              "</div>",
            ].join("");
            alertPlaceholder.append(wrapper);
          };
          async function response() {
            let data = await fetch(CART_BUY_URL);
            if (data.ok) {
              let response = await data.json();

              const alertTrigger = document.getElementById("liveAlertBtn");
              alertTrigger.addEventListener("click", () => {
                alert(`${response.msg}`, "success");
                setTimeout(() => {
                  location.reload()
                }, 3500);
              });
            }
          
          }
            response();
          form.classList.add("was-validated");
        },
        false
        );
  });
})();

inputExpress.addEventListener("click", () => {
  calcs(7, sendCost, costWithSend);
});
inputStandar.addEventListener("click", () => {
  calcs(5, sendCost, costWithSend);
});
inputPremium.addEventListener("click", () => {
  calcs(15, sendCost, costWithSend);
});

//VALIDACIONES MODAL INPUTS
let lblTransfer = document.getElementById("lblTransfer");
let inputAccount = document.getElementById("input-account");
let expDate = document.getElementById("exp-date");
let zipCode = document.getElementById("zip-code");
let cardNumber = document.getElementById("card-number");
let accountNumber = document.getElementById("account-number");
let inputCredit = document.getElementById("input-credit");

inputAccount.addEventListener("click", () => {
  expDate.disabled = true;
  zipCode.disabled = true;
  cardNumber.disabled = true;
  accountNumber.disabled = false;
  cardNumber.value = ``;
  zipCode.value = ``;
  expDate.value = ``;
});
inputCredit.addEventListener("click", () => {
  expDate.disabled = false;
  zipCode.disabled = false;
  cardNumber.disabled = false;
  accountNumber.disabled = true;
  accountNumber.value = ``;
});
document.addEventListener("input", () => {
  if (
    inputCredit.checked &&
    expDate.value != "" &&
    zipCode.value !== "" &&
    cardNumber.value !== ""
  ) {
    lblTransfer.classList.remove("is-invalid");
  }
  if (
    (inputCredit.checked && expDate.value == "") ||
    zipCode.value == "" ||
    cardNumber.value == ""
  ) {
    lblTransfer.classList.add("is-invalid");
  }
  if (inputAccount.checked && accountNumber.value !== "") {
    lblTransfer.classList.remove("is-invalid");
  }
  if (inputAccount.checked && accountNumber.value == "") {
    lblTransfer.classList.add("is-invalid");
  }
});
