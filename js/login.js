const d=document;
const $form=d.querySelector('contact-form');
const $inputs=d.querySelectorAll('.in');
$inputs.forEach(input=>{
    const $span =d.createElement('span');
    $span.textContent=input.title;
    $span.classList.add('contact-form-error', 'none');
    input.insertAdjacentElement('afterend', $span);
    d.addEventListener('submit',(e)=>{
        e.preventDefault();
        if((!$inputs[1].value == '') && (!$inputs[0].value == '')){
            localStorage.setItem('emailValue', $inputs[0].value)
            const imagenull= '' 
            localStorage.setItem('profilePicture', imagenull)
            window.location.href = 'https://jamat1998.github.io/e-commerce-JAP/portada.html'
        }
        if(input.value == ''){
            $span.classList.remove('none')
            setTimeout(() => {
                $span.classList.add('none');
            }, 4000);
            
        }
    })
    
})
