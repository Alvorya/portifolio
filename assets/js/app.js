import $ from 'jquery';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx7lFbygYfe37ZdtiP7-US1evDria7s1Hp8iHmrQqvZps9Bo3xGq5QmYnYjbXd7mEMg/exec';

// Page loader - aguarda todos os recursos carregarem
$(window).on('load', function() {
    // Pequeno delay para garantir que tudo está renderizado
    setTimeout(function() {
        $('#page-loader').addClass('hidden');
        $('body').addClass('loaded');
    }, 300);
});

// Fallback: se demorar mais de 3 segundos, remove o loader
setTimeout(function() {
    if (!$('body').hasClass('loaded')) {
        $('#page-loader').addClass('hidden');
        $('body').addClass('loaded');
    }
}, 3000);

$(document).ready(function() {
    // Toggle do menu mobile
    $('#mobile-menu-btn').click(function() {
        $('#mobile-menu').slideToggle(300);
    });
    
    // Scroll suave para links de navegação
    $('.nav-link').click(function(e) {
        e.preventDefault();
        const target = $(this).attr('href');
        if (/^#/.test(target)) {
            $('html, body').animate({
                scrollTop: $(target).offset().top - 80
            }, 800);
            
            // Fechar menu mobile após clicar
            if ($(window).width() < 768) {
                $('#mobile-menu').slideUp(300);
            }
        }
        else {
            window.location = window.location.origin + $(e.target).attr('href');
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

      // Newsletter form
        $('button:contains("Inscrever-se")').click(function(e) {
            e.preventDefault();
            var email = $('input[type="email"]').val();
            
            if (!email || !email.includes('@')) {
                alert('Por favor, insira um email válido.');
                return;
            }

            const btn = $(this);
            const originalText = btn.html();
            btn.prop('disabled', true).html('<svg class="animate-spin h-5 w-5 inline-block mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Enviando...');

            fetch('https://script.google.com/macros/s/AKfycbxywtfaALh_hIU1aN4SuuLrg79OYZ77Rnj3oPTfjHu5SDdSGrfx04vWa1YguK7kPSUvwQ/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email
                })
            })
            .then(() => {
                $('input[type="email"]').val('');
                    // Mostrar notificação de sucesso
                showNotification('Obrigado por se inscrever! Você receberá nossos melhores conteúdos.', 'success');
                
            })
            .catch((error) => {
                console.error('Erro:', error);
                showNotification('Erro ao enviar mensagem. Por favor, tente novamente.', 'error');
                $('input[type="email"]').val('');
            })
            .finally(() => {
                btn.prop('disabled', false).html(originalText);
            });
        });

});
