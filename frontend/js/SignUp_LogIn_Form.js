document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('.container');
    const registerBtn = document.querySelector('.register-btn');
    const loginBtn = document.querySelector('.login-btn');
    const formCadastro = document.getElementById('formCadastro');
  
    // Alternar entre tela de login e cadastro
    registerBtn.addEventListener('click', () => {
      container.classList.add('active');
      console.log("Entrei");
    });
  
    loginBtn.addEventListener('click', () => {
      container.classList.remove('active');
      console.log("Voltei");
    });
  
    formCadastro.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const dados = {
        usuario: document.getElementById('usuarioInput').value,
        cpf: document.getElementById('cpfInput').value,
        email: document.getElementById('emailInput').value,
        senha: document.getElementById('senhaInput').value
      };
  
      cadastrarUsuario(dados);
    });
  
    function cadastrarUsuario(dados) {
      fetch("http://localhost:8080/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Erro no cadastro: " + response.status);
        }
      })
      .then(data => {
        console.log("Cadastro realizado com sucesso:", data);
        alert("Usuário cadastrado!");
      })
      .catch(erro => {
        console.error("Erro ao cadastrar:", erro);
        alert("Erro ao cadastrar. Verifique os dados.");
      });
    }
  });
  