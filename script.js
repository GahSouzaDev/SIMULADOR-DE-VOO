function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('expanded');
  }
  
  document.getElementById('menu').addEventListener('click', function(event) {
    if (event.target.tagName === 'A') {
      toggleMenu();
    }
  });

document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os links de navegação
    const navLinks = document.querySelectorAll('nav a');

    // Adiciona um ouvinte de eventos para cada link
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Previne o comportamento padrão do link

            // Obtém o id do alvo a partir do href do link
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Usa o scrollIntoView para centralizar a seção na tela
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center' // Centraliza verticalmente
                });
            }
        });
    });
});

const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_0518glm';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      alert('Mensagem enviada com sucesso!');
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});

const parallax = document.querySelector('body');
let prevScrollpos = window.pageYOffset;

window.onscroll = function() {
  let currentScrollPos = window.pageYOffset;   

  let scrollDifference = currentScrollPos - prevScrollpos;
  parallax.style.backgroundPositionY = prevScrollpos / 2 + 'px';
  prevScrollpos = currentScrollPos;
}