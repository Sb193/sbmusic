let carousel = document.getElementById("carousel");

async function getData() {
  try {
    const response = await fetch('https://sbmusic.pages.dev/public/assets/data/data.json');
    const data = await response.json();

    let datahtml = "";
    let selected = "selected";
    data.forEach(item => {
      datahtml += `<div class="card item ${selected}">
                      <img src="https://sbmusic.pages.dev/public/assets/imgs/${item.avatar}" alt="Image 7" width="100%"/>
                      <div class="card-content roboto-regular ">
                          <h3 class="name roboto-bold">${item.name}</h3>
                          <h4 class="level">${item.education}</h4>
                      </div>
                  </div>`;
      selected = "";
    });
    carousel.innerHTML = datahtml;

    const items = document.querySelectorAll('.item');
    console.log(items.length);
    let currentIndex = 0;

    function updateCarousel() {
      items.forEach((item, index) => {
        item.classList.remove('selected');
        item.style.opacity = index === currentIndex ? '1' : '0.5';
      });

      items[currentIndex].classList.add('selected');
      const offset = -20 * (currentIndex - 2); // Điều chỉnh vị trí trung tâm
      document.querySelector('.carousel').style.transform = `translateX(${offset}%)`;
    }

    function nextItem() {
      if (currentIndex < items.length - 1) 
        currentIndex++;
      else
        currentIndex = 0
      updateCarousel();
    }

    function prevItem() {
      if (currentIndex > 0) 
        currentIndex--;
      else
        currentIndex = items.length - 1
      updateCarousel();
    }

    updateCarousel();

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') nextItem();
      if (e.key === 'ArrowLeft') prevItem();
    });

    let startX = 0;
    let isDragging = false;
    let currentX = 0;

    // Sự kiện cho hành động vuốt trên điện thoại
    carousel.addEventListener('touchstart', (e) => {
      isDragging = true;
      startX = e.touches[0].pageX - currentX;
    });

    carousel.addEventListener('touchend', () => {
      isDragging = false;
    });

    carousel.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      currentX = e.touches[0].pageX - startX;
      if (currentX > 50) { // Điều chỉnh độ nhạy
        nextItem();
        isDragging = false;
      } else if (currentX < -50) { // Điều chỉnh độ nhạy
        prevItem();
        isDragging = false;
      }
    });

    // Sự kiện cho hành động lăn chuột trên máy tính
    let debounceTimeout;
    carousel.addEventListener('wheel', (e) => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        if (e.deltaY > 0) {
          nextItem();
        } else {
          prevItem();
        }
      }, 100); // Điều chỉnh thời gian trễ
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

getData();
