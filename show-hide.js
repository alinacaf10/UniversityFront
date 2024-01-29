var buton = document.getElementById("show")
var hide = document.getElementById("hide")
var isButtonVisible = false;

buton.addEventListener('click', function () {
    
if(!isButtonVisible){
    buton.textContent = 'Show';
    hide.style.cssText = 'display:none !important';
    isButtonVisible = true;
}else{
    buton.textContent = 'Hide';
    hide.style.display = 'block';
    isButtonVisible = false;

}
})

function showPopup() {
    document.getElementById('popup-container').style.display = 'block';
    document.getElementById('add').style.display = 'none';
}

function hidePopup() {
    document.getElementById('popup-container').style.display = 'none';
    document.getElementById('add').style.display = 'block';
    document.getElementById('overlay').style.display = 'none';
}

function addInfo() {
    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;

  
    alert('İsim: ' + name + '\nYaş: ' + age);
    document.getElementById('add').style.display = 'block';

    hidePopup();
}