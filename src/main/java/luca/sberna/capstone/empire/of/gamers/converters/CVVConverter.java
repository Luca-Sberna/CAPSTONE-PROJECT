package luca.sberna.capstone.empire.of.gamers.converters;

import java.security.InvalidKeyException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
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
			Key key = new SecretKeySpec(secret.getBytes(), "AES");
			Cipher c = Cipher.getInstance(ALGORITHM);

			c.init(Cipher.ENCRYPT_MODE, key);

			return Base64.getEncoder().encodeToString(c.doFinal(String.valueOf(cvv).getBytes()));

		} catch (RuntimeException | NoSuchAlgorithmException | NoSuchPaddingException | InvalidKeyException
				| IllegalBlockSizeException | BadPaddingException e) {
			System.out.println(e);
			throw new RuntimeException();
		}

	}

	@Override
	public Integer convertToEntityAttribute(String encryptedCvv) {
		Key key = new SecretKeySpec(secret.getBytes(), "AES");
		try {
			Cipher c = Cipher.getInstance(ALGORITHM);
			c.init(Cipher.DECRYPT_MODE, key);

			return Integer.parseInt(new String(c.doFinal(Base64.getDecoder().decode(encryptedCvv))));

		} catch (Exception e) {
			System.out.println(e);
			throw new RuntimeException();
		}

	}
}
