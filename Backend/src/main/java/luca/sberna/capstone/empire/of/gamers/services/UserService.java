package luca.sberna.capstone.empire.of.gamers.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import luca.sberna.capstone.empire.of.gamers.entities.Ranking;
import luca.sberna.capstone.empire.of.gamers.entities.User;
import luca.sberna.capstone.empire.of.gamers.exceptions.EmailAlreadyExistsException;
import luca.sberna.capstone.empire.of.gamers.exceptions.InvalidEmailException;
import luca.sberna.capstone.empire.of.gamers.exceptions.WeakPasswordException;
import luca.sberna.capstone.empire.of.gamers.payloads.UserRegistrationPayload;
import luca.sberna.capstone.empire.of.gamers.repositories.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository ur;

	public Page<User> findAllUsers(int page, int size, String sortBy) {
		if (size < 0)
			size = 10;
		if (size > 100)
			size = 20;
		Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
		return ur.findAll(pageable);
	}

	public User createUser(UserRegistrationPayload u) {
		ur.findByEmail(u.getEmail()).ifPresent(user -> {
			throw new EmailAlreadyExistsException("Email " + user.getEmail() + "già in uso");
		});

		// Validazione dell'email
		if (!isValidEmail(u.getEmail())) {
			throw new InvalidEmailException("L'email inserita non è valida.");
		}

		// Validazione della password
		if (!isStrongPassword(u.getPassword())) {
			throw new WeakPasswordException("La password inserita non è sufficientemente sicura.");
		}

		User newUtente = new User(u.getUsername(), u.getEmail(), u.getPassword(), u.getBirthDate());

		return ur.save(newUtente);
	}

	private boolean isValidEmail(String email) {

		return email.matches("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}");
	}

	private boolean isStrongPassword(String password) {
		return password.length() >= 8 && password.matches(".*\\d.*");
	}

	public User findUserById(UUID id) throws NotFoundException { // throws NotFoundException {
		return ur.findById(id).orElseThrow(() -> new NotFoundException()); // .orElseThrow(() -> new
																			// NotFoundException("User not
																			// found!"));
	}

	public User findUserByIdAndUpdate(UUID id, UserRegistrationPayload u) throws NotFoundException {
		User foundUser = this.findUserById(id);
		foundUser.setUsername(u.getUsername());
		foundUser.setEmail(u.getEmail());
		foundUser.setBirthDate(u.getBirthDate());
		return ur.save(foundUser);
	}

	public void findUserByIdAndDelete(UUID id) throws NotFoundException {
		User foundUser = this.findUserById(id);
		ur.delete(foundUser);
	}

	public User findUserByEmail(String email) throws NotFoundException {
		Optional<User> optionalUser = ur.findByEmail(email);
		if (optionalUser.isPresent()) {
			return optionalUser.get();
		} else {
			throw new NotFoundException();
		}
	}

	public User findUserByUsername(String username) throws NotFoundException {
		return ur.findByUsername(username, Sort.by("username")).orElseThrow(() -> new NotFoundException());
	}

	public void deleteAllUsers() {
		ur.deleteAll();
	}

	public List<Ranking> getUserRankings(UUID userId) throws NotFoundException {
		User user = ur.findById(userId).orElseThrow(() -> new NotFoundException());
		return user.getRankings();
	}

}
