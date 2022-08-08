const body = document.querySelector("body");
const modal = document.querySelector(".modal-container");
const open =document.querySelector(".btn-open-modal");
const close = document.querySelector(".modal-close");

modal.addEventListener('click', (event)=> {
if(event.target === modal){
    closeModal();
}
});


open.addEventListener('click', openModal);
close.addEventListener('click', closeModal);

function openModal(){
    modal.classList.add('open');
    body.style.overflow = "hidden";
}

function closeModal(){
    modal.classList.remove('open');
    body.style.overflow = "auto";
}


export {openModal, closeModal};
