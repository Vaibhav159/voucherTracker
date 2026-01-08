import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import MyCards from './pages/user/MyCards';
import Favorites from './pages/user/Favorites';
import CompareCards from './pages/user/CompareCards';
import Signup from './pages/user/Signup';
import AboutUs from './pages/legal/AboutUs';
import GetInTouch from './pages/legal/GetInTouch';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsOfService from './pages/legal/TermsOfService';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="vouchers" element={<Vouchers />} />
          <Route path="cards" element={<Cards />} />
          <Route path="banking" element={<Banking />} />
          <Route path="guides" element={<Guides />} />
          <Route path="tools/effective-price" element={<EffectivePriceCalculator />} />
          <Route path="tools/mcc" element={<MCCFinder />} />
          <Route path="tools/milestones" element={<MilestoneTracker />} />
          <Route path="tools/swipe" element={<WhereToSwipe />} />
          <Route path="tools/perk-ai" element={<PerkAI />} />
          <Route path="tools/lounge" element={<LoungeAccess />} />
          <Route path="tools/points-transfer" element={<PointsTransfer />} />
          <Route path="my-cards" element={<MyCards />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="compare" element={<CompareCards />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<GetInTouch />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
      </Routes>
    </Router>
  );
}

export default App;








