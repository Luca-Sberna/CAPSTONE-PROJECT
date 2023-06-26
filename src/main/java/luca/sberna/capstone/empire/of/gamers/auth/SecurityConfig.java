package luca.sberna.capstone.empire.of.gamers.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import luca.sberna.capstone.empire.of.gamers.exceptions.ExceptionHandlerFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
	@Autowired
	JWTAuthFilter jwtAuthFilter;
	@Autowired
	CorsFilter corsFilter;
	@Autowired
	ExceptionHandlerFilter exceptionHandlerFilter;

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

		http.csrf(c -> c.disable());

		http.authorizeHttpRequests(auth -> auth.requestMatchers("/auth/**").permitAll());

		http.authorizeHttpRequests(auth -> {
			auth.requestMatchers(HttpMethod.GET, "/utenti").hasAnyAuthority("USER", "ADMIN");
			auth.requestMatchers("/utenti/**").hasAuthority("ADMIN");
		});

		http.authorizeHttpRequests(auth -> {
			auth.requestMatchers(HttpMethod.GET, "/clienti").hasAnyAuthority("USER", "ADMIN");
			auth.requestMatchers("/clienti/**").hasAuthority("ADMIN");
		});
		http.authorizeHttpRequests(auth -> {
			auth.requestMatchers(HttpMethod.GET, "/indirizzi").hasAnyAuthority("USER", "ADMIN");
			auth.requestMatchers("/indirizzi/**").hasAuthority("ADMIN");
		});

		http.authorizeHttpRequests(auth -> {
			auth.requestMatchers(HttpMethod.GET, "/fatture/cliente/{clienteId}").hasAnyAuthority("USER", "ADMIN");
			auth.requestMatchers(HttpMethod.GET, "/fatture/state/{stato}").hasAnyAuthority("USER", "ADMIN");
			auth.requestMatchers(HttpMethod.GET, "/fatture/data/{data}").hasAnyAuthority("USER", "ADMIN");
			auth.requestMatchers(HttpMethod.GET, "/fatture/anno/{anno}").hasAnyAuthority("USER", "ADMIN");
			auth.requestMatchers(HttpMethod.GET, "/fatture/importo/{minImporto}/{maxImporto}").hasAnyAuthority("USER",
					"ADMIN");
			auth.requestMatchers(HttpMethod.GET, "/fatture").hasAnyAuthority("USER", "ADMIN");
			auth.requestMatchers("/fatture/**").hasAuthority("ADMIN");
		});

		http.addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class);

//		http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
//
//		http.addFilterBefore(exceptionHandlerFilter, JWTAuthFilter.class);

		http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		return http.build();
	}

	@Bean
	PasswordEncoder pwEncoder() {
		return new BCryptPasswordEncoder(10);
	}

}
