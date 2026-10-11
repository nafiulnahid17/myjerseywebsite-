import { Button } from '@workspace/my-jersey-design/components/ui/button';
import { BrandLogo } from '@workspace/my-jersey-design/components/ui/brand-logo';
import { useTheme } from '@/lib/theme';

export default function NotFound() {
  useTheme();
  return (
    <section className="nf">
      <div>
        <BrandLogo size="large" />
        <span className="eb">404</span><h2>Page not found</h2>
        <p className="sub">This page does not exist. Head back to the studio to browse designs or start a team order.</p>
        <Button href={import.meta.env.BASE_URL} data-testid="link-404-home">My Jersey home</Button>
      </div>
    </section>
  );
}
