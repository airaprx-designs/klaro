/**
 * PageHeading — left-column page intro used on Home and Progress.
 *
 * Visual only. No business logic.
 * Title is rendered as a real <h1> so the brand type ramp from globals.css
 * applies automatically (Plus Jakarta Sans, warm-dark, 40px, weight 700).
 *
 * Brand refresh · Step 3: subtitle shifted from graphite → warm-mid so the
 * intro reads in the warm palette family.
 */

type Props = {
  title: string;
  subtitle?: string;
};

export function PageHeading({ title, subtitle }: Props) {
  return (
    <header>
      <h1>{title}</h1>
      {subtitle ? <p className="text-warm-mid">{subtitle}</p> : null}
    </header>
  );
}
