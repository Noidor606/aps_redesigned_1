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
        const randomOpacity = Math.random() * 0.0072 + 0.072; // Твоя прозрачность

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
});