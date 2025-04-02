package backendProjeto.backendProjeto.repository;

import backendProjeto.backendProjeto.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository  extends JpaRepository<Usuario, Long> {
}
