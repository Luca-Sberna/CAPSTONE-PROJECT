package luca.sberna.capstone.empire.of.gamers;

import static org.assertj.core.api.Assertions.assertThatExceptionOfType;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import luca.sberna.capstone.empire.of.gamers.entities.User;
import luca.sberna.capstone.empire.of.gamers.exceptions.EmailAlreadyExistsException;
import luca.sberna.capstone.empire.of.gamers.payloads.UserRegistrationPayload;
import luca.sberna.capstone.empire.of.gamers.repositories.UserRepository;
import luca.sberna.capstone.empire.of.gamers.services.UserService;

@SpringBootTest
class ApplicationTests {
	@Mock
	private UserRepository ur;
	@InjectMocks
	private UserService us;

	// variabili che si possono ripetere molte volte
	UUID idUser = UUID.randomUUID();
	Date date = new Date();
	User utenteProva = new User("usernameProva", "email@prova.it", "suPercalifragi12!", date);
	String email = "test@example.com";
	String username = "findUserByUsername";

	// Parametri di paginazione
	int page = 0;
	int size = 10;
	String sortBy = "idUser";

	@Test
	public void testFindAllUsers() {

		// Mocking the repository
		Pageable pageable = PageRequest.of(0, 10, Sort.by("sortBy"));
		List<User> utenti = new ArrayList<>();
		utenti.add(new User());
		Page<User> page = new PageImpl<>(utenti, pageable, 1);

		when(ur.findAll(pageable)).thenReturn(page);

		// Calling the service method
		Page<User> result = us.findAllUsers(0, 10, "sortBy");

		verify(ur, times(1)).findAll(pageable);

		// Assertions
		assertNotNull(result);
		assertEquals(1, result.getTotalElements());
		// Additional assertions based on your expected data

	}

	@Test
	public void testCreateUser() {
		// Create a user registration payload
		UserRegistrationPayload payload = new UserRegistrationPayload();
		payload.setUsername("user1");
		payload.setEmail("user1@example.com");
		payload.setPassword("password1");
		payload.setBirthDate(date);

		// Configure the behavior of the mock repository
		when(ur.save(Mockito.any(User.class))).thenReturn(new User());

		// Call the createUser() method in the service
		User result = us.createUser(payload);

		verify(ur, times(1)).save(Mockito.any(User.class));

		// Verify that the result is not null and has the expected values
		assertNotNull(result);

	}

	@Test
	public void testCreateUser_ThrowsEmailAlreadyExistsException() {
		// Create a user registration payload
		UserRegistrationPayload payload = new UserRegistrationPayload();
		payload.setUsername("user1");
		payload.setEmail("user1@example.com");
		payload.setPassword("password1");
		payload.setBirthDate(new Date());

		// Configure the behavior of the mock repository
		when(ur.findByEmail(anyString())).thenReturn(Optional.of(new User()));

		// Call the createUser() method in the service and expect an
		// EmailAlreadyExistsException
		assertThatExceptionOfType(EmailAlreadyExistsException.class).isThrownBy(() -> us.createUser(payload));
	}

	@Test
	public void testFindUserById() throws NotFoundException {
		utenteProva.setIdUser(idUser);

		// mock della repo che restituisce l'utente di prova
		when(ur.findById(idUser)).thenReturn(Optional.of(utenteProva));

		User result = us.findUserById(idUser);

		verify(ur, times(1)).findById(idUser);

		assertNotNull(result);
		assertEquals(idUser, result.getIdUser());
	}

	@Test
	public void testFindUserByIdAndUpdate() throws NotFoundException {
		utenteProva = new User("usernameProva2", "email@prova.it", "suPercalifragi12", date);
		utenteProva.setIdUser(idUser);

		UserRegistrationPayload updatedPayload = new UserRegistrationPayload();

		// Mock del repository per restituire l'utente di prova
		when(ur.findById(idUser)).thenReturn(Optional.of(utenteProva));
		when(ur.save(Mockito.any(User.class))).thenReturn(utenteProva);

		// Chiamata al metodo del servizio
		User result = us.findUserByIdAndUpdate(idUser, updatedPayload);

		verify(ur, times(1)).findById(idUser);
		verify(ur, times(1)).save(utenteProva);

		// Asserzioni
		assertNotNull(result);
		assertEquals(updatedPayload.getUsername(), result.getUsername());

	}

	@Test
	public void testFindUserByIdAndDelete() throws NotFoundException {
		utenteProva.setIdUser(idUser);

		// Mock del repository per restituire l'utente di prova
		when(ur.findById(idUser)).thenReturn(Optional.of(utenteProva));

		// Chiamata al metodo del servizio
		us.findUserByIdAndDelete(idUser);

		verify(ur, times(1)).delete(utenteProva);
	}

	@Test
	public void testFindUserByEmail() throws NotFoundException {
		utenteProva = new User("usernameProvaEmail", email, "suPercalifragi12", date);

		// Mock del repository per restituire l'utente di prova
		when(ur.findByEmail(email)).thenReturn(Optional.of(utenteProva));

		// Chiamata al metodo del servizio
		User result = us.findUserByEmail(email);

		verify(ur, times(1)).findByEmail(email);

		// Asserzioni
		assertNotNull(result);
		assertEquals(email, result.getEmail());
	}

	@Test
	public void testFindUserByUsername() throws NotFoundException {
		utenteProva = new User(username, "test@example.com", "suPercalifragi12", date);

		// Mock del repository per restituire l'utente di prova
		when(ur.findByUsername(username)).thenReturn(Optional.of(utenteProva));

		// Chiamata al metodo del servizio
		us.findUserByUsername(username);

		verify(ur, times(1)).findByUsername(username);

		// Asserzioni
		assertNotNull(utenteProva);
		assertEquals(username, utenteProva.getUsername());
	}

}