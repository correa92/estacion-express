import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Button, Stack} from "@mui/material";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [user, setUser] = useState({
    email: "",
  });

  const [errorEmailMessage, setEmailMessage] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);

  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleResetPassword = () => {
    if (!user.email) return setEmailMessage("Ingrese un email válido");

    resetPassword(user.email)
      .then(() => {
        alert("Se envio correctamente");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.code);
        if (err.code === ("auth/invalid-email" || "auth/missing-email")) {
          setEmailMessage("Ingrese un email válido");
          setErrorEmail(true);
        } else if (err.code === "auth/email-already-in-use") {
          setEmailMessage("El email ya está en uso");
          setErrorEmail(true);
        } else if (err.code === "auth/user-not-found") {
          setEmailMessage("El email no se encuentra registrado");
          setErrorEmail(true);
        } else {
          console.log(err);
        }
      });
  };

  return (
    <><Box
    sx={{
      display: "grid",
      placeContent: "center",
      height: "100%",
      background: "#fff",
    }}
  >
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "35ch" },
          bgcolor: "#fff",
          borderRadius: ".5rem",
          padding:'1.5rem'
        }}
        noValidate
        autoComplete="off"
      >
        <Stack spacing="1.5rem">
          {errorEmail && (
            <Alert severity="error" variant="filled">
              {errorEmailMessage}
            </Alert>
          )}
          <Alert severity="info" variant="filled">
              Ingresa tu correo electrónico y te enviaremos un código para
              restablecerla.
            </Alert>
          <TextField
            id="email"
            label="Email"
            name="email"
            type="email"
            required={true}
            onChange={handleChange}
            error={errorEmail}
          />

          <Button variant="contained" onClick={handleResetPassword}>
            Enviar
          </Button>
          <Button variant="contained" onClick={()=>navigate('/login')}>
            Volver a login
          </Button>
        </Stack>
      </Box>
      </Box>
    </>
  );
}