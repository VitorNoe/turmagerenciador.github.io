// Simula o banco de dados em JSON (localStorage para persistência)
let questions = JSON.parse(localStorage.getItem('questions')) || [];

// Exibe as perguntas e respostas
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

    const responsesList = document.createElement('ul');
    responsesList.classList.add('list-group', 'list-group-flush');

    question.responses.forEach(response => {
      const responseItem = document.createElement('li');
      responseItem.classList.add('list-group-item');
      responseItem.textContent = response;
      responsesList.appendChild(responseItem);
    });

    const responseForm = document.createElement('div');
    responseForm.classList.add('form-group');
    responseForm.innerHTML = `
      <textarea class="form-control" id="response-${index}" rows="2" placeholder="Escreva sua resposta..."></textarea>
      <button class="btn btn-secondary mt-2" onclick="postResponse(${index})">Responder</button>
    `;

    questionCardBody.appendChild(questionText);
    questionCardBody.appendChild(responsesList);
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

// Exibe as perguntas quando a página carrega
window.onload = displayQuestions;
