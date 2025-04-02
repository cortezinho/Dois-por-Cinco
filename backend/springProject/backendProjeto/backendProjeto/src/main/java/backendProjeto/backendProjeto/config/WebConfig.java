package backendProjeto.backendProjeto.config;

import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static org.springframework.http.CacheControl.maxAge;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    //previne o erro de cors pois o spring nao permite, entao aqui gera as permissões
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Aplica para todas as rotas
                .allowedOriginPatterns("*") // Permite requisições de localhost:5500
                .allowedMethods("*") // Permite métodos específicos
                .allowedHeaders("*") // Permite todos os cabeçalhos
                .allowCredentials(true); // Permite credenciais (cookies, autenticação, etc.)
    }

}
