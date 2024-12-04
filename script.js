document.getElementById('question-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita recarregar a página

  // Obtém a dúvida digitada
  const questionText = document.getElementById('question').value;

  // Cria um elemento para a nova dúvida
  const questionElement = document.createElement('div');
  questionElement.className = 'card mb-3';
  questionElement.innerHTML = `
    <div class="card-body">
      <p class="card-text">${questionText}</p>
      <input type="text" class="form-control mb-2" placeholder="Responder..." required>
      <button class="btn btn-secondary btn-sm">Enviar Resposta</button>
      <div class="mt-2 responses"></div> <!-- Área para respostas -->
    </div>
  `;

  // Adiciona a dúvida à lista
  document.getElementById('questions-list').appendChild(questionElement);
  document.getElementById('question').value = ''; // Limpa o formulário

  // Evento para adicionar respostas
  questionElement.querySelector('button').addEventListener('click', function() {
    const responseInput = questionElement.querySelector('input');
    const responseText = responseInput.value;
    if (responseText.trim() !== '') {
      const responseElement = document.createElement('p');
      responseElement.className = 'border-top pt-2';
      responseElement.textContent = responseText;
      questionElement.querySelector('.responses').appendChild(responseElement);
      responseInput.value = ''; // Limpa o campo de resposta
    }
  });
});
