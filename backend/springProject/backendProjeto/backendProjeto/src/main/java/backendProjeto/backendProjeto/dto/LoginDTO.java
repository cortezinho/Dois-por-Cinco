package backendProjeto.backendProjeto.dto;

import jakarta.validation.constraints.NotBlank;

public class LoginDTO {
    @NotBlank(message = "Nome de usuario obrigatório!")
    private String nome;

    @NotBlank(message = "Senha obrigatória")
    private String senha;

    public LoginDTO () {
    }
    public LoginDTO(String nome, String senha) {
        this.nome = nome;
        this.senha = senha;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome){
        this.nome = nome;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }


}
