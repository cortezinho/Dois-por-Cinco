package backendProjeto.backendProjeto.controller;

import backendProjeto.backendProjeto.dto.RegistroDTO;
import backendProjeto.backendProjeto.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/registrar")
    public ResponseEntity<RegistroDTO> registrar(@RequestBody RegistroDTO registroDTO) {
        RegistroDTO usuarioRegistrado = authService.registrar(registroDTO);
        return ResponseEntity.ok(usuarioRegistrado);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        String token = authService.autenticar(request.email(), request.senha());
        return ResponseEntity.ok(token);
    }

    public record LoginRequest(String email, String senha) {}
}