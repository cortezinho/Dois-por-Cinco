package backendProjeto.backendProjeto.service;

import backendProjeto.backendProjeto.model.Usuario;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;


import java.util.Date;

@Service
public class JwtService {
    private final SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    @Value("${jwt.expiration}")
    private Long expiration;

    public String gerarToken(Usuario usuario) {
        Date agora = new Date();
        Date expiracao = new Date(agora.getTime() + expiration);

        return Jwts.builder()
                .setSubject(usuario.getEmail())
                .setIssuedAt(agora)
                .setExpiration(expiracao)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public String getEmailFromToken(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody();

            return claims.getSubject();
        } catch (SignatureException e) {
            // Token inválido ou expirado
            throw new RuntimeException("Token JWT inválido ou expirado");
        }
    }
}