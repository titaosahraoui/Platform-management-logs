import { RouterProvider } from 'react-router-dom';
import RouterComponent from './Router/Router';
import { Toaster } from 'react-hot-toast';
import toastCustomOptions from './utils/toastCustomOptions';


function App() {
  return (
    <div className="App overflow-x-hidden">
      <RouterProvider router={RouterComponent()} />
      <Toaster toastOptions={toastCustomOptions} position="bottom-center" />
    </div>
  );
}

export default App;
