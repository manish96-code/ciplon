import { router, usePage } from '@inertiajs/react';
import PublicLayout from '../../layouts/PublicLayout';
import HeroSection from '../../components/home/HeroSection';
import FeaturedProducts from '../../components/home/FeaturedProducts';
import TherapeuticAreas from '../../components/home/TherapeuticAreas';
import QualitySection from '../../components/home/QualitySection';
import ResearchSection from '../../components/home/ResearchSection';
import EditorialBanner from '../../components/home/EditorialBanner';
import NewsPreview from '../../components/home/NewsPreview';
import CTASection from '../../components/home/CTASection';
import { therapeuticAreas as defaultAreas } from '../../data/therapeuticAreasData';
import { latestNews as defaultNews } from '../../data/newsData';

export default function HomePage({ featuredProducts = [], categories = [], company = null }) {
  const { props } = usePage();
  const companyData = company || props.company || {};
  const products = featuredProducts.length > 0 ? featuredProducts : [];
  const therapeuticAreas = defaultAreas;
  const news = defaultNews;

  // Smooth scroll helper to products catalog
  const handleScrollToProducts = () => {
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Smooth scroll helper to contact section
  const handleScrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Navigate to products catalog filtered by selected therapeutic area
  const handleSelectArea = (area) => {
    if (area?.name) {
      router.get(`/products?category=${encodeURIComponent(area.name)}`);
    } else {
      router.get('/products');
    }
  };

  return (
    <PublicLayout companyData={companyData} categories={categories}>
      <div className="w-full">
        <HeroSection
          onExploreProducts={handleScrollToProducts}
          onContactUs={handleScrollToContact}
        />

        <FeaturedProducts products={products} />

        <TherapeuticAreas
          areas={therapeuticAreas}
          onSelectArea={handleSelectArea}
        />

        <QualitySection onContactUs={handleScrollToContact} />

        <ResearchSection onContactUs={handleScrollToContact} />

        <EditorialBanner onContactUs={handleScrollToContact} />

        <NewsPreview
          news={news}
          onReadNews={handleScrollToContact}
        />

        <CTASection />
      </div>
    </PublicLayout>
  );
}
