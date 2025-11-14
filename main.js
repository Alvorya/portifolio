// Importar CSS com Tailwind
import './assets/css/style.css';

// Importar jQuery e tornar global
import $ from 'jquery';
window.$ = window.jQuery = $;

// Importar o código da aplicação após jQuery estar disponível
import './assets/js/app.js';
