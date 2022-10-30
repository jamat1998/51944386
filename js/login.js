
const $form=document.getElementById('form');
const $inputs=document.querySelectorAll('.in');
$inputs.forEach(input=>{
    const $span =document.createElement('span');
    $span.textContent=input.title;
    $span.classList.add('contact-form-error', 'none');
    input.insertAdjacentElement('afterend', $span);
    $form.addEventListener('submit',(e)=>{
        e.preventDefault();
        if((!$inputs[1].value == '') && (!$inputs[0].value == '')){
            localStorage.setItem('emailValue', $inputs[0].value)
            window.location.href = 'https://jamat1998.github.io/e-commerce-JAP/frontPage.html'
        }
        if(input.value == ''){
            $span.classList.remove('none')
            setTimeout(() => {
                $span.classList.add('none');
            }, 4000);
            
        }
    })
    
})
