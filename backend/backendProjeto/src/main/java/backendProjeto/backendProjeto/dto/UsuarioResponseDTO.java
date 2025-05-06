package backendProjeto.backendProjeto.dto;

import backendProjeto.backendProjeto.model.Usuario;

public class UsuarioResponseDTO {
    private Long id;
    private String nome;
    private String email;

    // Construtor
    public UsuarioResponseDTO(Usuario usuario) {
        this.id = usuario.getId();
        this.nome = usuario.getNome();
        this.email = usuario.getEmail();
    }

    // Getters
    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getEmail() { return email; }
}
