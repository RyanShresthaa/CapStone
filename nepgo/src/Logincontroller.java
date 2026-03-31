package your.package;

import javafx.fxml.FXML;
import javafx.scene.control.*;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

public class LoginController {

    @FXML private TextField emailField;
    @FXML private PasswordField passwordField;
    @FXML private Label statusLabel;

    @FXML
    private void handleLogin() {
        String email = emailField.getText();
        String password = passwordField.getText();

        if (email.isEmpty() || password.isEmpty()) {
            statusLabel.setText("Please fill in all fields.");
            return;
        }

        try {
            URL url = new URL("http://localhost:3000/api/login");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json; utf-8");
            conn.setDoOutput(true);

            String jsonInputString = String.format("{\"email\":\"%s\", \"password\":\"%s\"}", email, password);

            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = jsonInputString.getBytes("utf-8");
                os.write(input, 0, input.length);
            }

            int code = conn.getResponseCode();
            if (code == 200) {
                statusLabel.setText("Login successful!");
                // TODO: Switch to dashboard scene
            } else {
                BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
                StringBuilder errorResponse = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    errorResponse.append(line);
                }
                statusLabel.setText("Login failed: " + errorResponse.toString());
            }

        } catch (IOException e) {
            e.printStackTrace();
            statusLabel.setText("Server error: " + e.getMessage());
        }
    }
}
