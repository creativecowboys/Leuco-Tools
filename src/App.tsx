import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import { CartProvider } from './context/CartContext';
import ProductPage from './pages/ProductPage';
import Home from './pages/Home';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Collections
import ToolsHub from './pages/ToolsHub';
import HighlineXP from './pages/collections/HighlineXP';
import CircularSaws from './pages/collections/CircularSaws';
import CutterHeads from './pages/collections/CutterHeads';
import Spirals from './pages/collections/Spirals';
import KnivesInserts from './pages/collections/KnivesInserts';
import ClampingSystems from './pages/collections/ClampingSystems';
import PartsAccessories from './pages/collections/PartsAccessories';

// Services
import ServicesHub from './pages/services/ServicesHub';
import SharpeningServices from './pages/services/SharpeningServices';
import ResharpeningFAQ from './pages/services/ResharpeningFAQ';
import CarbideSawTips from './pages/services/CarbideSawTips';
import SawBladeSharpening from './pages/services/SawBladeSharpening';
import ToolSharpening from './pages/services/ToolSharpening';
import Engineering from './pages/services/Engineering';
import CustomTooling from './pages/services/CustomTooling';

// Solutions / Blog
import SolutionsHub from './pages/solutions/SolutionsHub';
import ToolingInnovations from './pages/solutions/ToolingInnovations';
import MaterialsSolutions from './pages/solutions/MaterialsSolutions';
import ToolingSolutions from './pages/solutions/ToolingSolutions';

// Company
import About from './pages/company/About';
import Catalogs from './pages/company/Catalogs';
import News from './pages/company/News';
import Careers from './pages/company/Careers';

// Locations
import Georgia from './pages/locations/Georgia';
import Mississippi from './pages/locations/Mississippi';
import Michigan from './pages/locations/Michigan';
import California from './pages/locations/California';
import Indiana from './pages/locations/Indiana';
import Canada from './pages/locations/Canada';

// Utility
import Contact from './pages/Contact';
import SearchPage from './pages/Search';
import Safety from './pages/Safety';
import TermsOfUse from './pages/TermsOfUse';
import PrivacyPolicy from './pages/PrivacyPolicy';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* Tools */}
            <Route path="/pages/tools" element={<ToolsHub />} />
            <Route path="/collections/highlinexp-industrial-series" element={<HighlineXP />} />
            <Route path="/collections/circular-saw-blades" element={<CircularSaws />} />
            <Route path="/collections/cutter-heads" element={<CutterHeads />} />
            <Route path="/collections/spiral-tools" element={<Spirals />} />
            <Route path="/collections/knives-and-inserts" element={<KnivesInserts />} />
            <Route path="/collections/clamping-systems" element={<ClampingSystems />} />
            <Route path="/collections/parts-and-accessories" element={<PartsAccessories />} />

            {/* Services */}
            <Route path="/pages/services" element={<ServicesHub />} />
            <Route path="/pages/sharpening-services" element={<SharpeningServices />} />
            <Route path="/pages/tool-resharpening-faq" element={<ResharpeningFAQ />} />
            <Route path="/pages/carbide-saw-sharpening-tips-tricks" element={<CarbideSawTips />} />
            <Route path="/pages/saw-blade-sharpening" element={<SawBladeSharpening />} />
            <Route path="/pages/tool-sharpening" element={<ToolSharpening />} />
            <Route path="/pages/leuco-engineering" element={<Engineering />} />
            <Route path="/pages/custom-tooling" element={<CustomTooling />} />

            {/* Solutions */}
            <Route path="/blogs/leuco-solutions" element={<SolutionsHub />} />
            <Route path="/blogs/leuco-solutions/leuco-tooling-innovations" element={<ToolingInnovations />} />
            <Route path="/blogs/leuco-solutions/leuco-materials-solutions" element={<MaterialsSolutions />} />
            <Route path="/blogs/leuco-solutions/leuco-tooling-solutions" element={<ToolingSolutions />} />

            {/* Company */}
            <Route path="/pages/about-leuco" element={<About />} />
            <Route path="/pages/catalogs" element={<Catalogs />} />
            <Route path="/blogs/leuco-news" element={<News />} />
            <Route path="/pages/leuco-careers" element={<Careers />} />

            {/* Locations */}
            <Route path="/pages/georgia" element={<Georgia />} />
            <Route path="/pages/mississippi" element={<Mississippi />} />
            <Route path="/pages/michigan" element={<Michigan />} />
            <Route path="/pages/california" element={<California />} />
            <Route path="/pages/indiana" element={<Indiana />} />
            <Route path="/pages/canada" element={<Canada />} />

            {/* Products */}
            <Route path="/products/:handle" element={<ProductPage />} />

            {/* Utility */}
            <Route path="/pages/contact-leuco" element={<Contact />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/pages/safety" element={<Safety />} />
            <Route path="/pages/terms-of-use" element={<TermsOfUse />} />
            <Route path="/pages/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
}
