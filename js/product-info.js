//funcion asincrona para trabajar con respuesta del json

async function getDatas(){
    let data = await fetch(PRODUCT_INFO_URL);
    if(data.ok){
        let container = document.querySelector('.containerProductsInfo');
        let response = await data.json(); 

        //insertando los cards para los diferentes productos

        container.innerHTML += 
        `
        <div class='ms-5'>  
        <h3 class="mb-1 mt-4 mb-4"> ${response.name} </h3>
            <h5 class="mb-1 col">Precio:</h5>
            <p>${response.currency} ${response.cost}</p>
            <h5 class="mb-1">Descripcion:</h5>
            <p>${response.description}</p>
            <h5 class="mb-1 ">Categoria:</h5>
            <p>${response.category}</p>
            <h5 class="mb-1 ">Cantidad de Vendidos:</h5>
            <p>${response.soldCount}</p>
            <h5 class="mb-1 col">Imagenes Iustrativas:</h5>
            </div>
            <div id=imagesProductsInfo class='d-flex justify-content-evenly flex-row flex-wrap'>
            ` 

            //recorre las imagenes dentro de la respuesta y las agrego al contenido del sitio

             for(let images of response.images){
                 d.getElementById('imagesProductsInfo').innerHTML += `
                 <img src="${images}" alt="${response.category}" width="300" height="300" class="img-thumbnail my-3">
                 </div>
                             `
                         }
                        }
                    }
                    getDatas();
                    
                    //cards para luego ingresar el contenido al sitio

                    let container = document.querySelector('.containerCommentsInfo');
                    
                    function cardComments(response){
                        for(comments of response){
                            container.innerHTML+=`      
                        <div class="border border-4 mb-2 p-2">
                                    <div class='d-flex flex-row p-2'>
                                    <p class='pe-3 ps-2'>${comments.user}</p>
                                    <p class='pe-5'>${comments.dateTime}</p>
                                    ${commentStars(comments.score)}${commentblackStars(comments.score)}
                                    </div>
                                    <div>
                                    <p class='ps-3'>${comments.description}</p>
                                    </div>
                                    </div>
                                    `
                    }

                    //ingresar puntuacion reccorriendo el score

                    function commentStars(score){
                       let s=''
                        for(let i=0; i<score;i++){
                             s+=`<span class="fa fa-star checked"></span>`
                            }
                            return s;
                        }

                        //completar con estrellas negras

                        function commentblackStars(score){
                                let x=''
                                     const blackStar=5-score;
                                     for(let i=0; i<blackStar;i++){
                                     x+=`<span class="fa fa-star"></span>`
                                 }
                                 return x;
                        }
                    
            }

            //trabajando con la promesa y insertando al dom el contenido

                    async function getcomments(){
                        let data = await fetch(PRODUCT_INFO_COMMENTS_URL);
                        if(data.ok){
                            let response = await data.json(); 
                            cardComments(response)
                            }
                            
                        }
                    getcomments()
                    
                    //trabajando con el objeto date para formar la fecha del comentario

                    const date = new Date
                    const day = date.getDate()
                    const month = date.getMonth()
                    const year = date.getFullYear()
                    const minutes = date.getMinutes()
                    const hour = date.getHours()
                    const seconds = date.getSeconds()

             //envento submit para que se ejecute al ingresar el nuevo comentario

                    document.addEventListener('submit', (e)=>{
                        let textarea =document.getElementById('comment').value
                        let valueSelect=document.getElementById('points').value
                        e.preventDefault();

                        container.insertAdjacentHTML('afterbegin', `
                        <div class="border border-4 mb-2 p-2">
                        <div class='d-flex flex-row p-2'>
                        <p class='pe-3 ps-2'>${localStorage.getItem('emailValue')}</p>
                        <p class='pe-5'>${year}-${month}-${day} ${hour}:${minutes}:${seconds}</p>
                        ${commentStars(valueSelect)}${commentblackStars(valueSelect)}
                        </div>
                        <div>
                        <p class='ps-3'>${textarea}</p>
                        </div>
                        </div>
                        `)
                        
                 })
                
