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
			auth.requestMatchers("/creditCards/**").hasAnyAuthority("USER", "ADMIN");
		});

		http.authorizeHttpRequests(auth -> {
			auth.requestMatchers(HttpMethod.GET, "/userProfile").hasAnyAuthority("USER", "ADMIN");
			auth.requestMatchers(HttpMethod.POST, "/userProfile").hasAnyAuthority("USER", "ADMIN");
			auth.requestMatchers(HttpMethod.PUT, "/userProfile/**").hasAnyAuthority("USER", "ADMIN");
			auth.requestMatchers(HttpMethod.DELETE, "/userProfile/**").hasAnyAuthority("USER", "ADMIN");
			auth.requestMatchers("/userProfile/**").hasAnyAuthority("USER", "ADMIN");

		});

		http.authorizeHttpRequests(auth -> {
			auth.requestMatchers(HttpMethod.GET, "/vipUser").hasAnyAuthority("USER", "ADMIN");
			auth.requestMatchers(HttpMethod.PUT, "/vipUser/**").hasAnyAuthority("USER", "ADMIN");
			auth.requestMatchers("/vipUser/**").hasAnyAuthority("USER", "ADMIN");
		});

		http.authorizeHttpRequests(auth -> {
			auth.requestMatchers(HttpMethod.GET, "/game").hasAnyAuthority("USER", "ADMIN");
			auth.requestMatchers(HttpMethod.PUT, "/game/**").hasAnyAuthority("USER", "ADMIN");
			auth.requestMatchers("/game/**").hasAnyAuthority("USER", "ADMIN");
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
