const sliderConfigs = [
  {
    selector: '.mySwiper-1',
    options: {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      speed: 600,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.mySwiper-1 .swiper-button-next',
        prevEl: '.mySwiper-1 .swiper-button-prev',
      },
      on: {
        autoplayTimeLeft(s, time, progress) {
          const progressBar = document.querySelector('.mySwiper-1 .progress-bar');
          if (progressBar) {
            progressBar.style.width = `${(1 - progress) * 100}%`;
          }
        }
      }
    }
  },
  {
    selector: '.mySwiper-2',
    options: {
      slidesPerView: 3,
      spaceBetween: 20,
      loop: true,
      navigation: {
        nextEl: '.mySwiper-2 .swiper-button-next',
        prevEl: '.mySwiper-2 .swiper-button-prev',
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        520: {
          slidesPerView: 2,
        },
        850: {
          slidesPerView: 3,
        },
      }
    }
  }
];

sliderConfigs.forEach((config) => {
  new Swiper(config.selector, config.options);
});

const tabInputs = document.querySelectorAll(".tabInput");

tabInputs.forEach(function(input) {
    input.addEventListener('change', function() {
        setTimeout(() => {
            sliderConfigs.forEach((config) => {
                const swiperEl = document.querySelector(config.selector);
                if (swiperEl && swiperEl.swiper) {
                    swiperEl.swiper.update();
                }
            });
        }, 50);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const animarElementos = document.querySelectorAll('.slider-text, .info-txt, .info-img img, .credits-info, .support-container, .footer h4, .logo-4');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    animarElementos.forEach(el => observer.observe(el));

    const logoImg = document.getElementById("logoImg");
    
    if (logoImg) {
        const imagen1 = "IMG/9omfjsdnifodsf9sf983432432423523.png"; 
        const imagen2 = "IMG/minecraft_title23.png"; 
        
        setInterval(() => {
            logoImg.style.opacity = 0;
            
            setTimeout(() => {
                if (logoImg.src.includes("9omfjsdnifodsf9sf983432432423523.png")) {
                    logoImg.src = imagen2;
                } else {
                    logoImg.src = imagen1;
                }
                logoImg.style.opacity = 1;
            }, 600);
            
        }, 5000);
    }
});

window.addEventListener("scroll", () => {
    const menu = document.querySelector(".menu");
    if (window.scrollY > 50) {
        menu.classList.add("shrink");
    } else {
        menu.classList.remove("shrink");
    }
});

document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
        document.getElementById('menu').checked = false;
    });
});

function filterWiki() {
    const input = document.getElementById('wikiSearchInput');
    const filter = input.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.wiki-card');
    const noResultsMsg = document.getElementById('noResultsMessage');
    let visibleCount = 0;

    if (filter === "") {
        cards.forEach(card => card.style.display = "none");
        noResultsMsg.style.display = "none";
        return;
    }

    cards.forEach(card => {
        const keywords = card.getAttribute('data-keywords').toLowerCase();
        const cardText = card.textContent.toLowerCase();

        if (keywords.includes(filter) || cardText.includes(filter)) {
            card.style.display = "block";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    if (visibleCount === 0) {
        noResultsMsg.style.display = "block";
    } else {
        noResultsMsg.style.display = "none";
    }
}

function quickSearch(keyword) {
    const input = document.getElementById('wikiSearchInput');
    input.value = keyword;
    filterWiki();
}

function checkEnter(event) {
    if (event.key === 'Enter') {
        filterWiki();
    }
}

function checkSearchInput() {
    const input = document.getElementById('wikiSearchInput');
    if (input.value.trim() === "") {
        const cards = document.querySelectorAll('.wiki-card');
        const noResultsMsg = document.getElementById('noResultsMessage');
        cards.forEach(card => card.style.display = "none");
        noResultsMsg.style.display = "none";
    }
}

function toggleWiki(button) {
    const dropdown = button.parentElement;
    
    document.querySelectorAll('.wiki-dropdown').forEach(item => {
        if (item !== dropdown) {
            item.classList.remove('active');
        }
    });

    dropdown.classList.toggle('active');
}
