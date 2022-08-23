document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
const nav = document.querySelectorAll('navbarNav');
const storageEmail = localStorage.getItem('emailValue')
nav.innerHTML += `
<li class="nav-item">
<a class="nav-link active" href="my-profile.html">${storageEmail}</a>
</li>`
});