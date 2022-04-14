import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import CarList from './components/CarList/CarList';
import Navbar from './components/Navbar/Navbar';

const queryClient = new QueryClient();

function App() {
  return (
    <div className='App'>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <CarList />
      </QueryClientProvider>
    </div>
  );
}

export default App;
