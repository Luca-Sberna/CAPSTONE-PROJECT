package luca.sberna.capstone.empire.of.gamers.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import luca.sberna.capstone.empire.of.gamers.entities.User;
import luca.sberna.capstone.empire.of.gamers.exceptions.EmailAlreadyExistsException;
import luca.sberna.capstone.empire.of.gamers.payloads.UserRegistrationPayload;
import luca.sberna.capstone.empire.of.gamers.repositories.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository ur;

	public Page<User> findAllUser(int page, int size, String sortBy) {
		if (size < 0)
			size = 10;
		if (size > 100)
			size = 20;
		Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
		return ur.findAll(pageable);
	}

	public User createUser(UserRegistrationPayload u) {
		ur.findByEmailUser(u.getEmail()).ifPresent(user -> {
			throw new EmailAlreadyExistsException("Email " + user.getEmail() + "già in uso");
		});
		User newUtente = new User(u.getUsername(), u.getEmail(), u.getPassword(), u.getBirthDate());
		return ur.save(newUtente);
	}

	public User findUserById(UUID id) throws NotFoundException { // throws NotFoundException {
		return ur.findById(id).orElseThrow(() -> new NotFoundException()); // .orElseThrow(() -> new
																			// NotFoundException("User not
																			// found!"));
	}

	public User findUserByIdAndUpdate(UUID id, UserRegistrationPayload u) throws NotFoundException {
		User foundUser = this.findUserById(id);
		foundUser.setIdUser(id);
		foundUser.setUsername(u.getUsername());

		foundUser.setEmail(u.getEmail());
		return ur.save(foundUser);
	}

	public void findUserByIdAndDelete(UUID id) throws NotFoundException {
		User foundUser = this.findUserById(id);
		ur.delete(foundUser);
	}

	public User findUserByEmail(String email) throws NotFoundException {
		return ur.findByEmailUser(email).orElseThrow(() -> new NotFoundException());
	}

	public void deleteAllUsers() {
		ur.deleteAll();
	}

}
