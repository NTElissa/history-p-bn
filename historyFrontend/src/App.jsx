
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-950 text-slate-100">
          <AppRoutes />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;