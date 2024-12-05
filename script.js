// Simula o banco de dados em JSON
let users = JSON.parse(localStorage.getItem('users')) || [];
const adminUser = { username: "admin", password: "admin123", isAdmin: true };

// Cria o usuário administrador se não existir
if (!users.find(user => user.username === "admin")) {
  users.push(adminUser);
  localStorage.setItem('users', JSON.stringify(users));
}

// Função para mostrar formulário de registro com animação
function showRegister() {
  document.getElementById('login-form').classList.add('animate__fadeOutLeft');
  setTimeout(() => {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
    document.getElementById('register-form').classList.remove('animate__fadeOutRight');
    document.getElementById('register-form').classList.add('animate__fadeInRight');
  }, 500);
}

// Função para mostrar formulário de login com animação
function showLogin() {
  document.getElementById('register-form').classList.add('animate__fadeOutRight');
  setTimeout(() => {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('login-form').classList.remove('animate__fadeOutLeft');
    document.getElementById('login-form').classList.add('animate__fadeInLeft');
  }, 500);
}

// Função de Registro com validações
function register() {
  const username = document.getElementById('register-username').value.trim();
  const password = document.getElementById('register-password').value.trim();

  if (username.length < 3) {
    showError('Nome de usuário deve ter pelo menos 3 caracteres');
    return;
  }
  
  if (password.length < 6) {
    showError('Senha deve ter pelo menos 6 caracteres');
    return;
  }

  if (users.find(user => user.username === username)) {
    showError('Usuário já existe!');
    return;
  }

  const newUser = { username, password, isAdmin: false };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  // Animação de sucesso ao registrar
  Swal.fire({
    icon: 'success',
    title: 'Registro Concluído!',
    text: 'Usuário registrado com sucesso',
    confirmButtonText: 'OK'
  }).then(() => {
    showLogin(); // Redireciona para o formulário de login após registrar
  });
}

// Função de Login melhorada
function login() {
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value.trim();

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));

    // Animação de sucesso ao logar
    Swal.fire({
      icon: 'success',
      title: `Bem-vindo, ${username}!`,
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      showForum();
    });
  } else {
    showError('Nome ou senha incorretos!');
  }
}

// Função para exibir a área do fórum
function showForum() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('register-form').style.display = 'none';
  document.getElementById('forum-section').style.display = 'block';
  loadQuestions();
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

// Função para postar uma pergunta
function postQuestion() {
  const questionTextarea = document.querySelector('.card textarea');
  const questionText = questionTextarea.value.trim();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (!currentUser) {
    showError('Você precisa estar logado para fazer uma pergunta.');
    return;
  }

  if (questionText) {
    const questions = JSON.parse(localStorage.getItem('forumQuestions') || '[]');
    questions.unshift({ user: currentUser.username, text: questionText, timestamp: new Date().toISOString() });
    localStorage.setItem('forumQuestions', JSON.stringify(questions));
    questionTextarea.value = '';
    loadQuestions();
  } else {
    showError('Por favor, digite uma pergunta antes de postar.');
  }
}

// Carrega as perguntas no fórum
function loadQuestions() {
  const questionsList = document.getElementById('questions-list');
  questionsList.innerHTML = '';
  const questions = JSON.parse(localStorage.getItem('forumQuestions') || '[]');

  questions.forEach(q => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.innerHTML = `<strong>${q.user}</strong><p>${q.text}</p><small>${new Date(q.timestamp).toLocaleString()}</small>`;
    questionsList.appendChild(li);
  });
}

// Eventos de clique (Inicialização)
document.addEventListener('DOMContentLoaded', () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser) showForum();
});
