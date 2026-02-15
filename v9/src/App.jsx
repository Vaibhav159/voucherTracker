import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { FavoritesProvider } from './context/FavoritesContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Vouchers from './pages/Vouchers';
import Cards from './pages/Cards';
import CardDetails from './pages/CardDetails';
import CompareCards from './pages/CompareCards';
import Banking from './pages/Banking';
import CompareBanking from './pages/CompareBanking';
import Guides from './pages/Guides';
import GuideDetails from './pages/GuideDetails';
import BankingDetails from './pages/BankingDetails';
import EffectivePriceCalculator from './pages/tools/EffectivePriceCalculator';
import WhereToSwipe from './pages/tools/WhereToSwipe';
import MilestoneTracker from './pages/tools/MilestoneTracker';
import LoungeAccess from './pages/tools/LoungeAccess';
import MCCFinder from './pages/tools/MCCFinder';
import PerkAI from './pages/tools/PerkAI';
import PointsTransfer from './pages/tools/PointsTransfer';
import Tools from './pages/Tools';
import MyCards from './pages/user/MyCards';
import Favorites from './pages/user/Favorites';
import SignUp from './pages/auth/SignUp';
import Profile from './pages/user/Profile';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsOfService from './pages/legal/TermsOfService';
import AboutUs from './pages/legal/AboutUs';
import Contact from './pages/legal/Contact';
import './index.css';

// Placeholder for settings until implemented completely or merged with Profile
const SettingsPlaceholder = ({ title }) => <PlaceholderPage title={title} />;

function App() {
  return (
    <FavoritesProvider>
      <HelmetProvider>
        <ThemeProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/vouchers" element={<Vouchers />} />
                <Route path="/cards" element={<Cards />} />
                <Route path="/cards/compare" element={<CompareCards />} />
                <Route path="/cards/:id" element={<CardDetails />} />
                <Route path="/banking" element={<Banking />} />
                <Route path="/banking/:id" element={<BankingDetails />} />
                <Route path="/banking/compare" element={<CompareBanking />} />
                <Route path="/banking/compare/:bank1/:bank2" element={<CompareBanking />} />
                <Route path="/perk-ai" element={<PerkAI />} />
                <Route path="/guides" element={<Guides />} />
                <Route path="/guides/:id" element={<GuideDetails />} />
                <Route path="/tools/effective-price" element={<EffectivePriceCalculator />} />
                <Route path="/tools/swipe" element={<WhereToSwipe />} />
                <Route path="/tools/swipe/:category" element={<WhereToSwipe />} />
                <Route path="/tools/swipe/:category/:amount" element={<WhereToSwipe />} />
                <Route path="/tools/milestone" element={<MilestoneTracker />} />
                <Route path="/tools/lounge" element={<LoungeAccess />} />
                <Route path="/tools/lounge/:mode" element={<LoungeAccess />} />
                <Route path="/tools/lounge/:mode/:selection" element={<LoungeAccess />} />
                <Route path="/tools/mcc" element={<MCCFinder />} />
                <Route path="/tools/mcc" element={<MCCFinder />} />
                <Route path="/tools/mcc/:query" element={<MCCFinder />} />
                <Route path="/tools/transfer" element={<PointsTransfer />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/my-cards" element={<MyCards />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/settings" element={<SettingsPlaceholder />} />
                <Route path="*" element={<PlaceholderPage title="Under Construction" />} />
              </Routes>
            </Layout>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </FavoritesProvider>
  );
}

// Temporary placeholder for pages not yet implemented
function PlaceholderPage({ title }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div
        className="text-center p-12 rounded-xl"
        style={{
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
        }}
      >
        <h1
          className="text-3xl font-serif font-bold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          This page is coming soon. Check back later!
        </p>
      </div>
    </div>
  );
}

export default App;
