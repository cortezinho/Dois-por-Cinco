document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector('.container');
  const registerBtn = document.querySelector('.register-btn');
  const loginBtn = document.querySelector('.login-btn');
  const formCadastro = document.getElementById('formCadastro');

  registerBtn.addEventListener('click', () => {
    container.classList.add('active');
    console.log("Entrei");
  });

  loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
    console.log("Voltei");
  });

  document.getElementById('btnCadastro').addEventListener('click', () => {  
    const dados = {
      nome: document.getElementById('usuarioInput').value,
      cpf: document.getElementById('cpfInput').value,
      senha: document.getElementById('senhaInput').value,
      email: document.getElementById('emailInput').value
    };
    console.log(dados);
    
    cadastrarUsuario(dados);
  });

  async function cadastrarUsuario(dados) {
    try {
      const response = await fetch('http://localhost:8080/usuario', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
      });

      const data = await response.json();
      console.log("Cadastro realizado com sucesso:", data);
      alert("Usuário cadastrado!");
      window.location.reload();
    } catch (erro) {
      console.error("Erro ao cadastrar:", erro);
      alert("Erro ao cadastrar. Verifique os dados.");
    }
  }
  
  document.getElementById('btnLogin').addEventListener('click', () =>{
      const dados = {
        nome : document.getElementById('inputNomeLogin').value,
        senha: document.getElementById('inputSenhaLogin').value
      };

      loginUsuario(dados);
  })

  async function loginUsuario(dados) {
    try {
      const response = await fetch ('http://localhost:8080/usuario/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
      });

      const data = await response.json();
      console.log("login realizado com sucesso:", data);
      alert("Login efetuado com sucesso!");
      window.location.reload();

    }catch (erro) {
      console.error("Erro ao logar:", erro);
      alert("Erro ao fazer login. Verifique os dados.");
    }

  }

});
