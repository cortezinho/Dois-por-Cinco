// script.js

document.getElementById('usuarioForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário tradicional

    // Coleta os dados do formulário
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const usuarioData = {
        nome: nome,
        cpf: cpf,
        email: email,
        senha: senha
    };

    // Envia os dados usando fetch
    fetch('http://localhost:8080/usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuarioData)  // Converte os dados para JSON
    })
    .then(response => {
        if (!response.ok) {
            // Se a resposta não for OK (exemplo: código 400, 500), lança um erro
            throw new Error('Erro na requisição: ' + response.status);
        }
        // Tenta ler a resposta como JSON
        return response.json();
    })
    .then(data => {
        // Exibe mensagem de sucesso
        document.getElementById('responseMessage').innerHTML = "Usuário cadastrado com sucesso!";
        document.getElementById('responseMessage').style.color = 'green';
        // Limpa o formulário
        document.getElementById('usuarioForm').reset();
    })
    .catch(error => {
        // Exibe mensagem de erro
        document.getElementById('responseMessage').innerHTML = "Erro ao cadastrar usuário. Tente novamente!";
        document.getElementById('responseMessage').style.color = 'red';
        console.error('Erro:', error);
    });
});
