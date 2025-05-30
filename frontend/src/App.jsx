import DashboardLayout from './components/Dashboard/DashboardLayout';
import DashboarLibraire from './pages/DashboarLibraire'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Libraire/Dashboard';
import Students from './pages/Libraire/Students';
import Categories from './pages/Libraire/Categories';
import Loan from './pages/Libraire/LoanRequests';
import ActiveLoans from './pages/Libraire/ActiveLoans';
import BookManagement from './pages/Libraire/BookManagement';
import Reservations from './pages/Libraire/Reservations';
import Analytics from './pages/Libraire/Analytics';

function App() {

  return (
    
      // <DashboarLibraire/>
    <Router>
    <DashboardLayout>
    <Routes>
    <Route path='/' element={<Dashboard/>} />
    <Route path='/students' element={<Students/>} />
    <Route path='/categories' element={<Categories />} />
    <Route path='/loans' element={<Loan />} />
    <Route path='/books' element={<BookManagement />} />
    <Route path='/activeloans' element={<ActiveLoans />} />
    <Route path='/reservations' element={<Reservations />} />
    <Route path='/analytics' element={<Analytics />} />
    </Routes>
    </DashboardLayout>
    </Router>
    
  )
}

export default App
