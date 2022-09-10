//funcion asincrona para trabajar con respuesta del json

async function getDatas(){
    let data = await fetch(PRODUCT_INFO_URL);
    if(data.ok){
        let container = document.querySelector('.containerProductsInfo');
        let response = await data.json(); 

        //insertando los cards para los diferentes productos

        container.innerHTML += 
        `
        <div class='ms-5 d-flex flex-column align-items-center'>  
        <h3 class="mb-1 mt-4 mb-4"> ${response.name} </h3>
            <h4 class="mb-1 col">Precio:</h4>
            <p>${response.currency} ${response.cost}</p>
            <h4 class="mb-1">Descripcion:</h4>
            <p>${response.description}</p>
            <h4 class="mb-1 ">Categoria:</h4>
            <p>${response.category}</p>
            <h4 class="mb-1 ">Cantidad de Vendidos:</h4>
            <p>${response.soldCount}</p>
            <h4 class="mb-1 col">Imagenes Iustrativas:</h4>
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
                        <div class="border border-4 d-flex flex-column">
                                    <div class='d-flex flex-row justify-content-around'>
                                    <div>
                                    ${commentStars(comments.score)}${commentblackStars(comments.score)}
                                    </div>
                                    <h5>${comments.user}</h5>
                                    <p>${comments.dateTime}</p>
                                    </div>
                                    <div class='d-flex flex-row justify-content-center'>
                                    <p>${comments.description}</p>
                                    </div>
                                    </div>
                                    `
                    }

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
                    

            //trabajando con la promesa y insertando al dom el contenido

                    async function getcomments(){
                        let data = await fetch(PRODUCT_INFO_COMMENTS_URL);
                        if(data.ok){
                            let response = await data.json(); 
                            cardComments(response)
                            }
                            
                        }
                    getcomments()
                    
                    //trabajando con date para formar la fecha del comentario

                    let date = new Date()
                    let today = date.toLocaleString()

             //envento submit para que se ejecute al ingresar el nuevo comentario

                    document.addEventListener('submit', (e)=>{
                        let textarea =document.getElementById('comment').value
                        let valueSelect=document.getElementById('points').value
                        const spanError = document.getElementById('spanError')
                        const spinner=document.querySelector('.spinner-border')
                        const msgSuccess = document.getElementById('msgSuccess')
                        e.preventDefault();
                        if(textarea !== ''){
                            container.insertAdjacentHTML('afterbegin', 
                             `      
                            <div class="border border-4 d-flex flex-column">
                                        <div class='d-flex flex-row justify-content-around'>
                                        <div>
                                        ${commentStars(valueSelect)}${commentblackStars(valueSelect)}
                                        </div>
                                        <h5>${localStorage.getItem('emailValue')}</h5>
                                        <p>${today}</p>
                                        </div>
                                        <div class='d-flex flex-row justify-content-center'>
                                        <p>${textarea}</p>
                                        </div>
                                        </div>
                                        `
                            )
                            spinner.classList.remove('active')

                            setTimeout(() => {
                                spinner.classList.add('active')   
                                msgSuccess.innerHTML =`<span>Comentario Enviado <img width=30px src="/img/chat.png"></span>`
                               setTimeout(() => {
                                   msgSuccess.innerHTML =''
                               }, 2500);
                            }, 3000);
                            document.getElementById('comment').value = ''
                            spanError.innerHTML = ''
                        }
                        if(textarea === '') {
                            spanError.innerHTML =`<span>Ingrese un comentario</span>`
                        }
                    })
                
