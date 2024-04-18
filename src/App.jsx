import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CityList from "./component/CityList";
import Country from "./component/Country";
import City from "./component/City";
import Form from "./component/Form";
import ProtectedRouter from "./component/ProtectedRouter";
import { CitiesProvider } from "./context/CitiesContext";
import { AutProvider } from "./context/UserContext";
export default function App() {
  return (
    <AutProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            <Route
              path="app"
              element={
                <ProtectedRouter>
                  <AppLayout />
                </ProtectedRouter>
              }
            >
              <Route index element={<CityList />} />
              <Route path="cites" element={<CityList />} />
              <Route path="cites/:id" element={<City />} />
              <Route path="countries" element={<Country />} />
              <Route path="form" element={<Form />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AutProvider>
  );
}
