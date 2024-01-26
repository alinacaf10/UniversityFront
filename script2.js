var buton = document.getElementById("show")
var hide = document.getElementById("hide")
var isButtonVisible = false;

buton.addEventListener('click', function () {
    
if(!isButtonVisible){
    buton.textContent = 'Show';
    hide.style.display = 'none';
    isButtonVisible = true;
}else{
    buton.textContent = 'Hide';
    hide.style.display = 'flex';
    isButtonVisible = false;

}
})