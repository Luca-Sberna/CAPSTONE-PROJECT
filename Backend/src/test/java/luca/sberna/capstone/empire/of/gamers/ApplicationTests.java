package luca.sberna.capstone.empire.of.gamers;

import static org.assertj.core.api.Assertions.assertThatExceptionOfType;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import luca.sberna.capstone.empire.of.gamers.entities.CreditCard;
import luca.sberna.capstone.empire.of.gamers.entities.User;
import luca.sberna.capstone.empire.of.gamers.exceptions.EmailAlreadyExistsException;
import luca.sberna.capstone.empire.of.gamers.exceptions.InvalidEmailException;
import luca.sberna.capstone.empire.of.gamers.exceptions.ValidationException;
import luca.sberna.capstone.empire.of.gamers.exceptions.WeakPasswordException;
import luca.sberna.capstone.empire.of.gamers.payloads.CreditCardRegistrationPayload;
import luca.sberna.capstone.empire.of.gamers.payloads.UserRegistrationPayload;
import luca.sberna.capstone.empire.of.gamers.repositories.CreditCardRepository;
import luca.sberna.capstone.empire.of.gamers.repositories.UserProfileRepository;
import luca.sberna.capstone.empire.of.gamers.repositories.UserRepository;
import luca.sberna.capstone.empire.of.gamers.repositories.VipUserRepository;
import luca.sberna.capstone.empire.of.gamers.services.CreditCardService;
import luca.sberna.capstone.empire.of.gamers.services.UserProfileService;
import luca.sberna.capstone.empire.of.gamers.services.UserService;
import luca.sberna.capstone.empire.of.gamers.services.VipUserService;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
class ApplicationTests {
	@Mock
	private UserRepository ur;
	@InjectMocks
	private UserService us;
	@Mock
	private CreditCardRepository creditCardRepository;
	@InjectMocks
	private CreditCardService creditCardService;
	@Mock
	private UserProfileRepository userProfileRepo;
	@InjectMocks
	private UserProfileService userProfileService;
	@Mock
	private VipUserRepository vipUserRepo;
	@InjectMocks
	private VipUserService vipUserService;

	// variabili che si possono ripetere molte volte
	UUID idUser = UUID.randomUUID();
	Date date = new Date();
	User utenteProva = new User("usernameProva", "email@prova.it", "suPercalifragi12!", date);
	CreditCard cartaProva = new CreditCard(new BigInteger("1234567890123456"), date, 123, "nome", "cognome");
	String email = "test@example.com";
	String username = "findUserByUsername";

	// Parametri di paginazione utente
	int page = 0;
	int size = 10;
	String sortBy = "idUser";

	// ----------------------USER TEST------------------------

	@Test
	public void testFindAllUsers() {

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
	public void testCreateUser_InvalidEmail() {
		// Create a user registration payload with an invalid email
		UserRegistrationPayload payload = new UserRegistrationPayload();
		payload.setUsername("user1");
		payload.setEmail("invalid_email");
		payload.setPassword("password1");
		payload.setBirthDate(date);

		// Call the createUser() method in the service
		assertThatExceptionOfType(InvalidEmailException.class).isThrownBy(() -> us.createUser(payload));
	}

	@Test
	public void testCreateUser_WeakPassword() {
		// Create a user registration payload with a weak password
		UserRegistrationPayload payload = new UserRegistrationPayload();
		payload.setUsername("user1");
		payload.setEmail("user1@example.com");
		payload.setPassword("weak");
		payload.setBirthDate(date);

		// Call the createUser() method in the service
		assertThatExceptionOfType(WeakPasswordException.class).isThrownBy(() -> us.createUser(payload));
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
	public void testFindUserById_UserNotFound() {
	    // Configure the behavior of the mock repository to return an empty optional
	    when(ur.findById(idUser)).thenReturn(Optional.empty());

	    // Call the findUserById() method in the service and expect a NotFoundException
	    assertThatExceptionOfType(NotFoundException.class).isThrownBy(() -> us.findUserById(idUser));
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
	public void testFindUserByIdAndDelete_UserNotFound() {
	    // Configure the behavior of the mock repository to return an empty optional
	    when(ur.findById(idUser)).thenReturn(Optional.empty());

	    // Call the findUserByIdAndDelete() method in the service and expect a NotFoundException
	    assertThatExceptionOfType(NotFoundException.class).isThrownBy(() -> us.findUserByIdAndDelete(idUser));
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

	// --------------------CREDIT CARD TEST------------------------------

	@Test
	public void testCreateCreditCard() {

	}

	@Test
	public void testGetCreditCardById() {
		UUID creditCardId = UUID.randomUUID();
		CreditCard creditCard = new CreditCard();
		creditCard.setId(creditCardId);
		when(creditCardRepository.findById(creditCardId)).thenReturn(Optional.of(creditCard));

		// Act
		CreditCard retrievedCard = creditCardService.getCreditCardById(creditCardId);

		// Assert
		assertNotNull(retrievedCard);
		assertEquals(creditCardId, retrievedCard.getId());
		verify(creditCardRepository, times(1)).findById(creditCardId);
	}

	@Test
	public void testGetAllCreditCards() {
		int page = 0;
		int size = 10;
		String sortBy = "name";

		List<CreditCard> creditCards = new ArrayList<>();
		creditCards.add(new CreditCard());
		creditCards.add(new CreditCard());
		Page<CreditCard> creditCardPage = new PageImpl<>(creditCards);
		when(creditCardRepository.findAll(any(Pageable.class))).thenReturn(creditCardPage);

		// Act
		Page<CreditCard> retrievedCards = creditCardService.getAllCreditCards(page, size, sortBy);

		// Assert
		assertNotNull(retrievedCards);
		assertEquals(creditCards.size(), retrievedCards.getSize());
		verify(creditCardRepository, times(1)).findAll(any(Pageable.class));
	}

	@Test
	public void testDeleteCreditCard() throws NotFoundException {
		UUID creditCardId = UUID.randomUUID();
		cartaProva.setId(creditCardId);

		CreditCardRepository creditCardRepositoryMock = mock(CreditCardRepository.class);
		when(creditCardRepositoryMock.findById(creditCardId)).thenReturn(Optional.of(cartaProva));

		CreditCardService creditCardService = new CreditCardService(creditCardRepositoryMock);

		// Act
		creditCardService.deleteCreditCard(creditCardId);

		// Assert
		verify(creditCardRepositoryMock, times(1)).delete(cartaProva);
	}

	@Test
	public void testUpdateCreditCard() {
		UUID creditCardId = UUID.randomUUID();
		CreditCardRegistrationPayload payload = new CreditCardRegistrationPayload();
		payload.setCardNumber(new BigInteger("1231231231231231"));
		payload.setCvv(321);
		CreditCard existingCard = new CreditCard();
		existingCard.setId(creditCardId);
		existingCard.setCardNumber(new BigInteger("1231231231231231"));
		existingCard.setCvv(123);
		when(creditCardRepository.findById(creditCardId)).thenReturn(Optional.of(existingCard));
		when(creditCardRepository.save(any(CreditCard.class))).thenReturn(existingCard);

		// Act
		CreditCard updatedCard = creditCardService.updateCreditCard(creditCardId, payload);

		// Assert
		assertNotNull(updatedCard);
		assertEquals(existingCard.getId(), updatedCard.getId());
		assertEquals(payload.getCardNumber(), updatedCard.getCardNumber());
		assertEquals(payload.getCvv(), updatedCard.getCvv());
		verify(creditCardRepository, times(1)).findById(creditCardId);
		verify(creditCardRepository, times(1)).save(any(CreditCard.class));
	}

	// verifica solo che il valore del CVV convertito sia corretto dopo la creazione
	// della carta di credito
	@Test
	public void testConvertCVV() {

	}

	@Test
	public void testValidPayload() {

	}

	@Test
	public void testInvalidCvv() {
		CreditCardRegistrationPayload payload = new CreditCardRegistrationPayload();
		payload.setCardNumber(new BigInteger("1234567890123456"));
		payload.setExpirationDate(new Date());
		payload.setCvv(12);
		payload.setName("John");
		payload.setSurname("Doe");

		// Assert and expect a ValidationException
		assertThatExceptionOfType(ValidationException.class).isThrownBy(() -> {
			creditCardService.createCreditCard(payload);
		});
	}

	@Test
	public void testInvalidCardNumber() {
		CreditCardRegistrationPayload payload = new CreditCardRegistrationPayload();
		payload.setCardNumber(new BigInteger("1234"));
		payload.setExpirationDate(new Date());
		payload.setCvv(123);
		payload.setName("John");
		payload.setSurname("Doe");

		// Assert and expect a ValidationException
		assertThatExceptionOfType(ValidationException.class).isThrownBy(() -> {
			creditCardService.createCreditCard(payload);
		});
	}

	// -------------------- USERS PROFILE ------------------------------

	@Test
	public void testCreateUserProfile() {

	}

	@Test
	public void testGetUserProfileById() {

	}

	@Test
	public void testUpdateUserProfile() {

	}

	@Test
	public void testDeleteUserProfile() {

	}

	@Test
	public void testUpdateUserProfileImage() {

	}

	@Test
	public void testUpdateUserProfileBackground() {

	}

	@Test
	public void testGetAllUsersProfile() {

	}

	// ---------------- VIP USER TEST -----------------------------

	@Test
	public void testCreateVipUser() {

	}

	@Test
	public void testGetAllVipUsers() {

	}

	@Test
	public void testGetVipUserById() {

	}

	@Test
	public void testUpdateVipUser() {

	}

	@Test
	public void testDeleteVipUser() {

	}

	// ------------------GAME TEST---------------------------

	@Test
	public void testCreateGame() {

	}

	@Test
	public void testGetAllGames() {

	}

	@Test
	public void testGetGameById() {

	}

	@Test
	public void testUpdateGame() {

	}

	@Test
	public void testDeleteGame() {

	}

	// ------------------ RANKING TEST ------------------------------

	@Test
	public void testCreateRanking() {

	}

	@Test
	public void testGetAllRankings() {

	}

	@Test
	public void testGetRankingsByUser() {

	}

	@Test
	public void testGetRankingById() {

	}

	@Test
	public void testUpdateRanking() {

	}

	@Test
	public void testDeleteRanking() {

	}

	// --------------- REVIEW TEST --------------------
	@Test
	public void createReview() {

	}

	@Test
	public void getAllReviews() {

	}

	@Test
	public void getReviewById() {

	}

	@Test
	public void updateReview() {

	}

	@Test
	public void deleteReview() {

	}

	@Test
	public void getReviewsByUser() {

	}

	@Test
	public void getReviewsByGame() {

	}

}