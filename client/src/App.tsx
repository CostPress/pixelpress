import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Reports from './pages/Reports';
import Signup from './pages/Signup';
import History from './pages/History';
import ProductSelector from './pages/ProductSelector';
import Login from "./pages/Login";
import ProtectedRoute from "./components/layout/ProtectedRoute";


function TicketWrapper() {
  const { productType } = useParams<{ productType: string }>();
  return <Home productType={productType} />;
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected */}
          <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<ProductSelector />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/ticket/:productType" element={<TicketWrapper />} />
          <Route path="/history" element={<History />} />
        </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;