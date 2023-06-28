package luca.sberna.capstone.empire.of.gamers.services;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import luca.sberna.capstone.empire.of.gamers.entities.CreditCard;
import luca.sberna.capstone.empire.of.gamers.exceptions.ValidationException;
import luca.sberna.capstone.empire.of.gamers.payloads.CreditCardRegistrationPayload;
import luca.sberna.capstone.empire.of.gamers.repositories.CreditCardRepository;

@Service
public class CreditCardService {
	@Autowired
	private CreditCardRepository creditCardRepository;

	@Autowired
	public CreditCardService(CreditCardRepository creditCardRepository) {
		this.creditCardRepository = creditCardRepository;
	}

	public CreditCard createCreditCard(CreditCardRegistrationPayload p) {
		try {
			// Validate payload data
			if (p.getCardNumber().toString().length() != 16) {
				throw new ValidationException("Il numero di carta deve essere di 16 cifre");
			}
			if (p.getCvv().toString().length() != 3) {
				throw new ValidationException("Il CVV deve essere di 3 cifre");
			}

			CreditCard creditCard = new CreditCard(p.getCardNumber(), p.getExpirationDate(), p.getCvv(), p.getName(),
					p.getSurname());

			return creditCardRepository.save(creditCard);
		} catch (DataIntegrityViolationException e) {
			throw new ValidationException("Errore durante il salvataggio della carta di credito", e);
		}
	}

	public void deleteCreditCard(UUID id) {
		creditCardRepository.findById(id);
		creditCardRepository.deleteById(id);
	}

	public CreditCard getCreditCardById(UUID id) {
		Optional<CreditCard> optionalCreditCard = creditCardRepository.findById(id);
		return optionalCreditCard.orElse(null);
	}

	public Page<CreditCard> getAllCreditCards(int page, int size, String sortBy) {
		if (size < 0)
			size = 10;
		if (size > 100)
			size = 20;
		Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));

		return creditCardRepository.findAll(pageable);
	}

	public CreditCard updateCreditCard(UUID id, CreditCardRegistrationPayload payload) {
		Optional<CreditCard> optionalCreditCard = creditCardRepository.findById(id);
		if (optionalCreditCard.isPresent()) {
			CreditCard creditCard = optionalCreditCard.get();
			creditCard.setCardNumber(payload.getCardNumber());
			creditCard.setExpirationDate(payload.getExpirationDate());
			creditCard.setCvv(payload.getCvv());
			creditCard.setName(payload.getName());
			creditCard.setSurname(payload.getSurname());
			return creditCardRepository.save(creditCard);
		} else {
			return null;
		}
	}
}
