# Form email backend

Volunteer, Donate, and Partner forms are sent to **contact@ncorefoundation.org** via this backend when it is running and configured.

## Quick start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure SMTP**  
   Copy `.env.example` to `.env` and set your SMTP details:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set at least:
   - `SMTP_HOST` – e.g. `smtp.gmail.com`
   - `SMTP_USER` – your email or API user
   - `SMTP_PASS` – password or app password / API key

3. **Run the server**
   ```bash
   npm start
   ```
   The site is served at **http://localhost:3000**. Form submissions will be sent by email.

## Environment variables

| Variable           | Required | Description |
|--------------------|----------|-------------|
| `PORT`             | No       | Server port (default `3000`) |
| `TO_EMAIL`         | No       | Recipient (default `contact@ncorefoundation.org`) |
| `SMTP_HOST`        | Yes*     | SMTP server hostname |
| `SMTP_PORT`        | No       | SMTP port (default `587`) |
| `SMTP_SECURE`      | No       | Use TLS (default `false`) |
| `SMTP_USER`        | Yes*     | SMTP username |
| `SMTP_PASS`        | Yes*     | SMTP password or app password |
| `SMTP_FROM`        | No       | From address (defaults to `SMTP_USER`) |
| `SMTP_FROM_LABEL`  | No       | From display name (e.g. "NCORE Foundation") |

\* Required for emails to be sent. If not set, the API will respond with 503 and the frontend will fall back to opening the user’s email client (mailto).

## SMTP examples

- **Gmail:** Use an [App Password](https://support.google.com/accounts/answer/185833).  
  `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587`, `SMTP_USER=your@gmail.com`, `SMTP_PASS=app-password`

- **SendGrid:**  
  `SMTP_HOST=smtp.sendgrid.net`, `SMTP_USER=apikey`, `SMTP_PASS=your-sendgrid-api-key`

- **Mailgun / other:** Use your provider’s SMTP host, port, and credentials.

## API

- **POST /api/send-form**  
  Body (JSON): `{ "to", "subject", "text", "replyTo" }`  
  Sends one email. Used by the frontend for all three forms.

## Fallback

If the backend is not running or returns an error, the frontend opens the user’s default email client (mailto) with the same content so the submission can still be sent manually.
