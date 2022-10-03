async function getData() {
  let data = await fetch(CART_INFO_URL);
  if (data.ok) {
    const container = document.getElementById("containerCart");
    let response = await data.json();

    function inner(items, subtotal) {
      container.innerHTML = `
            <table class="table">
            <thead>
            <tr>
            <th scope="col"></th>
            <th scope="col">Nombre</th>
            <th scope="col">Costo</th>
            <th scope="col">Cantidad</th>
            <th scope="col">SubTotal</th>
            </tr>
            </thead>
            <tbody>
            <tr'>
            <td><img src='${items.image}' width='100px'></td>
            <td>${items.name}</td>
            <td>${items.currency} ${items.unitCost}</td>
            <td><div class="input-group-sm col-5">
            <input id='cuantity' type='number'class="form-control" value=1>
            </div>
            </td>
            <td id='subtotal'>${items.currency} ${subtotal}</td>
            </tr>
            </tbody>
            </table>
            <tr>
            `;
    }
    for (let items of response.articles) {
      inner(items, items.unitCost);
      const cuantity = document.getElementById("cuantity");
      cuantity.addEventListener("input", () => {
        const subtotal = document.getElementById("subtotal");
        if(cuantity.value){
            subtotal.innerHTML = `${items.currency} ${
              items.unitCost * parseInt(cuantity.value)
            }`;
        }else subtotal.innerHTML = `${items.currency} 0`;
      });
    }
  }
}
getData();
