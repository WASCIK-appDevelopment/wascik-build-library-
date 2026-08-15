# Codespaces Secret Recovery

Disposable cloud development environments should not make a project dependent on one local `.env` file.

## Recommended model

1. Keep `.env.local` and other secret files ignored by Git.
2. Store reusable secret **names** in documentation, never their values.
3. Put long-lived development values into GitHub Codespaces repository/organization secrets where appropriate.
4. Keep an independent secure password-manager or encrypted-device record for credentials that may need rotation/recovery.
5. Configure equivalent production secrets separately in the hosting platform.

## Recovery after a deleted Codespace

- Create/open the new Codespace.
- Confirm Codespaces secrets are available as environment variables.
- Restore only non-secret local configuration files from Git.
- Restart the dev server after changing/injecting environment values.
- Use safe health endpoints to test each dependency independently.

## Diagnostic pattern

A configuration health endpoint should report booleans/status such as:

```json
{
  "configured": true,
  "authenticated": true,
  "serviceReachable": true
}
```

Never echo the secret value, even partially.

For AI services, separate **key authentication** from **real model-request health**. A key may authenticate successfully but still fail a real request because of project billing, quota, permission, or model access.

For databases, prefer a harmless real read over checking only whether an environment variable exists.

## Local backup warning

If a developer temporarily copies `.env.local` to a `.txt` file for mobile viewing/recovery, that backup is still a secret file. It must not be committed, uploaded to a public repo, attached to tickets, or left in an unprotected download folder.