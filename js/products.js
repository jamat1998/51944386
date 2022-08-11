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
            <p>Modelo: ${auto.name}</p>
            <p>Costo: ${auto.currency} ${auto.cost}</p>
            <p>Descripcion General: ${auto.description}</p>
            <p>Vendidos: ${auto.soldCount}</p>
            </div>
            </div>
            `
        }
  
    }
  }
  getData();