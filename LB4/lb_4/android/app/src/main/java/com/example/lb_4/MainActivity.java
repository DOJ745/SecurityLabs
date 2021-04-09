package com.example.lb_4;

import android.os.Bundle;

import com.example.lwocryptocore.lcryptcore.CryptoCase;
import com.example.lwocryptocore.lcryptcore.LCryptCore;

import io.flutter.embedding.android.FlutterActivity;

public class MainActivity extends FlutterActivity {

    private val CHANNEL = "samples.flutter.dev/android_hash";

    static
    {
        System.loadLibrary("cryptowrap");
    }

    @Override
    public void configureFlutterEngine(@NonNull FlutterEngine flutterEngine) {
        super.configureFlutterEngine(flutterEngine);

        new MethodChannel(flutterEngine.getDartExecutor().getBinaryMessenger(), CHANNEL)
                .setMethodCallHandler(
                        (call, result) -> {
                            // Note: this method is invoked on the main thread.
                            if (call.method.equals("getHash")) {

                                String selectedAlgoritm = "sha256";
                                String testMsg = "test";
                                byte[] arrBytesForDigest = new byte[(int) testMsg.length()];
                                arrBytesForDigest = testMsg.getBytes();

                                CryptoCase cryptoCaseDigest = (new LCryptCore()).
                                        CreateDigest(
                                                selectedAlgoritm,
                                                testMsg.getBytes(),
                                                arrBytesForDigest.length);
                                String myHash = bytesToHex(cryptoCaseDigest.digest);
                                //int batteryLevel = getBatteryLevel();
                                if (myHash != "") { result.success(myHash);
                                } else {
                                    result.error("ERROR!", "Somethings wrong with hash!", null);
                                }
                            } else { result.notImplemented(); }
                        }
                );
    }

    /*@Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }*/

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
