const d=document;
async function getData(){
    let container = d.querySelector('.prod');
    console.log(container);
    let data = await fetch(PRODUCTS_URL);
    if(data.ok){
        let autos = await data.json(); 
        let info = autos.products;
        for (const auto of info) {
            container.innerHTML += 
            `    
            <div class='products_container'>
            <img class='product-img' src='${auto.image}'>     
            <div class='grid_products'>
            <p id='name'>${auto.name} - ${auto.currency} ${auto.cost}</p>
            <p id='vendidos'>${auto.soldCount} Vendidos</p>
            <p id='description'>${auto.description}</p>
            </div>
            </div>
            `
        }
  
    }
  }
  getData();