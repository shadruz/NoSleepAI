document.addEventListener('DOMContentLoaded', function() {
    // Инициализация библиотеки анимаций AOS
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });
    
    // Переключение языка
    const langButtons = document.querySelectorAll('.lang-button');
    const htmlTag = document.documentElement;
    
    // Проверка сохраненного языка в localStorage
    const savedLang = localStorage.getItem('selectedLang');
    if (savedLang) {
        htmlTag.setAttribute('lang', savedLang);
        langButtons.forEach(button => {
            if (button.dataset.lang === savedLang) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
    
    // Обработка клика по кнопкам языка
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.dataset.lang;
            
            // Сохраняем выбранный язык
            localStorage.setItem('selectedLang', lang);
            
            // Устанавливаем атрибут lang для html
            htmlTag.setAttribute('lang', lang);
            
            // Обновляем активную кнопку
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Обновляем Title страницы
            if (lang === 'en') {
                document.title = 'NoSleepAI - Automated Trading Bot 24/7';
            } else {
                document.title = 'NoSleepAI - Автоматизированный торговый бот 24/7';
            }
        });
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
    const cookieAcceptButtons = document.querySelectorAll('.cookie-accept');
    
    if (cookieAcceptButtons.length) {
        cookieAcceptButtons.forEach(button => {
            button.addEventListener('click', function() {
                const cookieConsent = document.querySelector('.cookie-consent');
                localStorage.setItem('cookieConsent', 'true');
                cookieConsent.style.display = 'none';
            });
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
    const demoButtons = document.querySelectorAll('.demo-button');
    const iframes = document.querySelectorAll('.demo-screenshot iframe');
    
    if (demoButtons.length) {
        demoButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Получаем текущий язык
                const currentLang = document.documentElement.lang;
                
                // Находим соответствующий iframe для текущего языка
                const targetIframe = Array.from(iframes).find(iframe => 
                    iframe.classList.contains(currentLang + '-content')
                );
                
                if (targetIframe) {
                    // Получаем текущий URL видео
                    const currentSrc = targetIframe.src;
                    
                    // Проверяем, содержит ли URL параметр autoplay
                    if (currentSrc.includes('autoplay=1')) {
                        // Если видео уже воспроизводится, останавливаем его
                        targetIframe.src = currentSrc.replace('autoplay=1', 'autoplay=0');
                    } else {
                        // Если видео не воспроизводится, запускаем его
                        targetIframe.src = currentSrc.replace('autoplay=0', 'autoplay=1');
                    }
                }
            });
        });
    }
    
    // Обработка кнопок CTA
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('demo-button')) {
                // Проверяем, содержит ли кнопка текст "Попробовать бесплатно", "Try for free", "Начать бесплатный период" или "Start free trial"
                const buttonText = this.textContent.trim();
                if (buttonText === 'Попробовать бесплатно' || buttonText === 'Try for free' || 
                    buttonText === 'Начать бесплатный период' || buttonText === 'Start free trial') {
                    // Открываем модальное окно регистрации
                    openRegistrationModal();
                } else if (buttonText === 'Выбрать тариф' || buttonText === 'Choose plan' || 
                          buttonText === 'Оставить заявку' || buttonText === 'Submit request' || 
                          buttonText === 'Начать сейчас' || buttonText === 'Start now') {
                    // Перенаправление на Telegram
                    window.open('https://t.me/NoSleepAI_CEO', '_blank');
                } else {
                    // Для других CTA кнопок оставляем прежнее поведение
                    const lang = htmlTag.getAttribute('lang') || 'ru';
                    if (lang === 'en') {
                        alert('This will redirect to registration or Telegram');
                    } else {
                        alert('Здесь будет перенаправление на регистрацию или Telegram');
                    }
                }
            }
        });
    });
    
    // Обработка кнопки "Узнать больше" / "Learn more"
    document.querySelectorAll('.secondary-button').forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            if (buttonText === 'Узнать больше' || buttonText === 'Learn more') {
                // Прокрутка к разделу benefits
                const benefitsSection = document.getElementById('benefits');
                if (benefitsSection) {
                    window.scrollTo({
                        top: benefitsSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            } else if (buttonText === 'Выбрать тариф' || buttonText === 'Choose plan' || 
                      buttonText === 'Оставить заявку' || buttonText === 'Submit request' || 
                      buttonText === 'Начать сейчас' || buttonText === 'Start now') {
                // Перенаправление на Telegram
                window.open('https://t.me/NoSleepAI_CEO', '_blank');
            }
        });
    });
    
    // Функциональность модального окна регистрации
    const registrationModal = document.getElementById('registration-modal');
    const modalClose = document.querySelector('.modal-close');
    const registrationForm = document.getElementById('registration-form');
    
    // Функция открытия модального окна
    function openRegistrationModal() {
        registrationModal.style.display = 'block';
        
        // Небольшая задержка для анимации
        setTimeout(() => {
            registrationModal.classList.add('active');
        }, 10);
        
        // Блокируем скролл на странице
        document.body.style.overflow = 'hidden';
    }
    
    // Функция закрытия модального окна
    function closeRegistrationModal() {
        registrationModal.classList.remove('active');
        
        // Ждем завершения анимации
        setTimeout(() => {
            registrationModal.style.display = 'none';
            // Возвращаем скролл на страницу
            document.body.style.overflow = '';
        }, 300);
    }
    
    // Обработка клика по крестику закрытия
    if (modalClose) {
        modalClose.addEventListener('click', closeRegistrationModal);
    }
    
    // Закрытие модального окна при клике вне его
    window.addEventListener('click', function(event) {
        if (event.target === registrationModal) {
            closeRegistrationModal();
        }
    });
    
    // Обработка отправки формы
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем данные формы
            const formData = new FormData(this);
            const currentUrl = window.location.href;
            
            // Устанавливаем URL возврата после отправки формы
            const hiddenNext = this.querySelector('input[name="_next"]');
            if (hiddenNext) {
                hiddenNext.value = currentUrl;
            }
            
            // Отправка формы через fetch API
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                // Если успешно, показываем сообщение об успехе
                const formElement = document.getElementById('registration-form');
                const successElement = document.querySelector('.form-success');
                
                formElement.style.display = 'none';
                successElement.style.display = 'block';
                
                // Закрываем модальное окно через 3 секунды
                setTimeout(() => {
                    closeRegistrationModal();
                    
                    // Через некоторое время возвращаем форму в исходное состояние
                    setTimeout(() => {
                        formElement.reset();
                        formElement.style.display = 'block';
                        successElement.style.display = 'none';
                    }, 500);
                }, 3000);
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');
            });
        });
    }
    
    // Кнопки тарифов
    document.querySelectorAll('.pricing-card .secondary-button, .pricing-card .cta-button').forEach(button => {
        button.addEventListener('click', function() {
            const lang = htmlTag.getAttribute('lang') || 'ru';
            const plan = this.closest('.pricing-card').querySelector(lang === 'en' ? '.en-content' : '.ru-content').textContent;
            
            if (lang === 'en') {
                alert(`You have selected the plan: ${plan}`);
            } else {
                alert(`Вы выбрали тариф: ${plan}`);
            }
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
            const email = this.querySelector('input[type="email"]:not([style*="display: none"])').value;
            
            if (email) {
                const lang = htmlTag.getAttribute('lang') || 'ru';
                if (lang === 'en') {
                    alert(`Thank you for subscribing! A confirmation email has been sent to ${email}.`);
                } else {
                    alert(`Спасибо за подписку! На адрес ${email} отправлено письмо с подтверждением.`);
                }
                this.reset();
            }
        });
    }

    // Обработчик для кнопок с эффектом подсветки мыши
    document.querySelectorAll('.glow-button').forEach(button => {
        button.addEventListener('mousemove', e => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            button.style.setProperty('--x', `${x}px`);
            button.style.setProperty('--y', `${y}px`);
        });
    });
}); 