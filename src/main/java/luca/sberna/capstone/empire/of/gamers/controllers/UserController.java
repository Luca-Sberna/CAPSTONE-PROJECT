package luca.sberna.capstone.empire.of.gamers.controllers;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import luca.sberna.capstone.empire.of.gamers.entities.User;
import luca.sberna.capstone.empire.of.gamers.payloads.UserRegistrationPayload;
import luca.sberna.capstone.empire.of.gamers.services.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
	@Autowired
	private UserService userService;

	@PostMapping("")
	@ResponseStatus(HttpStatus.CREATED)
	public User saveUtente(@RequestBody @Validated UserRegistrationPayload body) {
		return userService.createUser(body);
	}

	@GetMapping("")
	public Page<User> getUtenti(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size,
			@RequestParam(defaultValue = "idUtente") String sortBy) {
		return userService.findAllUser(page, size, sortBy);
	}

	@GetMapping("/{userId}")
	public User getUtenteById(@PathVariable UUID userId) throws NotFoundException {
		return userService.findUserById(userId);
	}

	@PutMapping("/{userId}")
	public User updateUtente(@PathVariable UUID userId, @RequestBody UserRegistrationPayload body)
			throws NotFoundException {
		return userService.findUserByIdAndUpdate(userId, body);
	}

	@DeleteMapping("/{userId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteUtente(@PathVariable UUID userId) throws NotFoundException {
		userService.findUserByIdAndDelete(userId);
	}
}
