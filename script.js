// Simula o banco de dados em JSON
let users = JSON.parse(localStorage.getItem('users')) || [];
const adminUser = { username: "admin", password: "admin123", isAdmin: true };
if (!users.find(user => user.username === "admin")) {
  users.push(adminUser);
  localStorage.setItem('users', JSON.stringify(users));
}

// Função de Registro
function register() {
  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;

  if (users.find(user => user.username === username)) {
    alert('Usuário já existe!');
  } else {
    users.push({ username, password, isAdmin: false });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Usuário registrado com sucesso!');
    showLogin();
}

// Função de Login
function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    alert(`Bem-vindo, ${username}!`);
    if (user.isAdmin) {
      window.location.href = "admin.html"; // Página do admin (você pode criar isso depois)
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

// Associar os botões aos eventos de clique
document.getElementById('login-btn').addEventListener('click', login);
document.getElementById('register-btn').addEventListener('click', register);
