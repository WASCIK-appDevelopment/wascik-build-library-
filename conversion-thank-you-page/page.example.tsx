import Image from "next/image";
import Link from "next/link";
import styles from "./thank-you.module.css";

export default function ThankYouPage() {
  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="thank-you-title">
        <Link className={styles.brand} href="/" aria-label="Return to the home page">
          <Image
            src="/[customer-logo].png"
            alt="[Customer business name]"
            width={460}
            height={126}
            priority
          />
        </Link>

        <div className={styles.content}>
          <div className={styles.imageFrame}>
            <Image
              className={styles.image}
              src="/[customer-image].png"
              alt="[Owner name], [owner role]"
              width={420}
              height={520}
              priority
            />
          </div>

          <div className={styles.message}>
            <p className={styles.eyebrow}>You’re all set</p>
            <h1 id="thank-you-title">Thank you for choosing [Business Name].</h1>
            <p className={styles.lead}>
              We appreciate the opportunity to help you move your project forward.
            </p>
            <p>
              We’ll be in touch soon to confirm your details, next steps, and timeline.
            </p>

            <div className={styles.actions}>
              <Link className={styles.primaryAction} href="/">
                Return home
              </Link>
              <a className={styles.secondaryAction} href="tel:[E164-phone-number]">
                Call [display-phone-number]
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
