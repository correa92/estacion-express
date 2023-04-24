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

function App() {
  return (
    <>
      <AuthProvider>
        <SnackbarProvider maxSnack={5} autoHideDuration={5000}>
          <BrowserRouter>
            <Routes>
              <Route path="/admin" element={<AdminContainer />}></Route>
              <Route path="/login" element={<Login />}></Route>
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
    </>
  );
}

export default App;
