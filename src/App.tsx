import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminTable from './components/AdminTable';
import {MainLayout} from "./components/layout";

function App() {
  return (
    <Router>
      <div>
        {/*<Header />*/}
        <MainLayout>
        {/*<AppContainer>*/}
          <Routes>
            <Route path="/" element={<AdminTable />} />
          </Routes>
        {/*</AppContainer>*/}
          </MainLayout>
          {/*<Footer />*/}
      </div>
    </Router>
  );
}

export default App;
