const container = document.getElementById("containerCart");

function inner(img, name, currency, cost, id) {
  container.innerHTML += `
  <td><img src='${img}' width='100px'></td>
  <td>${name}</td>
    <td>${currency}</td>
    <td>${cost}</td>
    <td><div class="input-group-sm col-5">
    <input type='number'class="form-control input" value=1>
    </div>
    </td>
    <td>${currency} ${cost}</td>
    <td>
    <button type="button" class="btn-sm btn-outline-danger btnDelete" value=${id}>Eliminar</button>
    </td>
    </tbody>
    </table>
    `;
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
  }
}
getData();
