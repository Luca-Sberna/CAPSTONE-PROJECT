package luca.sberna.capstone.empire.of.gamers.controllers;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

import luca.sberna.capstone.empire.of.gamers.entities.CreditCard;
import luca.sberna.capstone.empire.of.gamers.entities.User;
import luca.sberna.capstone.empire.of.gamers.payloads.CreditCardRegistrationPayload;
import luca.sberna.capstone.empire.of.gamers.services.CreditCardService;

@RestController
@RequestMapping("/creditCards")
public class CreditCardController {
	@Autowired
	private final CreditCardService creditCardService;

	@Autowired
	public CreditCardController(CreditCardService creditCardService) {
		this.creditCardService = creditCardService;
	}

	@GetMapping("")
	public Page<CreditCard> getAllCreditCards(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "id") String sortBy) {
		return creditCardService.getAllCreditCards(page, size, sortBy);
	}

	@GetMapping("/{id}")
	public ResponseEntity<CreditCard> getCreditCardById(@PathVariable UUID id) {
		CreditCard creditCard = creditCardService.getCreditCardById(id);
		if (creditCard != null) {
			return ResponseEntity.ok(creditCard);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PostMapping("")
	public ResponseEntity<CreditCard> createCreditCard(@RequestBody CreditCardRegistrationPayload payload) {
		CreditCard createdCard = creditCardService.createCreditCard(payload);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdCard);
	}

	@PutMapping("/{id}")
	public ResponseEntity<CreditCard> updateCreditCard(@PathVariable UUID id,
			@RequestBody CreditCardRegistrationPayload payload) {
		CreditCard updatedCard = creditCardService.updateCreditCard(id, payload);
		if (updatedCard != null) {
			return ResponseEntity.ok(updatedCard);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteCreditCard(@PathVariable UUID id) throws NotFoundException {
		creditCardService.deleteCreditCard(id);
	}

	@GetMapping("/user/{userId}")
	public ResponseEntity<Page<CreditCard>> getCreditCardsByUser(@PathVariable UUID userId,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size) {
		User user = new User();
		user.setIdUser(userId);
		Page<CreditCard> creditCards = creditCardService.getCreditCardsByUser(user, page, size);
		if (creditCards.isEmpty()) {
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.ok(creditCards);
		}
	}
}
