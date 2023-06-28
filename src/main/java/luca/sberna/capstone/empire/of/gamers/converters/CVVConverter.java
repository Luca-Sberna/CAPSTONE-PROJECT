package luca.sberna.capstone.empire.of.gamers.converters;

import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class CVVConverter implements AttributeConverter<Integer, String> {
	private static final String ALGORITHM = "AES/ECB/PKCS5Padding";
	private static final String secret = "mysup3rs3cr3tttt";

	@Override
	public String convertToDatabaseColumn(Integer cvv) {
		try {
			SecretKeySpec key = new SecretKeySpec(secret.getBytes(), "AES");
			Cipher cipher = Cipher.getInstance(ALGORITHM);
			cipher.init(Cipher.ENCRYPT_MODE, key);

			byte[] encryptedBytes = cipher.doFinal(String.valueOf(cvv).getBytes());
			return Base64.getEncoder().encodeToString(encryptedBytes);
		} catch (Exception e) {
			throw new RuntimeException("Errore durante la conversione del CVV per il database", e);
		}
	}

	@Override
	public Integer convertToEntityAttribute(String encryptedCvv) {
		try {
			SecretKeySpec key = new SecretKeySpec(secret.getBytes(), "AES");
			Cipher cipher = Cipher.getInstance(ALGORITHM);
			cipher.init(Cipher.DECRYPT_MODE, key);

			byte[] decodedBytes = Base64.getDecoder().decode(encryptedCvv);
			byte[] decryptedBytes = cipher.doFinal(decodedBytes);

			return Integer.parseInt(new String(decryptedBytes));
		} catch (Exception e) {
			throw new RuntimeException("Errore durante la conversione del CVV per l'entità", e);
		}
	}
}
