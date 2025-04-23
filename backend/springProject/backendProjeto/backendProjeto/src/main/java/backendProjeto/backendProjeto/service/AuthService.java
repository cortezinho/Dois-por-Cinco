package backendProjeto.backendProjeto.service;

import backendProjeto.backendProjeto.dto.RegistroDTO;
import backendProjeto.backendProjeto.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private JwtService jwtService;

    public String autenticar(String email, String senha) {
        Usuario usuario = usuarioService.login(email, senha);
        return jwtService.gerarToken(usuario);
    }

    public RegistroDTO registrar(RegistroDTO registroDTO) {
        return usuarioService.saveDTO(registroDTO);
    }
}
