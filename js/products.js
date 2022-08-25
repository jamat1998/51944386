
function inner(product, array){
    let container = document.querySelector('#cat-list-container');
    for (product of array) {
        container.innerHTML += 
       `    
       <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div>
                        <h4 class="mb-1"> ${product.name} </h4>
                        <h4 class="mb-2">USD$ ${product.cost}</h4>
                        </div>
                        <div class="d-flex w-100 justify-content-end">
                        <small class="text-muted">${product.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${product.description}</p>
                        </div>
                </div>
       ` 
}
}
async function getData(){
    let data = await fetch(PRODUCTS_URL);
    if(data.ok){
        let container = document.querySelector('#cat-list-container');
        let autos = await data.json(); 
        let info = autos.products;
        inner(autos, info);
        
        document.getElementById('sortAsc').addEventListener('click', function(){
            const asc = info.sort(function(a, b) {
                let aCount = parseInt(a.cost);
                let bCount = parseInt(b.cost);
                if ( aCount < bCount ){ return -1; }
                if ( aCount > bCount ){ return 1; }
                return 0;
            })
            container.innerHTML = ''
            inner(autos, asc)
        })
        
        document.getElementById('sortDesc').addEventListener('click', function(){
            
            const des = info.sort(function(a, b) {
                let aCount = parseInt(a.cost);
                let bCount = parseInt(b.cost);
                if ( aCount > bCount ){ return -1; }
                if ( aCount < bCount ){ return 1; }
                return 0;
            })
            container.innerHTML = ''
            inner(autos, des)
        })
        
        document.getElementById('sortByRel').addEventListener('click', function(){
            const rel = info.sort(function(a, b) {
                let aCount = parseInt(a.soldCount);
                let bCount = parseInt(b.soldCount);
                if ( aCount > bCount ){ return -1; }
                if ( aCount < bCount ){ return 1; }
                return 0;
            })
            container.innerHTML = ''
            inner(autos, info)
        })    
        
        document.getElementById("clearRangeFilter").addEventListener("click", function(){
            document.getElementById("rangeFilterPriceMin").value = "";
            document.getElementById("rangeFilterPriceMax").value = "";
        });
        
        document.getElementById("rangeFilterPrice").addEventListener("click", function(){
            minCount = document.getElementById("rangeFilterPriceMin").value;
            maxCount = document.getElementById("rangeFilterPriceMax").value;
            container.innerHTML = ''
            if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
                minCount = parseInt(minCount);
            }
            else{
                minCount = undefined;
            }
            if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
                maxCount = parseInt(maxCount);
            }
            else{
                maxCount = undefined;
            }
            for (let product of info) {
                if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){
                    container.innerHTML += 
                   `    
                   <div class='products_container'>
                   <img class='product-img' src='${product.image}'>     
                   <div class='cards'>
                   <p id='name'>${product.name} - ${product.currency} ${product.cost}</p>
                   <p id='vendidos'>${product.soldCount} Vendidos</p>
                   <p id='description'>${product.description}</p>
                   </div>
                   </div>
                   ` 
                }
        }
    })
    }
}
        getData();
