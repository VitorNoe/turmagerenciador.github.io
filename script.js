let questions = JSON.parse(localStorage.getItem('questions')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Função para exibir perguntas
function displayQuestions() {
  const questionsList = document.getElementById('questions-list');
  questionsList.innerHTML = ''; // Limpa a lista de perguntas antes de recarregar

  questions.forEach((question, index) => {
    const questionCard = document.createElement('div');
    questionCard.classList.add('card', 'my-3');

    const questionCardBody = document.createElement('div');
    questionCardBody.classList.add('card-body');

    const questionText = document.createElement('p');
    questionText.classList.add('card-text');
    questionText.textContent = question.question;

    // Exibe as respostas se houver
    const responseList = document.createElement('ul');
    question.responses.forEach(response => {
      const responseItem = document.createElement('li');
      responseItem.textContent = response;
      responseList.appendChild(responseItem);
    });

    const responseForm = document.createElement('div');
    responseForm.classList.add('form-group');
    responseForm.innerHTML = `
      <textarea class="form-control" id="response-${index}" rows="2" placeholder="Escreva sua resposta..."></textarea>
      <button class="btn btn-secondary mt-2" onclick="postResponse(${index})">Responder</button>
    `;

    questionCardBody.appendChild(questionText);
    questionCardBody.appendChild(responseList);
    questionCardBody.appendChild(responseForm);
    questionCard.appendChild(questionCardBody);
    questionsList.appendChild(questionCard);
  });
}

// Função para postar uma pergunta
document.getElementById('question-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const questionText = document.getElementById('question').value;
  if (questionText) {
    const newQuestion = {
      question: questionText,
      responses: []
    };
    questions.push(newQuestion);
    localStorage.setItem('questions', JSON.stringify(questions));

    // Limpa o campo e exibe a nova pergunta
    document.getElementById('question').value = '';
    displayQuestions();
  }
});

// Função para postar uma resposta
function postResponse(index) {
  const responseText = document.getElementById(`response-${index}`).value;
  if (responseText) {
    questions[index].responses.push(responseText);
    localStorage.setItem('questions', JSON.stringify(questions));

    // Limpa o campo de resposta e recarrega as perguntas
    document.getElementById(`response-${index}`).value = '';
    displayQuestions();
  }
}

// Função para mostrar ou ocultar a senha
function togglePassword(id) {
  const passwordField = document.getElementById(id);
  const type = passwordField.type === 'password' ? 'text' : 'password';
  passwordField.type = type;
}

// Função de login
document.getElementById('login').addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Verificação de usuário (simulação)
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.username === name && u.password === password);

  if (user) {
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    alert('Login bem-sucedido!');
    window.location.href = 'forum.html'; // Redireciona para o fórum após o login
  } else {
    alert('Nome ou senha incorretos!');
  }
});

// Função de registro
document.getElementById('register').addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;

  // Armazenando usuário no localStorage
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const newUser = { username: name, password: password };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  alert('Registro bem-sucedido!');
  window.location.href = 'forum.html'; // Redireciona para o fórum após o registro
});

// Funções de exibição de modais de login e registro
function showRegister() {
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('register-form').style.display = 'block';
}

function showLogin() {
  document.getElementById('register-form').style.display = 'none';
  document.getElementById('login-form').style.display = 'block';
}

// Verifica se o usuário está logado ao carregar a página
window.onload = function() {
  if (currentUser) {
    window.location.href = 'forum.html'; // Redireciona para o fórum se o usuário estiver logado
  } else {
    document.getElementById('login-form').style.display = 'block';
  }
};
