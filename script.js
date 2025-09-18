// Cursor customizado removido

// Header: alterna para vermelho quando a página é rolada
(function(){
  const header = document.querySelector('.header');
  if(!header) return;
  const update = () => {
    const scrolled = window.scrollY > 0;
    header.classList.toggle('is-scrolled', scrolled);
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('load', update);
  update();
})();

// (bloco anterior foi excluído para desativar totalmente)

// Menu mobile toggle
(function(){
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.querySelector('#menu');
  if(!toggle || !menu) return;

  toggle.addEventListener('click', ()=>{
    const open = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  // fechar ao clicar em um link
  menu.addEventListener('click', (e)=>{
    if(e.target.closest('a')){
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  })
})();

// WhatsApp button - usa número definido no href do HTML
(function(){
  const btn = document.querySelector('[data-whatsapp]');
  if(!btn) return;
})();

// Reveal on scroll
(function(){
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    })
  }, {threshold: .2});

  els.forEach(el => io.observe(el));
})();