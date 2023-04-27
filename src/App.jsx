import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/authContext";
import AdminContainer from "./components/AdminContainer/AdminContainer";
import AdministratorsContainer from "./components/AdministratorsContainer/AdministratorsContainer";
import Register from "./components/Register/Register";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Login from "./components/Login/Login";
import FormEditUser from "./components/FormEditUser/FormEditUser";
import { SnackbarProvider } from "notistack";
import InfoContainer from "./components/InfoContainer/InfoContainer";
import FormEditInfo from "./components/FormEditInfo/FormEditInfo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Home from "./components/Home/Home";
import ProductsContainer from "./components/ProductsContainer/ProductsContainer";
import NewProduct from "./components/NewProduct/NewProduct";
import FormEditProduct from "./components/FormEditProduct/FormEditProduct";
import Aos from "aos";
function App() {
  Aos.init();
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AuthProvider>
          <SnackbarProvider maxSnack={5} autoHideDuration={5000}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/admin" element={<AdminContainer />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route
                  path="/admin/products"
                  element={
                    <AdminContainer>
                      <ProductsContainer />
                    </AdminContainer>
                  }
                ></Route>
                <Route
                  path="/admin/products/new_product"
                  element={
                    <AdminContainer>
                      <NewProduct />
                    </AdminContainer>
                  }
                ></Route>
                <Route
                  path="/admin/products/product_edit/:idProduct"
                  element={
                    <AdminContainer>
                      <FormEditProduct />
                    </AdminContainer>
                  }
                ></Route>
                <Route
                  path="/admin/administrators"
                  element={
                    <AdminContainer>
                      <AdministratorsContainer />
                    </AdminContainer>
                  }
                ></Route>
                
                <Route
                  path="/admin/administrators/user_edit/:idUser"
                  element={
                    <AdminContainer>
                      <FormEditUser />
                    </AdminContainer>
                  }
                ></Route>
                <Route
                  path="/admin/establishment"
                  element={
                    <AdminContainer>
                      <InfoContainer />
                    </AdminContainer>
                  }
                ></Route>
                <Route
                  path="/admin/establishment_edit"
                  element={
                    <AdminContainer>
                      <FormEditInfo />
                    </AdminContainer>
                  }
                ></Route>
                <Route
                  path="/register"
                  element={
                    <AdminContainer>
                      <Register />
                    </AdminContainer>
                  }
                ></Route>
                <Route
                  path="/reset-password"
                  element={
                    <AdminContainer>
                      <ResetPassword />
                    </AdminContainer>
                  }
                ></Route>

                <Route path="*" element={<h1>404 Not Found ;(</h1>} />
              </Routes>
            </BrowserRouter>
          </SnackbarProvider>
        </AuthProvider>
      </LocalizationProvider>
    </>
  );
}

export default App;
