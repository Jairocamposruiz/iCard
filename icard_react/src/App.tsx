import { ToastContainer } from "react-toastify";

import { Navigation } from "./routes";
import { AuthProvider } from "./context";

const App = () => {
  return (
    <AuthProvider>
      <Navigation />
      <ToastContainer // Esto es para poder mostrar errores al usuario es como sweetalert
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </AuthProvider>
  );
};

export default App;
