import InventoryListing from './pages/InventoryListing.js';
import UserAccess from './components/UserAccess.js';
import './App.scss';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <UserAccess />
      </header>
      <InventoryListing />
    </div>
  );
}

export default App;
