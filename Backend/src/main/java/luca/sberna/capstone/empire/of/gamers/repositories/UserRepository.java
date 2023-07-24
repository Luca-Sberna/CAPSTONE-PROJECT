package luca.sberna.capstone.empire.of.gamers.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import luca.sberna.capstone.empire.of.gamers.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
	Optional<User> findByEmail(String email);

	Optional<User> findByUsername(String username);

	Page<User> findByUsernameContainingIgnoreCaseOrEmailContainingIgnoreCase(String username, String email,
			Pageable pageable);

}
