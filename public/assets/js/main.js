let carousel = document.getElementById("carousel");

async function getData() {
  try {
    const response = await fetch('/assets/data/data.json');
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

    

    const items = document.querySelectorAll('.item');
    
    let currentIndex = 0;

    function updateCarousel() {
      items.forEach((item, index) => {
        item.classList.remove('selected');
        item.style.opacity = index === currentIndex ? '1' : '0.5';
      });

      items[currentIndex].classList.add('selected');
      const screenWidth = window.innerWidth;
      let offset = 0;
      if (screenWidth > 748){
        offset = -20 * (currentIndex - 2); // Điều chỉnh vị trí trung tâm
      } else {
        offset = -30 * (currentIndex - 1); // Điều chỉnh vị trí trung tâm
      }
      
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

    
    if (items.length > 0) {
      // Lặp qua từng item trong NodeList và gắn sự kiện click
      items.forEach((item, index) => {
        item.addEventListener('click', () => {
          currentIndex = index
          updateCarousel()
        });
      });
    } else {
      console.error("Không tìm thấy phần tử nào với class .item.");
    }

    

    // Sự kiện cho hành động lăn chuột trên máy tính
    let debounceTimeout;
    carousel.addEventListener('wheel', (e) => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        if (e.deltaY > 0) {
          prevItem();
        } else {
          
          nextItem();
        }
      }, 100); // Điều chỉnh thời gian trễ
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

getData();
