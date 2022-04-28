var slides = document.getElementsByClassName('mySlides');
var dots = document.getElementsByClassName('dot');
var menuFirst = document.querySelector('nav.menu');
const openMenu = document.querySelector('button#menuprime'); 
const head = document.querySelector('header.principal');
const closeButton = document.querySelector('a.close-btn');
var i=0;
var index=0;
function mostrar(){
    slideApresentation(index++);
    setTimeout(mostrar, 5000);
}
function currentSlide(n){
    index = n;
    slideApresentation(index);    
}
function plusSlides(n){
    index += n;
    slideApresentation(index);
}
function slideApresentation(num){
    if(num < 0){
        num = dots.length-1;
        index = num;
    }if(num > dots.length-1){
        num = 0;
        index = num;
    }
    for(i=0; i<dots.length; i++){
        if(num==i){
            slides[num].style.display = 'block';  
        }else{
            slides[i].style.display = 'none';            
        }
    }         
}
function showMenu(){
    head.setAttribute('style', 'height:315px');
    menuFirst.style.display = 'block';
    console.log('sai!!');
}
function closeMenu(){
    head.setAttribute('style', 'height:70px');
    menuFirst.style.display = 'none';
}
openMenu.addEventListener('click', showMenu);
closeButton.addEventListener('click', closeMenu);
mostrar()
