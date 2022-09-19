//funcion asincrona para trabajar con respuesta del json

async function getDatas(){
    let data = await fetch(PRODUCT_INFO_URL);
    if(data.ok){
        let container = document.querySelector('.containerProductsInfo');
        let response = await data.json(); 

        //insertando los cards para los diferentes productos

        container.innerHTML += 
        `<div class="container border my-4 py-3">
        <h2 class="d-flex justify-content-center"> ${response.name} </h2>
        <div class="row align-items-start">
        <div class='col'> 
        <div id="carouselExampleCaptions" class="carousel carousel-dark slide" data-bs-ride="carousel">
        <div class="carousel-indicators ">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                 <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                 <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                 <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
                 </div>
                           <div class="carousel-inner">
                             <div class="carousel-item active">
                               <img src="${response.images[0]}" class="d-block w-100">
                               <div class="carousel-caption d-none d-md-block">
                               </div>
                               </div>
                             <div class="carousel-item">
                             <img src="${response.images[1]}" class="d-block w-100">
                               <div class="carousel-caption d-none d-md-block">
                               </div>
                               </div>
                               <div class="carousel-item">
                               <img src="${response.images[2]}" class="d-block w-100">
                               <div class="carousel-caption d-none d-md-block">
                               </div>
                               </div>
                           <div class="carousel-item">
                           <img src="${response.images[3]}" class="d-block w-100">
                           <div class="carousel-caption d-none d-md-block">
                           </div>
                           </div>
                           </div>
                           <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                           <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                           <span class="visually-hidden">Previous</span>
                           </button>
                           <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                           <span class="carousel-control-next-icon" aria-hidden="true"></span>
                           <span class="visually-hidden">Next</span>
                           </button>
                           </div>
                           </div>
                           <div class='col'>
                               <h4 class="mb-1">Precio:</h4>
                               <p>${response.currency} ${response.cost}</p>
                               <h4 >Descripcion:</h4>
                               <p>${response.description}</p>
                               <h4 class="mb-1 ">Categoria:</h4>
                               <p>${response.category}</p>
                               <h4 class="mb-1 ">Cantidad de Vendidos:</h4>
                               <p>${response.soldCount}</p>
                               </div>
                           </div>
                           </div>
                           </div>
                         `
                            
                           document.getElementById('relatedImages').innerHTML += `
                           <h4 class="d-flex flex-row justify-content-center my-4">Productos Relacionados</h4>
                          <div id="carouselRelated" class="carousel carousel-dark slide" data-bs-ride="carousel">
                           <div class="carousel-indicators">
                             <button type="button" data-bs-target="#carouselRelated" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                             <button type="button" data-bs-target="#carouselRelated" data-bs-slide-to="1" aria-label="Slide 2"></button>
                           </div>
                           <div class="carousel-inner">
                             <div class="carousel-item active">
                               <img src="${response.relatedProducts[0].image}" class="d-block w-100">
                               <div class="carousel-caption d-none d-md-block">
                                 <h4>${response.relatedProducts[0].name}</h4>
                               </div>
                             </div>
                             <div class="carousel-item">
                               <img src="${response.relatedProducts[1].image}" class="d-block w-100">
                               <div class="carousel-caption d-none d-md-block">
                                 <h4>${response.relatedProducts[1].name}</h4>
                               </div>
                             </div>
                           </div>
                           <button class="carousel-control-prev" type="button" data-bs-target="#carouselRelated" data-bs-slide="prev">
                             <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                             <span class="visually-hidden">Previous</span>
                           </button>
                           <button class="carousel-control-next" type="button" data-bs-target="#carouselRelated" data-bs-slide="next">
                             <span class="carousel-control-next-icon" aria-hidden="true"></span>
                             <span class="visually-hidden">Next</span>
                           </button>
                         </div>
                         `
                                    }
                                   
                        }

                    
                    getDatas();
                    
                    //cards para luego ingresar el contenido al sitio

                    let container = document.querySelector('.containerCommentsInfo');
                    
                    function cardComments(response){
                        for(comments of response){
                            container.innerHTML+=`      
                        <div class="border border d-flex flex-column mx-5 my-2">
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
                    

                        function cardRelated(response){
                            for(let images of response.relatedProducts){
                                d.getElementById('relatedImages').innerHTML += `
                                <img src="${images}" alt="${response.category}" width="300" height="300" class="img-thumbnail my-3">
                                </div>
                                            `
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
                            spinner.classList.remove('active')
                            setTimeout(() => {
                            container.insertAdjacentHTML('afterbegin', 
                             `      
                            <div class="border d-flex flex-column mx-5 my-2">
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
                                spinner.classList.add('active')   
                                msgSuccess.innerHTML =`<span>Comentario Enviado <img width=30px src="./img/chat.png"></span>`
                               
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
                
