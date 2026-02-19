// script.js

document.addEventListener('DOMContentLoaded', function() {

    // ---------- Мобильное меню (бургер) ----------
    const burger = document.getElementById('burger');
    const nav = document.getElementById('mainNav');

    burger.addEventListener('click', function() {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Закрыть меню при клике на ссылку
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // ---------- Плавный скролл по якорям ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ---------- Модальные окна ----------
    const consultModal = document.getElementById('consultModal');
    const carModal = document.getElementById('carModal');
    const consultBtn = document.getElementById('consultBtn');
    const closeButtons = document.querySelectorAll('.modal__close');

    // Открыть модалку консультации
    if (consultBtn) {
        consultBtn.addEventListener('click', () => {
            consultModal.classList.add('show');
        });
    }

    // Открыть модалку авто (обработчик на все кнопки "Подробнее")
    document.querySelectorAll('.open-modal').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const car = this.dataset.car;
            // Здесь можно загрузить контент в зависимости от автомобиля
            const carContent = getCarContent(car);
            document.getElementById('carModalContent').innerHTML = carContent;
            carModal.classList.add('show');
        });
    });

    // Закрыть модалки
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            consultModal.classList.remove('show');
            carModal.classList.remove('show');
        });
    });

    // Закрыть по клику вне модалки
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
        }
    });

    // Функция генерации контента для модалки авто
    function getCarContent(car) {
        const cars = {
            camry: {
                title: 'Toyota Camry',
                desc: 'Седан бизнес-класса, 2022 год, 2.5 литра, автомат, передний привод. Комплектация "Люкс": кожаный салон, климат-контроль, камера заднего вида.',
                price: '2 500 000 ₽'
            },
            solaris: {
                title: 'Hyundai Solaris',
                desc: 'Надёжный седан, 2021 год, 1.6 литра, механика. Отличный вариант для города.',
                price: '1 200 000 ₽'
            },
            sportage: {
                title: 'Kia Sportage',
                desc: 'Популярный кроссовер, 2023 год, 2.0 литра, автомат, полный привод. Панорамная крыша, подогрев всех сидений.',
                price: '2 800 000 ₽'
            },
            x5: {
                title: 'BMW X5',
                desc: 'Премиальный внедорожник, 2020 год, 3.0 литра дизель, автомат. Спортивные сиденья, проекционный дисплей.',
                price: '4 500 000 ₽'
            }
        };
        const data = cars[car] || { title: 'Автомобиль', desc: 'Подробное описание отсутствует', price: '0 ₽' };
        return `
            <h2>${data.title}</h2>
            <img src="https://picsum.photos/id/13/600/300" alt="${data.title}" style="width:100%; border-radius:8px; margin:20px 0;">
            <p><strong>Описание:</strong> ${data.desc}</p>
            <p><strong>Цена:</strong> ${data.price}</p>
            <p><strong>Характеристики:</strong> Подробности уточняйте у менеджера.</p>
            <button class="btn btn--primary btn--block" onclick="alert('Форма связи с менеджером по данному авто')">Связаться по этому авто</button>
        `;
    }

    // ---------- Фильтрация каталога ----------
    const filterBtns = document.querySelectorAll('.filter-btn');
    const carCards = document.querySelectorAll('.car-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Убрать активный класс у всех кнопок
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.dataset.filter;

            carCards.forEach(card => {
                if (filterValue === 'all' || card.dataset.type === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ---------- Валидация формы обратной связи (и консультации) ----------
    const feedbackForm = document.getElementById('feedbackForm');
    const consultForm = document.getElementById('consultForm');

    function validatePhone(phone) {
        const phoneRegex = /^\+?[0-9\s\-\(\)]{10,15}$/; // Простая маска
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            let isValid = true;

            // Очистить предыдущие ошибки
            document.getElementById('nameError').textContent = '';
            document.getElementById('phoneError').textContent = '';

            if (name === '') {
                document.getElementById('nameError').textContent = 'Введите имя';
                isValid = false;
            }
            if (!validatePhone(phone)) {
                document.getElementById('phoneError').textContent = 'Введите корректный телефон (10-15 цифр)';
                isValid = false;
            }

            if (isValid) {
                // Показать сообщение об успехе
                document.getElementById('formSuccess').style.display = 'block';
                feedbackForm.reset();
                // Через 3 секунды скрыть
                setTimeout(() => {
                    document.getElementById('formSuccess').style.display = 'none';
                }, 3000);
            }
        });
    }

    if (consultForm) {
        consultForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Заявка отправлена! Мы свяжемся с вами.');
            consultForm.reset();
            consultModal.classList.remove('show');
        });
    }

    // ---------- Анимация появления при скролле (простой вариант) ----------
    const animatedElements = document.querySelectorAll('.service-card, .car-card, .about__content, .contacts__wrapper');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(el);
    });
});
