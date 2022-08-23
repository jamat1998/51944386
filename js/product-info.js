const nav = document.getElementById('ULnavProductsInfo');
const storageEmail = localStorage.getItem('emailValue')
nav.innerHTML += `
<li class="nav-item">
<a class="nav-link active" href="my-profile.html">${storageEmail}</a>
</li>`