// Simula o banco de dados em JSON
let users = JSON.parse(localStorage.getItem('users')) || [];
const adminUser = { username: "admin", password: "admin123", isAdmin: true };

// Cria o usuário administrador se não existir
if (!users.find(user => user.username === "admin")) {
  users.push(adminUser);
  localStorage.setItem('users', JSON.stringify(users));
}

// Função de Registro
function register() {
  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;

  // Verifica se o nome de usuário já existe
  if (users.find(user => user.username === username)) {
    alert('Usuário já existe!');
  } else {
    // Adiciona o novo usuário
    users.push({ username, password, isAdmin: false });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Usuário registrado com sucesso!');
    
    // Redireciona para a página de fórum ou admin após o registro
    const user = users.find(user => user.username === username && user.password === password);
    if (user.isAdmin) {
      window.location.href = "admin.html"; // Página do admin
    } else {
      window.location.href = "forum.html"; // Página do fórum
    }
  }
}

// Função de Login
function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Procura o usuário no banco de dados
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    alert(`Bem-vindo, ${username}!`);
    // Verifica se o usuário é admin
    if (user.isAdmin) {
      window.location.href = "admin.html"; // Página do admin
    } else {
      window.location.href = "forum.html"; // Página principal do fórum
    }
  } else {
    alert('Nome ou senha incorretos!');
  }
}

// Alternar entre formulários de login e registro
function showRegister() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('register-form').style.display = 'block';
}

function showLogin() {
  document.getElementById('register-form').style.display = 'none';
  document.getElementById('login-form').style.display = 'block';
}

// Evento de clique para login
document.getElementById('login-btn').addEventListener('click', login);

// Evento de clique para registro
document.getElementById('register-btn').addEventListener('click', register);

// Permite login com Enter (ao pressionar Enter no campo de senha)
document.getElementById('password').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    login();
  }
});

// Permite registro com Enter (ao pressionar Enter no campo de senha)
document.getElementById('register-password').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    register();
  }
});
