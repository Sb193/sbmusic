// Lấy phần tử menu-button và canvas-menu
const menuButton = document.querySelector('#menu-btn');
const menuButtonx = document.querySelector('#button-x')
const canvasMenu = document.querySelector('.nav-mobile');

// Bắt sự kiện khi nhấn vào menu-button
menuButton.addEventListener('click', () => {
    // Thêm lớp active để hiện canvas menu
    canvasMenu.classList.toggle('active');
    canvasMenu.classList.toggle('start');
});

menuButtonx.addEventListener('click',()=>{
    canvasMenu.classList.remove('active')
    canvasMenu.classList.remove('start')
});
