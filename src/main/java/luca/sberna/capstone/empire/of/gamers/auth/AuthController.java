package luca.sberna.capstone.empire.of.gamers.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import luca.sberna.capstone.empire.of.gamers.entities.User;
import luca.sberna.capstone.empire.of.gamers.exceptions.NotFoundException;
import luca.sberna.capstone.empire.of.gamers.exceptions.UnauthorizedException;
import luca.sberna.capstone.empire.of.gamers.payloads.AuthenticationSuccessfullPayload;
import luca.sberna.capstone.empire.of.gamers.payloads.UserLoginPayload;
import luca.sberna.capstone.empire.of.gamers.payloads.UserRegistrationPayload;
import luca.sberna.capstone.empire.of.gamers.services.UserService;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

	@Autowired
	UserService usersService;

	@Autowired
	private PasswordEncoder bcrypt;

	@PostMapping("/registration")
	public ResponseEntity<User> register(@RequestBody @Validated UserRegistrationPayload body) {
		body.setPassword(bcrypt.encode(body.getPassword()));

		User createdUser = usersService.createUser(body);
		return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
	}

	@PostMapping("/login")
	public ResponseEntity<AuthenticationSuccessfullPayload> login(@RequestBody UserLoginPayload body)
			throws org.springframework.data.crossstore.ChangeSetPersister.NotFoundException {
		try {
			User user = usersService.findUserByEmail(body.getEmail());
			String plainPW = body.getPassword();
			String hashedPW = user.getPassword();

			if (!bcrypt.matches(plainPW, hashedPW)) {
				throw new UnauthorizedException("Credenziali non valide");
			}

			String token = JWTTools.createToken(user);
			return new ResponseEntity<>(new AuthenticationSuccessfullPayload(token), HttpStatus.OK);
		} catch (NotFoundException ex) {
			throw new org.springframework.data.crossstore.ChangeSetPersister.NotFoundException();
		}
	}
}