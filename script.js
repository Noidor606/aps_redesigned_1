// --- ОСНОВНОЙ КОД САЙТА ---
document.addEventListener('DOMContentLoaded', () => {
/**
 * ГЕНЕРАТОР ДИНАМИЧЕСКОГО ФОНА (ВАША ВЕРСИЯ)
 */
function createDynamicBackground() {
    const backgroundContainer = document.getElementById('dynamic-background');
    if (!backgroundContainer) return;

    backgroundContainer.innerHTML = '';

    // --- НАСТРОЙКИ (ВАШИ ОРИГИНАЛЬНЫЕ) ---
    const iconFiles = [ 'icon1.png', 'icon2.png', 'icon3.png', 'icon4.png', 'icon5.png', 'icon6.png', 'icon7.png', 'icon8.png', 'icon9.png', 'icon10.png', 'icon11.png', 'icon12.png', 'icon14.png', 'icon15.png', 'icon16.png', 'icon17.png' ];
    const iconCount = 1750; // Твое количество
    // -----------------

    for (let i = 0; i < iconCount; i++) {
        const wrapper = document.createElement('div');
        wrapper.className = 'bg-icon-wrapper';
        const img = document.createElement('img');
        img.className = 'bg-icon';

        // --- ПРИМЕНЯЕМ РАНДОМ (ВАШИ ОРИГИНАЛЬНЫЕ НАСТРОЙКИ) ---
        const randomIcon = iconFiles[Math.floor(Math.random() * iconFiles.length)];
        const randomSize = Math.random() * 8 + 30; // Твой диапазон 30-38px
        const randomAngle = Math.random() * 30 - 15; // Твой диапазон наклона
        const randomOpacity = Math.random() * 0.0072 + 0.06; // Твоя прозрачность

        img.src = randomIcon;
        img.style.width = `${randomSize}px`;
        img.style.height = `${randomSize}px`;
        img.style.transform = `rotate(${randomAngle}deg)`;
        img.style.opacity = randomOpacity;

        wrapper.appendChild(img);
        backgroundContainer.appendChild(wrapper);
    }
}
    // Запускаем генератор фона
    createDynamicBackground();

    // Перегенерировать фон при изменении размера окна
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(createDynamicBackground, 250);
    });

    // --- ЖЕЛЕЗНЫЙ ФИКС СКРОЛЛА ПРИ ЗАГРУЗКЕ ---
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    } else {
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        }
    }
    window.scrollTo(0, 0);

    // --- ЛОГИКА ШАПКИ ---
    const header = document.querySelector('.site-header');
    if (header) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        header.classList.add('header-scrolled');
                    } else {
                        header.classList.remove('header-scrolled');
                    }
                });
            },
            { rootMargin: `-80px 0px 0px 0px` }
        );
        const heroSection = document.querySelector('#hero');
        if (heroSection) {
            observer.observe(heroSection);
        }
    }

    // --- ПЛАВНЫЙ СКРОЛЛ ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = document.querySelector('.site-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- БУРГЕР-МЕНЮ ---
    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav-links');
    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('open');
            burger.classList.toggle('open');
        });
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('open')) {
                    nav.classList.remove('open');
                    burger.classList.remove('open');
                }
            });
        });
    }

    // --- АНИМАЦИЯ ЭЛЕМЕНТОВ ПРИ СКРОЛЛЕ ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        animatedElements.forEach(el => observer.observe(el));
    }



    // --- ЛОГИКА ЛАЙТБОКСА ДЛЯ ГАЛЕРЕИ (V5: С ИСПРАВЛЕННОЙ АНИМАЦИЕЙ ОТДАЛЕНИЯ) ---
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
if (galleryItems.length > 0 && lightbox) {
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    let isZoomed = false;

    // Функция, которая приводит картинку в ИСХОДНОЕ состояние
    const resetImageState = () => {
        isZoomed = false;
        lightboxImage.classList.remove('zoomed');
        lightboxImage.style.transform = 'scale(1)';
        lightboxImage.style.transformOrigin = 'center center';
    };

    const openLightbox = (imageUrl) => {
        resetImageState(); // Всегда начинаем с чистого листа
        lightboxImage.setAttribute('src', imageUrl);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    };
    
    // --- ГЛАВНАЯ ЛОГИКА ---
    lightboxImage.addEventListener('click', e => {
        if (e.target !== lightboxImage) return;

        if (!isZoomed) {
            // --- ЭТАП ПРИБЛИЖЕНИЯ ---
            isZoomed = true;
            const rect = lightboxImage.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            lightboxImage.style.transformOrigin = `${x}px ${y}px`;
            lightboxImage.style.transform = 'scale(1.75)';
            lightboxImage.classList.add('zoomed');
        } else {
            // --- ЭТАП ОТДАЛЕНИЯ ---
            isZoomed = false;
            // Просто запускаем анимацию уменьшения. Origin ПОКА НЕ ТРОГАЕМ.
            lightboxImage.style.transform = 'scale(1)';
            lightboxImage.classList.remove('zoomed');
        }
    });

    // --- НОВЫЙ КЛЮЧЕВОЙ БЛОК: СЛУШАЕМ КОНЕЦ АНИМАЦИИ ---
    lightboxImage.addEventListener('transitionend', () => {
        // Этот код сработает ПОСЛЕ того, как любая анимация на картинке закончится.
        // Мы проверяем, если картинка в итоге НЕ увеличена...
        if (!isZoomed) {
            // ...значит, это только что закончилась анимация отдаления.
            // И ТОЛЬКО ТЕПЕРЬ мы безопасно сбрасываем origin в центр.
            lightboxImage.style.transformOrigin = 'center center';
        }
    });

    // --- Остальные обработчики без изменений ---
    galleryItems.forEach(item => {
        item.addEventListener('click', e => {
            e.preventDefault();
            openLightbox(item.getAttribute('href'));
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

}
    // --- ЛОГИКА МОДАЛЬНОГО ОКНА ЗАЯВКИ ---
const modalContainer = document.getElementById('modal-container');
if (modalContainer) {
    // Находим все кнопки, которые должны открывать окно
    const openModalButtons = document.querySelectorAll('.btn-primary, .header-cta'); 
    const modalWindow = modalContainer.querySelector('.modal-window');
    const closeModalButton = modalContainer.querySelector('.modal-close');
    const cancelButton = modalContainer.querySelector('.btn-cancel');
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    const openModal = () => {
        modalContainer.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    const closeModal = () => {
        modalContainer.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    openModalButtons.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault(); // Всегда предотвращаем стандартное действие
            openModal();
        });
    });

    closeModalButton.addEventListener('click', closeModal);
    cancelButton.addEventListener('click', closeModal);
    modalContainer.addEventListener('click', e => {
        if (e.target === modalContainer) { // Закрываем только по клику на темный фон
            closeModal();
        }
    });

    // --- ОТПРАВКА ФОРМЫ ЧЕРЕЗ AJAX ---
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const submitButton = this.querySelector('.btn-submit');
        
        submitButton.disabled = true;
        submitButton.textContent = 'Отправка...';
        formStatus.style.display = 'none';

        fetch('send_mail.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                formStatus.textContent = data.message;
                formStatus.className = 'success';
                contactForm.reset();
                setTimeout(() => {
                    closeModal();
                    // Сбрасываем сообщение через некоторое время после закрытия
                    setTimeout(() => { formStatus.style.display = 'none'; }, 500);
                }, 3000); 
            } else {
                formStatus.textContent = data.message;
                formStatus.className = 'error';
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            formStatus.textContent = 'Произошла сетевая ошибка. Пожалуйста, попробуйте позже.';
            formStatus.className = 'error';
        })
        .finally(() => {
             // Возвращаем кнопку в исходное состояние
            submitButton.disabled = false;
            submitButton.textContent = 'Отправить заявку';
        });
    });
}

});