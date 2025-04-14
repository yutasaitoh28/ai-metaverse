// ハンバーガーメニューの機能
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    const nav = document.querySelector('nav');
    nav.appendChild(menuToggle);
    
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
});

// スムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ヘッダーのスクロール効果
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // 下にスクロール
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // 上にスクロール
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// パーティクルエフェクト
const createParticle = () => {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animationDuration = Math.random() * 3 + 2 + 's';
    particle.style.opacity = Math.random() * 0.5 + 0.5;
    document.body.appendChild(particle);
    
    particle.addEventListener('animationend', () => {
        particle.remove();
    });
};

// パーティクルを定期的に生成
setInterval(createParticle, 300);

// フォーム送信処理
const contactForm = document.querySelector('.contact form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // フォームデータの取得
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // ここでフォームデータの処理を行う
        console.log('フォームデータ:', data);
        
        // 送信完了メッセージ
        alert('お問い合わせありがとうございます。内容を確認次第、ご連絡させていただきます。');
        this.reset();
    });
}

// アニメーション効果
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (entry.target.classList.contains('card')) {
                entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
            }
        }
    });
}, observerOptions);

// アニメーション対象の要素を監視
document.querySelectorAll('section, .card').forEach(element => {
    observer.observe(element);
});

// マウスストーカーエフェクト
const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

const cursor2 = document.createElement('div');
cursor2.className = 'cursor2';
document.body.appendChild(cursor2);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursor2.style.left = e.clientX + 'px';
        cursor2.style.top = e.clientY + 'px';
    }, 100);
});

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.salary-cases-track');
    const prevButton = document.querySelector('.slider-button.prev');
    const nextButton = document.querySelector('.slider-button.next');
    const dotsContainer = document.querySelector('.slider-dots');
    const cards = document.querySelectorAll('.salary-case-card');
    
    let currentIndex = 0;
    let cardsPerView = window.innerWidth <= 768 ? 1 : 3;
    let isAnimating = false;
    
    // Update cards per view on window resize
    window.addEventListener('resize', () => {
        cardsPerView = window.innerWidth <= 768 ? 1 : 3;
        updateSlider();
    });
    
    // Create dots
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.slider-dot');
    
    function updateSlider() {
        if (isAnimating) return;
        isAnimating = true;
        
        const cardWidth = cards[0].offsetWidth;
        const gap = 32; // 2rem in pixels
        const offset = -(currentIndex * (cardWidth + gap));
        
        slider.style.transition = 'transform 0.5s ease';
        slider.style.transform = `translateX(${offset}px)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Update button states
        prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextButton.style.opacity = currentIndex >= cards.length - cardsPerView ? '0.5' : '1';
        
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }
    
    function goToSlide(index) {
        if (isAnimating) return;
        if (index < 0) index = cards.length - cardsPerView;
        if (index > cards.length - cardsPerView) index = 0;
        currentIndex = index;
        updateSlider();
    }
    
    function nextSlide() {
        if (currentIndex < cards.length - cardsPerView) {
            currentIndex++;
            updateSlider();
        }
    }
    
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    }
    
    // Event listeners
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);
    
    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        if (Math.abs(swipeDistance) > 50) { // Minimum swipe distance
            if (swipeDistance > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
    }
    
    // Initial setup
    updateSlider();

    // FAQアコーディオン
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = answer.classList.contains('active');
            
            // 他の回答を非表示にする
            document.querySelectorAll('.faq-answer').forEach(a => {
                a.classList.remove('active');
            });
            
            // クリックされた質問の回答を表示/非表示
            if (!isActive) {
                answer.classList.add('active');
            }
        });
    });

    // 初期状態で最初の回答を表示
    const firstAnswer = document.querySelector('.faq-answer');
    if (firstAnswer) {
        firstAnswer.classList.add('active');
    }
}); 