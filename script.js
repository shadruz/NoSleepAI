document.addEventListener('DOMContentLoaded', function() {
    // Инициализация библиотеки анимаций AOS
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });
    
    // Обработка мобильного меню
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (burgerMenu) {
        burgerMenu.addEventListener('click', function() {
            burgerMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Плавный скролл для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (navLinks.classList.contains('active')) {
                burgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
            }
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Изменение стиля навигации при скролле
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Обработка FAQ аккордеона
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Закрываем все аккордеоны
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Если текущий аккордеон не был активен, открываем его
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Анимация для hero-изображения
    const heroImage = document.querySelector('.hero-image-container');
    
    if (heroImage) {
        heroImage.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            this.style.transform = `perspective(1000px) rotateY(${deltaX * 5}deg) rotateX(${-deltaY * 5}deg)`;
        });
        
        heroImage.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
            this.style.transition = 'all 0.5s ease';
        });
    }
    
    // Показать cookie-уведомление через 2 секунды после загрузки
    setTimeout(function() {
        const cookieConsent = document.querySelector('.cookie-consent');
        if (cookieConsent && !localStorage.getItem('cookieConsent')) {
            cookieConsent.style.display = 'flex';
        }
    }, 2000);
    
    // Обработка согласия на cookie
    const cookieAccept = document.querySelector('.cookie-accept');
    
    if (cookieAccept) {
        cookieAccept.addEventListener('click', function() {
            const cookieConsent = document.querySelector('.cookie-consent');
            localStorage.setItem('cookieConsent', 'true');
            cookieConsent.style.display = 'none';
        });
    }
    
    // Плавное появление элементов при прокрутке с использованием Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        });
    }, observerOptions);
    
    document.querySelectorAll('.benefit-card, .pricing-card, .testimonial-card').forEach(card => {
        appearOnScroll.observe(card);
    });
    
    // Обработка модального окна демо видео
    const demoButton = document.querySelector('.demo-button');
    
    if (demoButton) {
        demoButton.addEventListener('click', function() {
            // Здесь можно добавить код для показа модального окна с видео
            alert('Здесь будет демо-видео работы бота');
        });
    }
    
    // Обработка кнопок CTA
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('demo-button')) {
                // Перенаправление на форму регистрации или Telegram бота
                // window.location.href = 'https://t.me/your_bot';
                alert('Здесь будет перенаправление на регистрацию или Telegram');
            }
        });
    });
    
    // Кнопки тарифов
    document.querySelectorAll('.pricing-card .secondary-button, .pricing-card .cta-button').forEach(button => {
        button.addEventListener('click', function() {
            const plan = this.closest('.pricing-card').querySelector('h3').textContent;
            alert(`Вы выбрали тариф: ${plan}`);
            // Здесь можно добавить код для перенаправления на страницу оплаты с выбранным тарифом
        });
    });
    
    // Эффекты наведения для карточек
    const cards = document.querySelectorAll('.benefit-card, .pricing-card, .testimonial-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.25)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Отправка формы подписки
    const subscribeForm = document.querySelector('.subscribe-form');
    
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                alert(`Спасибо за подписку! На адрес ${email} отправлено письмо с подтверждением.`);
                this.reset();
            }
        });
    }
}); 