import { Button } from '@workspace/my-jersey-design/components/ui/button';

export default function NotFound() {
  return (
    <section style={{ minHeight: '100dvh', display: 'grid', placeItems: 'center', textAlign: 'center' }}>
      <div><span className="eb">404</span><h2>Page not found</h2><p className="sub" style={{ margin: '12px auto 24px' }}>This page does not exist.</p><Button href={import.meta.env.BASE_URL}>My Jersey home</Button></div>
    </section>
  );
}
