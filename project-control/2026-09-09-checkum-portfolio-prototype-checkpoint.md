# CheckUm Portfolio Prototype Checkpoint

**Date:** September 9, 2026  
**Project:** CheckUm  
**Repository:** `WASCIK-appDevelopment/checkum-app`  
**Active branch:** `main`  
**Tagline:** **Get Paid. No Delay.**  
**Portfolio-build commit:** `16beea9493a773562669e4992b7d8efde8351ae1`

## 1. Controlling product identity

- Official spelling is **CheckUm**.
- The capital **C** and capital **U** are binding brand details.
- The **U** is designed as an open wallet.
- A refined check mark is placed inside the wallet-shaped U.
- The approved visual direction is a dark professional fintech presentation using navy, bright green, and white.
- The application is mobile-first and merchant-centered.

## 2. Current verified status

CheckUm is a substantial, navigable portfolio-operational fintech prototype. It is suitable for demonstrating the product concept and merchant experience.

It is **not** a production payment processor and must not be represented as accepting real money.

The portfolio build was pushed directly to `main`. Strict TypeScript checking and an Expo production web export were reported successful. A cloud browser could not open the local-only preview address, so final visual and device-level acceptance remains an owner test.

## 3. Portfolio functionality represented

The presentation build includes:

- splash, welcome, sign-in, signup, and merchant onboarding;
- professional merchant dashboard and sample business metrics;
- amount entry, tip selection, and total calculation;
- simulated Tap-to-Pay presentation flow;
- simulated manual-card workflow;
- payment-link and QR-payment previews;
- cash-sale recording;
- simulated authorization delays, loading, validation, success, and error states;
- searchable transaction activity;
- receipt presentation;
- simulated refunds;
- payout presentation;
- analytics;
- settings;
- notifications;
- customer support;
- realistic demonstration data;
- responsive dark fintech styling;
- explicit demo and portfolio safeguards.

## 4. Binding safety boundary

Until secure processor infrastructure is selected and implemented:

- do not accept or store real card numbers;
- do not collect real bank credentials through custom client forms;
- do not process real payments;
- do not represent simulated NFC as operating Tap-to-Pay;
- do not perform real payouts;
- do not perform custom identity verification;
- do not place processor secret keys in client code;
- do not claim processor, Apple, Android, PCI, KYC/KYB, banking, or regulatory approval.

The payment service provider should handle card data, merchant verification, bank connection, settlement, KYC/KYB, and regulated payment functions wherever possible. CheckUm should operate as the software platform rather than holding customer or merchant funds itself.

## 5. Realistic completion assessment

Two completion measures must remain separate:

- **Visible portfolio experience:** approximately **90–95%** of what a prospective client, partner, or investor can see and interact with.
- **Complete production payment product:** approximately **25–35%** of the total work required for a responsible launch.

The smaller visible remainder is not the difficult part. The remaining production work contains most of the security, regulatory, underwriting, integration, and operational risk.

## 6. Remaining production work

### Product and commercial specification

- Freeze the launch MVP.
- Decide whether QR, catalog, invoices, customers, discounts, teams, and multi-location support are launch features or later phases.
- Define pricing, transaction fees, subscriptions, refund policy, payout timing, reserves, holds, prohibited businesses, and support expectations.
- Define merchant, customer, transaction, receipt, refund, dispute, and payout models.

### Secure backend

- Production authentication and authorization.
- Secure API and database.
- Merchant and business records.
- Transaction persistence.
- Verified processor webhooks.
- Idempotency and replay protection.
- Audit logs, monitoring, alerting, backups, and incident handling.
- Environment-secret management.

### Processor and payment lifecycle

- Select a supported payment service provider.
- Complete platform and beneficial-owner underwriting early.
- Establish processor-connected merchant onboarding.
- Integrate processor-managed KYC/KYB and payout accounts.
- Prove the full sandbox lifecycle before NFC:
  - payment creation;
  - authorization;
  - webhook confirmation;
  - transaction storage;
  - receipt;
  - refund;
  - dispute and failure states.
- Implement real payouts and reconciliation only through approved processor architecture.

### Tap-to-Pay and native delivery

- Obtain the required organization-level developer accounts.
- Work with a supported payment service provider.
- Request Apple Tap to Pay on iPhone entitlement.
- Integrate the provider's approved native SDK/API.
- Complete Android provider/device requirements.
- Test compatible physical devices.
- Complete App Store, Google Play, native build, and review requirements.

### Security, compliance, and operations

- PCI scope review.
- Privacy Policy, Terms of Service, and Merchant Agreement.
- Data-retention and deletion policy.
- Fraud and risk controls.
- Chargeback and dispute operations.
- Negative-balance, reserve, hold, and prohibited-business procedures.
- SMS/email receipt consent and delivery controls.
- Accessibility, security, penetration, native-device, lifecycle, and beta testing.
- Professional legal and compliance review before production.

## 7. Responsibility split

### Technical work that can be carried forward through development

- product specifications and technical plans;
- frontend and backend implementation;
- database design;
- authentication and API work;
- processor sandbox integration;
- webhook and transaction lifecycle;
- automated testing;
- documentation;
- deployment preparation;
- security controls within the application.

### Founder/account-holder responsibilities

- establish and maintain the legal business entity;
- establish business banking;
- supply truthful identity, ownership, tax, and banking information;
- make product, pricing, risk, and business-policy decisions;
- apply for processor and platform accounts;
- review and sign contracts;
- pay unavoidable account, service, legal, and registration costs;
- recruit beta merchants;
- perform owner acceptance and real-device testing;
- retain responsibility for the business and regulated relationships.

Private founder background details should never be stored in this public reusable Build Library. As a general control, processor and banking underwriting of every founder and beneficial owner must be investigated before expensive processor-specific development. Do not hide or misstate requested information.

## 8. Recommended continuation order

1. Owner visually tests the current portfolio build.
2. Repair any presentation, branding, navigation, or responsive issues found.
3. Freeze the portfolio frontend on `main`.
4. Produce the final launch MVP and commercial specification.
5. Obtain preliminary processor/platform underwriting before building deeply around one provider.
6. Build the secure backend and production data model.
7. Integrate and prove processor sandbox payments.
8. Add refunds, receipts, reconciliation, failures, and disputes.
9. Pursue Apple/Android Tap-to-Pay entitlement and native integration.
10. Complete security, compliance, legal, and beta validation.
11. Launch only after the processor, platform, security, and operational requirements are satisfied.

## 9. Preview procedure

From an iPhone:

1. Open the GitHub repository in Safari.
2. Select **Code**, then **Codespaces**.
3. Open the existing Codespace on `main`, or create one on `main`.
4. In the terminal run:

```bash
git pull origin main
npm install
npm run web
```

5. Open the Codespaces **Ports** panel.
6. Open port **8081** using its browser/globe control.
7. Keep the Codespace running while testing.

If port 8081 does not appear, run:

```bash
npx expo start --web
```

## 10. Exact current continuation point

The immediate next action is **owner visual and interaction testing of commit `16beea9493a773562669e4992b7d8efde8351ae1` on an iPhone Codespaces web preview**.

Record every visual or behavioral defect before starting production payment work. After corrections, establish a clean **CheckUm Portfolio Frontend Freeze** checkpoint on `main`.

Production development must begin with MVP definition and early processor underwriting—not with custom real-card handling or unapproved NFC code.
