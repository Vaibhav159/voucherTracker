import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Cards from './pages/Cards';
import Vouchers from './pages/Vouchers';
import Banking from './pages/Banking';
import Guides from './pages/Guides';
import AskAI from './pages/AskAI';
import Calculator from './pages/Calculator';
import PointsTransfer from './pages/PointsTransfer';
import Favourites from './pages/Favourites';
import MyCards from './pages/MyCards';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import About from './pages/About';
import Signup from './pages/Signup';
import MilestoneTracker from './pages/MilestoneTracker';
import LoungeAccess from './pages/LoungeAccess';
import MCC from './pages/MCC';
import WhereToSwipe from './pages/WhereToSwipe';
import CompareCards from './pages/CompareCards';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/cards"
        element={
          <Layout showSidebar={false}>
            <Cards />
          </Layout>
        }
      />
      <Route
        path="/vouchers"
        element={
          <Layout showSidebar={false}>
            <Vouchers />
          </Layout>
        }
      />
      <Route
        path="/banking"
        element={
          <Layout showSidebar={false}>
            <Banking />
          </Layout>
        }
      />
      <Route
        path="/guides"
        element={
          <Layout>
            <Guides />
          </Layout>
        }
      />
      <Route
        path="/ask-ai"
        element={
          <Layout>
            <AskAI />
          </Layout>
        }
      />
      <Route
        path="/calculator"
        element={
          <Layout>
            <Calculator />
          </Layout>
        }
      />
      <Route
        path="/points-transfer"
        element={
          <Layout>
            <PointsTransfer />
          </Layout>
        }
      />
      <Route
        path="/favourites"
        element={
          <Layout>
            <Favourites />
          </Layout>
        }
      />
      <Route
        path="/my-cards"
        element={
          <Layout>
            <MyCards />
          </Layout>
        }
      />
      <Route
        path="/milestone-tracker"
        element={
          <Layout>
            <MilestoneTracker />
          </Layout>
        }
      />
      <Route
        path="/lounge-access"
        element={
          <Layout>
            <LoungeAccess />
          </Layout>
        }
      />
      <Route
        path="/mcc"
        element={
          <Layout>
            <MCC />
          </Layout>
        }
      />
      <Route
        path="/where-to-swipe"
        element={
          <Layout>
            <WhereToSwipe />
          </Layout>
        }
      />
      <Route
        path="/compare-cards"
        element={
          <Layout showSidebar={false}>
            <CompareCards />
          </Layout>
        }
      />
      <Route
        path="/privacy"
        element={
          <Layout>
            <Privacy />
          </Layout>
        }
      />
      <Route
        path="/terms"
        element={
          <Layout>
            <Terms />
          </Layout>
        }
      />
      <Route
        path="/contact"
        element={
          <Layout>
            <Contact />
          </Layout>
        }
      />
      <Route
        path="/about"
        element={
          <Layout>
            <About />
          </Layout>
        }
      />
      <Route
        path="/signup"
        element={
          <Layout showSidebar={false}>
            <Signup />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
