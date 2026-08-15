# Conversion Thank-You Page

A reusable Next.js App Router destination for customers who complete a genuine lead form, booking, checkout, or purchase.

## What this pattern solves

- Provides a clear branded confirmation after a conversion.
- Gives ad platforms a unique destination URL for page-load conversion measurement.
- Prevents the confirmation route from appearing in ordinary search results.
- Works on mobile and desktop.
- Keeps customer-specific identity, phone numbers, images, and copy outside the shared library.

## Files

- `page.example.tsx` - customer-neutral page component.
- `thank-you.example.module.css` - responsive presentation.
- `layout.example.tsx` - metadata with `noindex, follow=false`.

Copy these files into `app/thank-you/`, remove `.example` from the filenames, and replace the bracketed values.

## Required customer-project setup

1. Add the customer's approved logo and portrait or brand image under `public/`.
2. Replace every bracketed placeholder in the component and metadata.
3. Route only a successful form submission, booking, or payment completion to `/thank-you`.
4. Do not link the page in normal site navigation or include it in `sitemap.xml`.
5. Configure the advertising or analytics conversion to fire on the exact thank-you URL.
6. Test the complete customer journey before publishing.

## Measurement guardrail

A thank-you page view is useful as a conversion only when ordinary visitors cannot reach it during normal browsing. If the route is publicized, indexed, or used as a general information page, page-load counts will include false conversions.

For higher-assurance payment reporting, pair the page-load signal with the payment provider's verified server-side completion event. Never treat a client-side redirect alone as proof that money settled.

## Privacy and security

Do not include order numbers, customer names, email addresses, payment details, or other private information in the URL. If the page needs transaction-specific data, obtain it through an authenticated server-side lookup rather than query-string secrets.
