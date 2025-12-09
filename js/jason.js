// Função para alternar o menu hambúrguer
function toggleMenu() {
    const navlinks = document.querySelector('.navlinks');
    navlinks.classList.toggle('active');
}

// Funções para alternar entre Login e Cadastro
document.addEventListener('DOMContentLoaded', function() {
    // Configurar navegação ativa
    setActiveNavLink();

    const loginBtn = document.getElementById('login-btn');
    const cadastroBtn = document.getElementById('cadastro-btn');
    const loginForm = document.getElementById('login-form');
    const cadastroForm = document.getElementById('cadastro-form');

    if (loginBtn && cadastroBtn) {
        loginBtn.addEventListener('click', function() {
            loginBtn.classList.add('active');
            cadastroBtn.classList.remove('active');
            loginForm.classList.remove('hidden');
            cadastroForm.classList.add('hidden');
        });

        cadastroBtn.addEventListener('click', function() {
            cadastroBtn.classList.add('active');
            loginBtn.classList.remove('active');
            cadastroForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
        });
    }

    // Carrossel de imagens (apenas se existir na página)
    const slidesContainer = document.querySelector('.slides');
    const slides = document.querySelectorAll('.slides img');
    const botaoEsquerda = document.querySelector('.botao-esquerda');
    const botaoDireita = document.querySelector('.botao-direita');

    if (slidesContainer && slides.length > 0 && botaoEsquerda && botaoDireita) {
        let currentIndex = 0;
        const totalSlides = slides.length;

        // Clona os primeiros e últimos slides para criar loop infinito
        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[totalSlides - 1].cloneNode(true);
        slidesContainer.appendChild(firstClone);
        slidesContainer.insertBefore(lastClone, slides[0]);

        // Atualiza a lista de slides incluindo clones
        const allSlides = document.querySelectorAll('.slides img');
        currentIndex = 1; // Começa no primeiro slide real

        function updateSlides(transition = true) {
            const slideWidth = allSlides[0].clientWidth + 
                parseFloat(getComputedStyle(allSlides[0]).marginLeft) + 
                parseFloat(getComputedStyle(allSlides[0]).marginRight);
            slidesContainer.style.transition = transition ? 'transform 0.5s' : 'none';
            slidesContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        }

        function nextSlide() {
            currentIndex++;
            updateSlides();
            if (currentIndex === totalSlides + 1) {
                setTimeout(() => {
                    currentIndex = 1;
                    updateSlides(false);
                }, 500);
            }
        }

        function prevSlide() {
            currentIndex--;
            updateSlides();
            if (currentIndex === 0) {
                setTimeout(() => {
                    currentIndex = totalSlides;
                    updateSlides(false);
                }, 500);
            }
        }

        botaoDireita.addEventListener('click', nextSlide);
        botaoEsquerda.addEventListener('click', prevSlide);

        // Inicia o carrossel
        updateSlides(false);
        window.addEventListener('resize', () => updateSlides(false));

        // Passar carrossel automaticamente a cada 2 segundos
        setInterval(nextSlide, 2000);
    }
});

// Função para definir navegação ativa (você precisa implementar conforme sua lógica)
function setActiveNavLink() {
    // Implementar lógica para destacar link ativo na navegação
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navlinks a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}
