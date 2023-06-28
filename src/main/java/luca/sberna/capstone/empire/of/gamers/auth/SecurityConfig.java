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
			auth.requestMatchers(HttpMethod.GET, "/users").hasAnyAuthority("USER", "ADMIN");
			auth.requestMatchers(HttpMethod.PUT, "/users/**").hasAnyAuthority("USER", "ADMIN");
			auth.requestMatchers("/users/**").hasAuthority("ADMIN");
		});

		http.authorizeHttpRequests(auth -> {
			auth.requestMatchers(HttpMethod.GET, "/creditCards").hasAnyAuthority("USER", "ADMIN");
			auth.requestMatchers(HttpMethod.PUT, "/creditCards/**").hasAnyAuthority("USER", "ADMIN");
			auth.requestMatchers("/creditCards/**").hasAuthority("ADMIN");
		});

		http.addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class);

		http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

		http.addFilterBefore(exceptionHandlerFilter, JWTAuthFilter.class);

		http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		return http.build();
	}

	@Bean
	PasswordEncoder pwEncoder() {
		return new BCryptPasswordEncoder(12);
	}

}
