package com.example.lb_4;

import android.os.Bundle;

import com.example.lwocryptocore.lcryptcore.CryptoCase;
import com.example.lwocryptocore.lcryptcore.LCryptCore;

import io.flutter.embedding.android.FlutterActivity;

public class MainActivity extends FlutterActivity {

    static
    {
        System.loadLibrary("cryptowrap");
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        String selectedAlgoritm = "sha256";  // тип алгоритма хэширования
        String testMsg = "test";                // входное сообщение для хэширования
        byte[] arrBytesForDigest = new byte[(int) testMsg.length()];
        arrBytesForDigest = testMsg.getBytes();

        // Функция вычисления хэш значения. результат в cryptoCaseDigest.digest
        CryptoCase cryptoCaseDigest = (new LCryptCore()).
                CreateDigest(
                        selectedAlgoritm,
                        testMsg.getBytes(),
                        arrBytesForDigest.length);
        String myHash = bytesToHex(cryptoCaseDigest.digest);

    }
    private final static char[] hexArray = "0123456789ABCDEF".toCharArray();

    public static String bytesToHex(byte[] bytes) {
        char[] hexChars = new char[bytes.length * 2];
        for ( int j = 0; j < bytes.length; j++ ) {
            int v = bytes[j] & 0xFF;
            hexChars[j * 2] = hexArray[v >>> 4];
            hexChars[j * 2 + 1] = hexArray[v & 0x0F];
        }
        return new String(hexChars);
    }
}
