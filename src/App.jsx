import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

const Homepage = lazy(() => import("./pages/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy("./pages/AppLayout");
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

import CityList from "./component/CityList";
import Country from "./component/Country";
import City from "./component/City";
import Form from "./component/Form";
import SpinnerFullPage from "./component/SpinnerFullPage";
import ProtectedRouter from "./component/ProtectedRouter";

import { CitiesProvider } from "./context/CitiesContext";
import { AutProvider } from "./context/UserContext";
export default function App() {
  return (
    <AutProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
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
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AutProvider>
  );
}
