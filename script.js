// Simula o banco de dados em JSON
let users = JSON.parse(localStorage.getItem('users')) || [];
const adminUser = { username: "admin", password: "admin123", isAdmin: true };

// Cria o usuário administrador se não existir
if (!users.find(user => user.username === "admin")) {
  users.push(adminUser);
  localStorage.setItem('users', JSON.stringify(users));
}

// Função de Registro com validações aprimoradas
function register() {
  const username = document.getElementById('register-username').value.trim();
  const password = document.getElementById('register-password').value.trim();

  // Validações de entrada
  if (username.length < 3) {
    showAlert('O nome de usuário deve ter no mínimo 3 caracteres.', 'danger');
    return;
  }

  if (password.length < 6) {
    showAlert('A senha deve ter no mínimo 6 caracteres.', 'danger');
    return;
  }

  // Verifica se o nome de usuário já existe
  if (users.find(user => user.username === username)) {
    showAlert('Usuário já existe!', 'warning');
    return;
  }

  // Adiciona o novo usuário com criptografia básica
  const newUser = { 
    username, 
    password: btoa(password), // Codificação base64 simples
    isAdmin: false 
  };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  showAlert('Usuário registrado com sucesso!', 'success');
  
  // Redireciona para a página apropriada
  setTimeout(() => {
    window.location.href = "forum.html";
  }, 1500);
}

// Função de Login com segurança aprimorada
function login() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  // Procura o usuário no banco de dados
  const user = users.find(user => 
    user.username === username && 
    (user.password === password || user.password === btoa(password))
  );

  if (user) {
    showAlert(`Bem-vindo, ${username}!`, 'success');
    
    // Redireciona com timeout para mostrar mensagem
    setTimeout(() => {
      if (user.isAdmin) {
        window.location.href = "admin.html"; // Página do admin
      } else {
        window.location.href = "forum.html"; // Página principal do fórum
      }
    }, 1500);
  } else {
    showAlert('Nome ou senha incorretos!', 'danger');
  }
}

// Função para mostrar alertas com estilo
function showAlert(message, type = 'info') {
  const alertContainer = document.getElementById('alert-container') || createAlertContainer();
  alertContainer.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
}

// Cria um container de alertas se não existir
function createAlertContainer() {
  const container = document.createElement('div');
  container.id = 'alert-container';
  container.classList.add('alert-container');
  document.body.insertBefore(container, document.body.firstChild);
  return container;
}

// Alternar entre formulários de login e registro com animação
function showRegister() {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  
  loginForm.classList.add('slide-out-left');
  setTimeout(() => {
    loginForm.style.display = 'none';
    loginForm.classList.remove('slide-out-left');
    
    registerForm.style.display = 'block';
    registerForm.classList.add('slide-in-right');
  }, 300);
}

function showLogin() {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  
  registerForm.classList.add('slide-out-right');
  setTimeout(() => {
    registerForm.style.display = 'none';
    registerForm.classList.remove('slide-out-right');
    
    loginForm.style.display = 'block';
    loginForm.classList.add('slide-in-left');
  }, 300);
}

// Eventos de clique e tecla Enter
document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('login-btn');
  const registerBtn = document.getElementById('register-btn');
  const passwordLogin = document.getElementById('password');
  const passwordRegister = document.getElementById('register-password');

  if (loginBtn) loginBtn.addEventListener('click', login);
  if (registerBtn) registerBtn.addEventListener('click', register);

  // Adiciona evento de tecla Enter
  if (passwordLogin) {
    passwordLogin.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') login();
    });
  }

  if (passwordRegister) {
    passwordRegister.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') register();
    });
  }
});

// Função para mostrar/esconder senha
function togglePasswordVisibility(inputId) {
  const passwordInput = document.getElementById(inputId);
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
}
