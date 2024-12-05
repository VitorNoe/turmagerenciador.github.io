// Simula o banco de dados em JSON
let users = JSON.parse(localStorage.getItem('users')) || [];
const adminUser = { username: "admin", password: "admin123", isAdmin: true };

// Cria o usuário administrador se não existir
if (!users.find(user => user.username === "admin")) {
  users.push(adminUser);
  localStorage.setItem('users', JSON.stringify(users));
}

// Função de Registro com validações
function register() {
  const username = document.getElementById('register-username').value.trim();
  const password = document.getElementById('register-password').value.trim();
  
  // Validações de entrada
  if (username.length < 3) {
    showError('Nome de usuário deve ter pelo menos 3 caracteres');
    return;
  }
  
  if (password.length < 6) {
    showError('Senha deve ter pelo menos 6 caracteres');
    return;
  }
  
  // Verifica se o nome de usuário já existe
  if (users.find(user => user.username === username)) {
    showError('Usuário já existe!');
    return;
  }

  // Adiciona o novo usuário
  const newUser = { 
    username, 
    password, 
    isAdmin: false,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  
  // Feedback de sucesso
  Swal.fire({
    icon: 'success',
    title: 'Registro Concluído!',
    text: 'Usuário registrado com sucesso',
    confirmButtonText: 'OK'
  }).then(() => {
    redirectUser(newUser);
  });
}

// Função de Login melhorada
function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  
  // Procura o usuário no banco de dados
  const user = users.find(user => user.username === username && user.password === password);
  
  if (user) {
    // Animação de login bem-sucedido
    Swal.fire({
      icon: 'success',
      title: `Bem-vindo, ${username}!`,
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      redirectUser(user);
    });
  } else {
    showError('Nome ou senha incorretos!');
  }
}

// Função para redirecionar usuário
function redirectUser(user) {
  if (user.isAdmin) {
    window.location.href = "admin.html";
  } else {
    window.location.href = "forum.html";
  }
}

// Função para mostrar erros
function showError(message) {
  Swal.fire({
    icon: 'error',
    title: 'Erro',
    text: message,
    confirmButtonText: 'OK'
  });
}

// Alternar entre formulários de login e registro com animações
function showRegister() {
  document.getElementById('login-form').classList.add('animate__animated', 'animate__fadeOutLeft');
  setTimeout(() => {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
    document.getElementById('register-form').classList.add('animate__animated', 'animate__fadeInRight');
  }, 500);
}

function showLogin() {
  document.getElementById('register-form').classList.add('animate__animated', 'animate__fadeOutRight');
  setTimeout(() => {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('login-form').classList.add('animate__animated', 'animate__fadeInLeft');
  }, 500);
}

// Eventos de clique
document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('login-btn');
  const registerBtn = document.getElementById('register-btn');
  const passwordInput = document.getElementById('password');
  const registerPasswordInput = document.getElementById('register-password');

  if (loginBtn) loginBtn.addEventListener('click', login);
  if (registerBtn) registerBtn.addEventListener('click', register);

  // Adiciona suporte para Enter em campos de senha
  if (passwordInput) {
    passwordInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        login();
      }
    });
  }

  if (registerPasswordInput) {
    registerPasswordInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        register();
      }
    });
  }
});

// Função para gerenciar postagens no fórum
function postQuestion() {
  const questionTextarea = document.querySelector('.card textarea');
  const questionText = questionTextarea.value.trim();
  
  if (questionText) {
    const questionsList = document.querySelector('.list-group');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    const newQuestionElement = document.createElement('li');
    newQuestionElement.classList.add('list-group-item', 'animate__animated', 'animate__fadeIn');
    newQuestionElement.innerHTML = `
      <strong>${currentUser ? currentUser.username : 'Usuário Anônimo'}</strong>
      <p>${questionText}</p>
      <button class="btn btn-info btn-sm">Responder</button>
    `;
    
    questionsList.insertBefore(newQuestionElement, questionsList.firstChild);
    questionTextarea.value = '';
    
    // Salvar questão no localStorage (implementação básica)
    const questions = JSON.parse(localStorage.getItem('forumQuestions') || '[]');
    questions.unshift({
      user: currentUser ? currentUser.username : 'Usuário Anônimo',
      text: questionText,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('forumQuestions', JSON.stringify(questions));
  }
}
