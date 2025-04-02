package backendProjeto.backendProjeto.service;

import backendProjeto.backendProjeto.dto.RegistroDTO;
import backendProjeto.backendProjeto.model.Usuario;
import backendProjeto.backendProjeto.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class UsuarioService {

   @Autowired
    private UsuarioRepository usuarioRepository;

   public  Usuario fromDTO(RegistroDTO registroDTO){
        Usuario usuario = new Usuario();
        usuario.setNome(registroDTO.getNome());
        usuario.setCpf(registroDTO.getCpf());
        usuario.setEmail(registroDTO.getEmail());
        usuario.setSenha(registroDTO.getSenha());

        return usuario;
   }

   public RegistroDTO toDTO(Usuario usuario){
       RegistroDTO registroDTO = new RegistroDTO();
       registroDTO.setCpf(usuario.getCpf());
       registroDTO.setEmail(usuario.getEmail());
       registroDTO.setNome(usuario.getNome());
       registroDTO.setSenha(usuario.getSenha());

       return registroDTO;
   }
   public RegistroDTO saveDTO(RegistroDTO registroDTO){
        Usuario usuario = this.fromDTO(registroDTO);
        Usuario usuarioBd = usuarioRepository.save(usuario);
        return this.toDTO(usuarioBd);
    }
}
