import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import ProductsContainer from "./components/ProductsContainer/ProductsContainer";
import NewProduct from "./components/NewProduct/NewProduct";
import FormEditProduct from "./components/FormEditProduct/FormEditProduct";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Aos from "aos";
import Main from "./components/Main/Main";

function App() {
  Aos.init();

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AuthProvider>
          <SnackbarProvider maxSnack={5} autoHideDuration={5000}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Main />}></Route>

                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminContainer />
                    </ProtectedRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/admin/products"
                  element={
                    <ProtectedRoute>
                      <AdminContainer>
                        <ProductsContainer />
                      </AdminContainer>
                    </ProtectedRoute>
                  }
                ></Route>
                <Route
                  path="/admin/products/new_product"
                  element={
                    <ProtectedRoute>
                      <AdminContainer>
                        <NewProduct />
                      </AdminContainer>
                    </ProtectedRoute>
                  }
                ></Route>
                <Route
                  path="/admin/products/product_edit/:idProduct"
                  element={
                    <ProtectedRoute>
                      <AdminContainer>
                        <FormEditProduct />
                      </AdminContainer>
                    </ProtectedRoute>
                  }
                ></Route>
                <Route
                  path="/admin/administrators"
                  element={
                    <ProtectedRoute>
                      <AdminContainer>
                        <AdministratorsContainer />
                      </AdminContainer>
                    </ProtectedRoute>
                  }
                ></Route>

                <Route
                  path="/admin/administrators/user_edit/:idUser"
                  element={
                    <ProtectedRoute>
                      <AdminContainer>
                        <FormEditUser />
                      </AdminContainer>
                    </ProtectedRoute>
                  }
                ></Route>
                <Route
                  path="/admin/establishment"
                  element={
                    <ProtectedRoute>
                      <AdminContainer>
                        <InfoContainer />
                      </AdminContainer>
                    </ProtectedRoute>
                  }
                ></Route>
                <Route
                  path="/admin/establishment_edit"
                  element={
                    <ProtectedRoute>
                      <AdminContainer>
                        <FormEditInfo />
                      </AdminContainer>
                    </ProtectedRoute>
                  }
                ></Route>
                {/* <Route
                  path="/register"
                  element={
                    <AdminContainer>
                      <Register />
                    </AdminContainer>
                  }
                ></Route> */}
                <Route
                  path="/reset-password"
                  element={<ResetPassword />}
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
