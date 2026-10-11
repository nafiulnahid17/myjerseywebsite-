import { BrandLogo, BrandMark } from '../../components/ui/brand-logo';
import { Row } from '../parts';

export default function BrandLogoDemo() {
  return <div className="space-y-8">
    <Row label="Full lockup · small / default / large">
      <BrandLogo size="small" /><BrandLogo /><BrandLogo size="large" />
    </Row>
    <Row label="Without tagline · mark only · wordmark only">
      <BrandLogo tagline={false} /><BrandLogo variant="mark" size="large" /><BrandLogo variant="word" />
    </Row>
    <Row label="On the navy band surface">
      <div className="rounded-xl p-6" style={{ background: 'var(--band)', color: 'var(--band-tx)' }}>
        <BrandLogo size="large" style={{ color: 'var(--band-tx)' }} />
      </div>
    </Row>
    <Row label="Standalone crest (decorative)">
      <BrandMark className="h-16 w-16" /><BrandMark className="h-10 w-10" /><BrandMark className="h-6 w-6" />
    </Row>
    <p className="text-sm text-muted-foreground">Original scalable SVG crest and live-text wordmark. Navy field and gold monogram read on both white and midnight surfaces. Replaces the retired green raster logo in every rendered surface; the favicon is generated from the same geometry.</p>
  </div>;
}
