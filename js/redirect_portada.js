const d=document;
const $form=d.querySelector('contact-form');
const $inputs=d.querySelectorAll('.in');
console.log($inputs)
$inputs.forEach(input=>{
    const $span =d.createElement('span');
    $span.textContent=input.title;
    $span.classList.add('contact-form-error', 'none');
    input.insertAdjacentElement('afterend', $span);
    let pattern = input.pattern;
    let regex = new RegExp(pattern);
    d.getElementsByTagName('span');
    d.addEventListener('submit',(e)=>{
        e.preventDefault();
        if(input.value.match(regex)){
            window.location.href = 'https://jamat1998.github.io/e-commerce-JAP/portada.html'
        }
        if(input.value === ''){
        $span.classList.remove('none');
    }
})

})
