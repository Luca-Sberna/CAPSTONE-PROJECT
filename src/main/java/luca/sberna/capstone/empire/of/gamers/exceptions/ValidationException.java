package luca.sberna.capstone.empire.of.gamers.exceptions;

public class ValidationException extends BadRequestException {

	public ValidationException(String message) {
		super(message);
	}

	public ValidationException(String message, Throwable cause) {
		super(message, cause);
	}

}
