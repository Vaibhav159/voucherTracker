import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Vouchers from './pages/Vouchers';
import Cards from './pages/Cards';
import Banking from './pages/Banking';
import Guides from './pages/Guides';
import EffectivePriceCalculator from './pages/tools/EffectivePriceCalculator';
import MCCFinder from './pages/tools/MCCFinder';
import MilestoneTracker from './pages/tools/MilestoneTracker';
import WhereToSwipe from './pages/tools/WhereToSwipe';
import PerkAI from './pages/tools/PerkAI';
import LoungeAccess from './pages/tools/LoungeAccess';
import PointsTransfer from './pages/tools/PointsTransfer';
import CardDetails from './pages/CardDetails';
import BankingDetails from './pages/BankingDetails';
import MyCards from './pages/user/MyCards';
import Favorites from './pages/user/Favorites';
import CompareCards from './pages/user/CompareCards';
import CompareBanks from './pages/user/CompareBanks';
import Settings from './pages/user/Settings';
import Signup from './pages/user/Signup';
import AboutUs from './pages/legal/AboutUs';
import GetInTouch from './pages/legal/GetInTouch';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsOfService from './pages/legal/TermsOfService';

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {/* Detail pages - MUST come before param routes */}
            <Route path="cards/:id" element={<CardDetails />} />
            <Route path="banking/:id" element={<BankingDetails />} />
            {/* Filter pages with optional category/filter params */}
            <Route path="vouchers/:category?" element={<Vouchers />} />
            <Route path="cards" element={<Cards />} />
            <Route path="banking" element={<Banking />} />
            <Route path="guides/:category?" element={<Guides />} />
            {/* Tool pages with shareable state */}
            <Route path="tools/effective-price/:amount?" element={<EffectivePriceCalculator />} />
            <Route path="tools/mcc/:query?" element={<MCCFinder />} />
            <Route path="tools/milestones/:cardId?" element={<MilestoneTracker />} />
            <Route path="tools/swipe/:category?/:amount?" element={<WhereToSwipe />} />
            <Route path="tools/perk-ai" element={<PerkAI />} />
            <Route path="tools/lounge/:mode?/:selection?" element={<LoungeAccess />} />
            <Route path="tools/points-transfer/:fromBank?/:toPartner?" element={<PointsTransfer />} />
            {/* User pages */}
            <Route path="my-cards" element={<MyCards />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="compare/:card1?/:card2?" element={<CompareCards />} />
            <Route path="compare-banks/:bank1?/:bank2?" element={<CompareBanks />} />
            <Route path="settings" element={<Settings />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="contact" element={<GetInTouch />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}

export default App;








