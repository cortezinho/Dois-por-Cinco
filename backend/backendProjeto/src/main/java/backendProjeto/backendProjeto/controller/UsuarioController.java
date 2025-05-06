package backendProjeto.backendProjeto.controller;

import backendProjeto.backendProjeto.dto.LoginDTO;
import backendProjeto.backendProjeto.dto.RegistroDTO;
import backendProjeto.backendProjeto.dto.UsuarioResponseDTO;
import backendProjeto.backendProjeto.model.Usuario;
import backendProjeto.backendProjeto.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuario")
public class  UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<Usuario>> getAll() {
        return ResponseEntity.status(HttpStatus.OK).body(usuarioService.getAll());
    }

    @PostMapping
    public ResponseEntity<RegistroDTO> created( @RequestBody RegistroDTO registroDTO){
        RegistroDTO usuarioBd = usuarioService.saveDTO(registroDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioBd);
    }

    @PostMapping("/login")
    public ResponseEntity<UsuarioResponseDTO> login(@RequestBody LoginDTO loginDTO) {
        Usuario usuario = usuarioService.login(loginDTO.getNome(), loginDTO.getSenha());
        if(usuario != null) {
            UsuarioResponseDTO response = new UsuarioResponseDTO(usuario);
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity <RegistroDTO> update(@PathVariable Long id, @Valid @RequestBody RegistroDTO usuarioDTO){
        Optional<RegistroDTO> registroDTOOptional = usuarioService.updateUsuario(id, usuarioDTO);
            if (registroDTOOptional.isPresent()){
                return ResponseEntity.ok(registroDTOOptional.get());
            } else {
                return ResponseEntity.notFound().build();
            }
    }

}
