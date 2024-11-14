// Lấy phần tử menu-button và canvas-menu
const menuButton = document.querySelector('.menu-button');
const canvasMenu = document.querySelector('.canvas-menu');

// Bắt sự kiện khi nhấn vào menu-button
menuButton.addEventListener('click', () => {
    // Thêm lớp active để hiện canvas menu
    canvasMenu.classList.toggle('active');
});
