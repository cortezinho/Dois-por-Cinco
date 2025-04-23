package backendProjeto.backendProjeto.service;

import backendProjeto.backendProjeto.dto.RegistroDTO;
import backendProjeto.backendProjeto.model.Usuario;
import backendProjeto.backendProjeto.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.net.PasswordAuthentication;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

   @Autowired
    private UsuarioRepository usuarioRepository;

   @Autowired
   private PasswordEncoder passwordEncoder;

   public  Usuario fromDTO(RegistroDTO registroDTO){
        Usuario usuario = new Usuario();
        usuario.setNome(registroDTO.getNome());
        usuario.setCpf(registroDTO.getCpf());
        usuario.setEmail(registroDTO.getEmail());
        usuario.setSenha(passwordEncoder.encode(registroDTO.getSenha()));

        return usuario;
   }

    public List<Usuario> getAll(){
        return usuarioRepository.findAll();
    }

   public RegistroDTO toDTO(Usuario usuario){
       RegistroDTO registroDTO = new RegistroDTO();
       registroDTO.setCpf(usuario.getCpf());
       registroDTO.setEmail(usuario.getEmail());
       registroDTO.setNome(usuario.getNome());

       return registroDTO;
   }
   public RegistroDTO saveDTO(RegistroDTO registroDTO){
        Usuario usuario = this.fromDTO(registroDTO);
        Usuario usuarioBd = usuarioRepository.save(usuario);
        return this.toDTO(usuarioBd);
    }

    public Usuario login(String email, String senha) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (!passwordEncoder.matches(senha, usuario.getSenha())) {
            throw new RuntimeException("Senha incorreta");
        }

        return usuario;
    }

   public Optional<RegistroDTO> updateUsuario(Long id, RegistroDTO registroDTO) {
       Optional<Usuario> optionalUsuario = usuarioRepository.findById(id);
       if (optionalUsuario.isPresent()){
           Usuario usuario = optionalUsuario.get();
           usuario.setNome(usuario.getNome());
           usuario.setCpf(usuario.getCpf());
           usuario.setEmail(usuario.getEmail());
           usuario.setSenha(passwordEncoder.encode(registroDTO.getSenha()));
           Usuario usuarioUpdate = usuarioRepository.save(usuario);

           return Optional.of(this.toDTO(usuarioUpdate));
       }else {
           return Optional.empty();
       }

   }
}
