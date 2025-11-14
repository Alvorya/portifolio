const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx7lFbygYfe37ZdtiP7-US1evDria7s1Hp8iHmrQqvZps9Bo3xGq5QmYnYjbXd7mEMg/exec';

$(document).ready(function() {
    // Toggle do menu mobile
    $('#mobile-menu-btn').click(function() {
        $('#mobile-menu').slideToggle(300);
    });
    
    // Scroll suave para links de navegação
    $('.nav-link').click(function(e) {
        e.preventDefault();
        const target = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(target).offset().top - 80
        }, 800);
        
        // Fechar menu mobile após clicar
        if ($(window).width() < 768) {
            $('#mobile-menu').slideUp(300);
        }
    });
    
    // Adicionar classe ativa aos links de navegação no scroll
    $(window).scroll(function() {
        const scrollPos = $(window).scrollTop() + 100;
        
        $('.nav-link').each(function() {
            const target = $(this).attr('href');
            if ($(target).length) {
                const targetTop = $(target).offset().top;
                const targetBottom = targetTop + $(target).outerHeight();
                
                if (scrollPos >= targetTop && scrollPos < targetBottom) {
                    $('.nav-link').removeClass('text-red-500');
                    $(this).addClass('text-red-500');
                }
            }
        });
    });
    
    // Animar elementos no scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }, { threshold: 0.1 });
    
    // Adicionar classes de animação às seções
    $('section').addClass('opacity-0 translate-y-10 transition-all duration-1000');
    
    document.querySelectorAll('section').forEach((section) => {
        observer.observe(section);
    });
    
    // Envio do formulário para Google Sheets
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
        const submitBtn = $('#submitBtn');
        const originalText = submitBtn.text();
        
        // Desabilitar botão e mostrar loading
        submitBtn.prop('disabled', true).text('Enviando...');
        
        // Coletar dados do formulário
        const formData = {
            nome: $('input[name="nome"]').val(),
            email: $('input[name="email"]').val(),
            assunto: $('input[name="assunto"]').val(),
            mensagem: $('textarea[name="mensagem"]').val(),
            data: new Date().toLocaleString('pt-BR')
        };
        
        // Enviar para Google Sheets
        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(() => {
            // Mostrar notificação de sucesso
            showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            
            // Limpar formulário
            document.getElementById('contactForm').reset();
        })
        .catch(error => {
            console.error('Erro:', error);
            showNotification('Erro ao enviar mensagem. Por favor, tente novamente.', 'error');
        })
        .finally(() => {
            // Reabilitar botão
            submitBtn.prop('disabled', false).text(originalText);
        });
    });
    
    // Função para mostrar notificações
    function showNotification(message, type = 'success') {
        const notification = document.querySelector('.notification');
        notification.textContent = message;

        // Define a cor de acordo com o tipo
        notification.style.backgroundColor = type === 'error' ? '#ef4444' : '#22c55e';

        // Mostra a notificação
        notification.classList.remove('hide');
        notification.classList.add('show');

    // Espera 3 segundos, depois começa a esconder
        setTimeout(() => {
            notification.classList.remove('show');
            notification.classList.add('hide');
        }, 3000)
    };
});
