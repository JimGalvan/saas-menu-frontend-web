import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppContainer from './components/AppContainer';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import AdminTable from './components/AdminTable';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <AppContainer>
          <Routes>
            <Route path="/" element={<AdminTable />} />
          </Routes>
        </AppContainer>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
