package luca.sberna.capstone.empire.of.gamers.converters;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class CVVConverter implements AttributeConverter<Integer, String> {
	@Override
	public String convertToDatabaseColumn(Integer attribute) {
		// Logica per nascondere il CVV
		// Ad esempio, sostituisci tutti i caratteri con "*"
		String cvvString = String.valueOf(attribute);
		return cvvString.replaceAll(".", "*");
	}

	@Override
	public Integer convertToEntityAttribute(String dbData) {
		// Logic per la conversione del CVV dal database all'entità
		// Nel nostro caso, non effettuiamo alcuna conversione
		return Integer.parseInt(dbData);
	}
}
