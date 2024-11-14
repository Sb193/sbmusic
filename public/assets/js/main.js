let carousel = document.getElementById("carousel");

async function getData() {
  try {
    const response = await fetch('./assets/data/data.json');
    const data = await response.json();

    let datahtml = "";
    let selected = "selected";
    data.forEach(item => {
      datahtml += `<div class="card item ${selected}">
                      <img src="/assets/imgs/${item.avatar}" alt="Image 7" width="100%"/>
                      <div class="card-content roboto-regular ">
                          <h3 class="name roboto-bold">${item.name}</h3>
                          <h4 class="level">${item.education}</h4>
                      </div>
                  </div>`;
      selected = "";
    });
    carousel.innerHTML = datahtml;

    // Sau khi tải xong dữ liệu, chọn tất cả các phần tử `.item`
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
    let currentX =0

    carousel.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX - currentX;
      carousel.style.cursor = 'grabbing';
    });

    carousel.addEventListener('mouseup', () => {
      isDragging = false;
      carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      currentX = e.pageX - startX;
      console.log(currentX)
      if (currentX > 0){
        nextItem()
      } else {
        prevItem()
      }
      
    });
    
    carousel.addEventListener('mouseleave', () => {
      isDragging = false;
      carousel.style.cursor = 'grab';
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

getData();
