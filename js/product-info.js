//funcion asincrona para trabajar con respuesta del json
async function getDatas() {
  let data = await fetch(PRODUCT_INFO_URL);
  if (data.ok) {
    let container = document.querySelector(".containerProductsInfo");
    let response = await data.json();

    //insertando los cards para los diferentes productos

    for (let i = 0; i < response.images.length; i++) {
      document.getElementById("innerCarousel").innerHTML += `
    <div class="carousel-item itemProduct">
      <img src="${response.images[i]}" class="d-block w-100" />
      <div class="carousel-caption d-none d-md-block"></div>
    </div>`;

      const item = document.querySelectorAll(".itemProduct");
      item[0].classList.add("active");
    }
    for (let i = 0; i < response.relatedProducts.length; i++) {
      document.getElementById("carouselItemRelated").innerHTML += `
       <div class="carousel-item itemRelated">
        <img src="${response.relatedProducts[i].image}" class="d-block w-100">
       <div class="carousel-caption d-none d-md-block">
         <h4 class='bg-light py-1 rounded'>${response.relatedProducts[i].name}</h4>
       </div>`;

      const itemRelated = document.querySelectorAll(".itemRelated");
      itemRelated[0].classList.add("active");
    }
    container.innerHTML += `
    <h2>${response.name}</h2>
    <div class="d-flex justify-content-end mx-5">
      <button id="btnBuy" type="button" class="btn btn-success">Comprar</button>
    </div>
    <div class="col">
      <h4 class="mb-1">Precio:</h4>
      <p>${response.currency} ${response.cost}</p>
      <h4>Descripcion:</h4>
      <p>${response.description}</p>
      <h4 class="mb-1">Categoria:</h4>
      <p>${response.category}</p>
      <h4 class="mb-1">Cantidad de Vendidos:</h4>
      <p>${response.soldCount}</p>
    </div>
        `;

    let btn = document.getElementById("btnBuy");
    btn.addEventListener("click", () => {
      btn.disabled = true;
      btn.insertAdjacentHTML(
        "beforebegin",
        `<span class='mx-5' id='alert'>
           Se agrego el articulo al carrito!
        </span>`
      );
      setTimeout(() => {
        let alert = document.getElementById("alert");
        alert.remove();
      }, 2500);
      let data = JSON.parse(localStorage.getItem("CART"));
      if (!data) data = [];
      let res = {
        id: response.id,
        name: response.name,
        image: response.images[0],
        cost: response.cost,
        currency: response.currency,
      };
      data.push(res);

      localStorage.setItem("CART", JSON.stringify(data));
    });
  }
}

getDatas();

//cards para luego ingresar el contenido al sitio.

let container = document.querySelector(".containerCommentsInfo");

function cardComments(response) {
  for (comments of response) {
    console.log(comments.user.split("@"));
    container.innerHTML += `      
    <div class="border rounded d-flex flex-column my-2">
      <div class="d-flex flex-row justify-content-around">
      <p>${comments.dateTime}</p>
      <h5>${comments.user}</h5>
      <div>
      ${commentStars(comments.score)}${commentblackStars(comments.score)}
      </div>
        </div>
        <hr class='m-0'>
      <div>
        <p class='mt-2'>${comments.description}</p>
      </div>
    </div>
  `;
  }
}
//ingresar puntuacion reccorriendo el score

function commentStars(score) {
  let s = "";
  for (let i = 0; i < score; i++) {
    s += `<span class="fa fa-star checked"></span>`;
  }
  return s;
}

//completar con estrellas negras

function commentblackStars(score) {
  let x = "";
  const blackStar = 5 - score;
  for (let i = 0; i < blackStar; i++) {
    x += `<span class="fa fa-star"></span>`;
  }
  return x;
}

//trabajando con la promesa y insertando al dom el contenido

async function getcomments() {
  let data = await fetch(PRODUCT_INFO_COMMENTS_URL);
  if (data.ok) {
    let response = await data.json();
    cardComments(response);
  }
}
getcomments();

//trabajando con date para formar la fecha del comentario

let date = new Date();
let today = date.toLocaleString();

//envento submit para que se ejecute al ingresar el nuevo comentario

document.addEventListener("submit", (e) => {
  let textareaValue = document.getElementById("comment").value;
  let valueSelect = document.getElementById("points").value;
  const spanError = document.getElementById("spanError");
  const spinner = document.querySelector(".spinner-border");
  const msgSuccess = document.getElementById("msgSuccess");
  e.preventDefault();
  if (textareaValue !== "") {
    spinner.classList.remove("active");
    setTimeout(() => {
      let user = localStorage.getItem("emailValue").split("@");
      container.insertAdjacentHTML(
        "afterbegin",
        `    <div class="border rounded d-flex flex-column my-2">
        <div class="d-flex flex-row justify-content-around">
        <p>${today}</p>
        <h5>${user[0]}</h5>
        <div>${commentStars(valueSelect)}${commentblackStars(valueSelect)}</div>
        </div>
        <hr class='m-0'>
        <div>
          <p class='mt-2'>${textareaValue}</p>
          </div>
               </div>
      `
      );
      spinner.classList.add("active");
      msgSuccess.innerHTML = `<span>Comentario Enviado <img width=30px src="./img/chat.png"></span>`;

      setTimeout(() => {
        msgSuccess.innerHTML = "";
      }, 2500);
    }, 3000);
    document.getElementById("comment").value = "";
    spanError.innerHTML = "";
  }
  if (textareaValue === "") {
    spanError.innerHTML = `<span>Ingrese un comentario</span>`;
  }
});
