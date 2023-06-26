package luca.sberna.capstone.empire.of.gamers.entities;

import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import luca.sberna.capstone.empire.of.gamers.utils.UserType;

@Entity
@Table(name = "Users")
@Data
@NoArgsConstructor
@JsonIgnoreProperties({ "password" })
public class User implements UserDetails {
	@Id
	@GeneratedValue
	private UUID idUser;
	private String username;
	private String email;
	private String password;
	private Date birthDate;
	@Enumerated(EnumType.STRING)
	private UserType role;

	public User(String username, String email, String password, Date birthDate) {
		this.username = username;
		this.email = email;
		this.password = password;
		this.birthDate = birthDate;
		this.role = UserType.USER;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(new SimpleGrantedAuthority(role.name()));

	}

	public String getEmailFromUsername() {
		return this.email;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return false;
	}

}