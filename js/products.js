async function getData(){
    let data = await fetch(PRODUCTS_URL);
    if(data.ok){
        let autos = await data.json(); 
        let info = autos.products;
        for (const auto of info) {
            parrafo.innerHTML += `
                <div class="pokemon">
                    <div>${pokemon.name}</div>
                    <img src="${imagenDelPokemon.sprites.back_default}">
                    <img src="${imagenDelPokemon.sprites.front_default}">
                </div>
            `
        }
  
    }
  }