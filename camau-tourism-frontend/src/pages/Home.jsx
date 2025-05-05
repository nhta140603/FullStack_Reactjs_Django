import React, {lazy, Suspense} from 'react';
import MainLayout from '../layouts/MainLayout';
import HeroSection from '../components/MainSection';
const FeaturedDestinations = React.memo(React.lazy(() => import('../components/Destinations')));
const TourSuggestions = React.lazy(() => import('../components/TourSuggestions'));
const PersonalTripSection = React.lazy(() => import('../components/PersonalTripSection'));
const BlogSection = React.lazy(() => import('../components/BlogSection'));
const CTASection = React.lazy(() => import('../components/CTASection'));
const FeaturedTours = React.lazy(() => import('../features/tours/FeaturedTours'));

function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <Suspense fallback={null}>
        <FeaturedDestinations />
        <PersonalTripSection />
        <BlogSection />
        <CTASection />
        <FeaturedTours limit={4} showSearch={false}/>
      </Suspense>
    </MainLayout>
  );
}
export default Home;