// Farmácia Albuquerque - Script Principal
document.addEventListener('DOMContentLoaded', function() {

  // Header: alterna para vermelho quando a página é rolada
  const header = document.querySelector('.header');
  if (header) {
    const updateHeader = () => {
      const scrolled = window.scrollY > 50;
      header.classList.toggle('is-scrolled', scrolled);
    };
    
    window.addEventListener('scroll', updateHeader, { passive: true });
    window.addEventListener('load', updateHeader);
    updateHeader();
  }

  // Menu mobile toggle
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('#menu');
  
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Fechar menu ao clicar em um link
    menu.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Smooth scroll para links âncora
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Animações on scroll melhoradas
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observar elementos com a classe reveal
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => {
    observer.observe(el);
  });

  // Animação dos cards de serviços
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });

  // Efeito parallax suave no hero
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero__content');
  
  if (hero && heroContent) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.3;
      
      if (scrolled < hero.offsetHeight) {
        heroContent.style.transform = `translateY(${rate}px)`;
      }
    }, { passive: true });
  }

  // Adicionar classe para animação inicial dos cards
  setTimeout(() => {
    cards.forEach(card => {
      card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  }, 1000);

});

// Função para detectar se é dispositivo móvel
function isMobile() {
  return window.innerWidth <= 768;
}

// Otimizações para performance
if ('serviceWorker' in navigator && 'caches' in window) {
  // Apenas registrar service worker em produção
  if (location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Silently fail se não houver service worker
    });
  }
}