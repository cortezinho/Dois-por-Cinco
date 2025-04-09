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
      window.location.reload();
    })
    .catch(erro => {
      console.error("Erro ao cadastrar:", erro);
      alert("Erro ao cadastrar. Verifique os dados.");
    });
  }


  document.getElementById('btnLogin').addEventListener('click', () =>{
      const dados = {
        nome : document.getElementById('inputNomeLogin').value,
        senha: document.getElementById('inputSenhaLogin').value
      };

      loginUsuario(dados);
  })

  function loginUsuario(dados) {
    fetch("http://localhost:8080/usuario/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome: dados.nome,
          senha: dados.senha
      })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Credenciais inválidas");
        }
    })
    .then(data => {
        console.log("Login bem-sucedido:", data);
        alert("Login realizado com sucesso!");
        
        localStorage.setItem('usuarioLogado', JSON.stringify(data));
        
        window.location.href = "/frontend/torneios.HTML"
    })
    .catch(erro => {
        console.error("Erro no login:", erro);
        alert("Nome de usuário ou senha incorretos");
    });
}
});