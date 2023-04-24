import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Button, Stack } from "@mui/material";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const { enqueueSnackbar } = useSnackbar();

  const handleNotistack = (message, variant) => {
    // default | error | success | warning | info
    enqueueSnackbar(message, { variant });
  };

  const handleResetPassword = () => {
    navigate("/reset-password");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(user.email, user.password)
      .then(() => {
        handleNotistack("Inicio sesión correctamente", "success");
        navigate("/admin");
      })
      .catch((err) => {
        if (
          err.code === "auth/invalid-email" ||
          err.code === "auth/missing-email"
        ) {
          setErrorMessage("Ingrese un email válido");
          setError(true);
        } else if (err.code === "auth/email-already-in-use") {
          setErrorMessage("El email ya está en uso");
          setError(true);
        } else if (
          err.code === "auth/weak-password" ||
          err.code === "auth/internal-error"
        ) {
          setError(true);
          setErrorMessage("La contraseña debe tener al menos 6 caracteres");
        } else if (err.code === "auth/user-not-found") {
          setErrorMessage("EL email no se encuentra registrado");
          setError(true);
        } else if (err.code === "auth/wrong-password") {
          setError(true);
          setErrorMessage("La contraseña es incorrecta");
        } else if (err.code === "auth/too-many-requests") {
          setError(true);
          setErrorMessage(
            "El acceso a esta cuenta se ha inhabilitado temporalmente debido a muchos intentos fallidos de inicio de sesión. Puede restaurarlo inmediatamente restableciendo su contraseña o puede volver a intentarlo más tarde."
          );
        } else {
          console.log(err);
        }
      });
  };

  return (
    <>
      <Box
        sx={{
          display: "grid",
          placeContent: "center",
          height: "100vh",
          background: "#eee",
        }}
      >
        <Box
          onSubmit={handleSubmit}
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "35ch" },

            bgcolor: "#fff",
            borderRadius: ".5rem",
            padding: "1.5rem",
          }}
          noValidate
          autoComplete="off"
        >
          <Stack spacing="1.5rem">
            {error && (
              <Alert severity="error" variant="filled">
                {errorMessage}
              </Alert>
            )}
            <TextField
              id="email"
              label="Email"
              name="email"
              type="email"
              required={true}
              onChange={handleChange}
              error={error}
            />
            <TextField
              id="password"
              label="Contraseña"
              name="password"
              type="password"
              required={true}
              onChange={handleChange}
              error={error}
            />
            <Link
              style={{ textDecoration: "none", textAlign: "center" }}
              to="/reset-password"
              onClick={handleResetPassword}
            >
              ¿Olvidaste tu contraseña?
            </Link>
            <Button variant="contained" type="submit">
              entrar
            </Button>
            {/* <Button
              onClick={handleGoogleSignin}
              variant="contained"
              startIcon={<GoogleIcon />}
            >
              Iniciar sesión con Google
            </Button> */}
            {/* <Button
              onClick={() => {
                navigate("/register");
              }}
              variant="contained"
            >
              Registrarse
            </Button> */}
          </Stack>
        </Box>
      </Box>
    </>
  );
}