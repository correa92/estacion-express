import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import { auth, db } from "../../fbConfig";
import { useSnackbar } from "notistack";
import { doc, setDoc } from "firebase/firestore";
import dayjs from "dayjs";

export default function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const roles = {
    rol1: "administrador",
    rol2: "moderador",
  };

  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [errorMessage, setErrorMessage] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [error, setError] = useState(false);
  const [disablePassword2, setDisablePassword2] = useState(true);

  //variables de admin/moderador
  const [rolNewAdmin, setRolNewAdmin] = useState(roles.rol2);

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });

    if (name === "password" && value !== "") {
      setDisablePassword2(false);
    }
  };

  const handleChangeSelect = (e) => {
    setRolNewAdmin(e.target.value);
  };

  const handleNotistack = (message, variant) => {
    // default | error | success | warning | info
    enqueueSnackbar(message, { variant });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const objeto = {
      email: "",
      uid: "",
      rol: "",
      registeredTime: dayjs().format("DD/MM/YYYY"),
      active: true,
      info: {
        name: "",
        lastName: "",
        movil: "",
        avatar: "",
      },
    };
    if (user.email && user.password === user.password2 && rolNewAdmin) {
      try {
        const uid = await signUp(user.email, user.email);
        handleNotistack("Se registró correctamente", "success");

        objeto.uid = uid.user.uid;
        objeto.rol = rolNewAdmin;
        objeto.email = user.email;

        await sendEmailVerification(auth.currentUser);
        handleNotistack("Se envio el email de verificación", "success");

        await setDoc(doc(db, "administradores", uid.user.uid), objeto);

        handleNotistack("Se creó DB correctamente", "success");

        navigate("/admin/administrators");
      } catch (err) {
        if (
          err.code === "auth/invalid-email" ||
          err.code === "auth/missing-email"
        ) {
          setErrorMessage("Ingrese un email válido");
          setError(true);
          setErrorEmail(true);
        } else if (err.code === "auth/email-already-in-use") {
          setErrorMessage("El email ya está en uso");
          setError(true);
          setErrorEmail(true);
        } else if (
          err.code === "auth/weak-password" ||
          err.code === "auth/internal-error"
        ) {
          setErrorPassword(true);
          setErrorMessage("La contraseña debe tener al menos 6 caracteres!");
        } else {
          handleNotistack(`${err.code}`, "error");
        }
      }
    } else if (!user.email) {
      setErrorEmail(true);
      setError(true);
      setErrorMessage("Por favor complete los campos!");
    } else if (user.password !== user.password2) {
      setErrorPassword(true);
      setError(true);
      setErrorMessage("Las contraseñas no coinciden!");
    } else {
      setError(false);
    }
  };

  return (
    <Box
      sx={{
        display: "grid",
        placeContent: "center",
        height: "80vh",
        background: "#fff",
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
            error={errorEmail}
          />
          <TextField
            id="password"
            label="Contraseña"
            name="password"
            type="password"
            required={true}
            onChange={handleChange}
            error={errorPassword}
          />
          <TextField
            id="password2"
            label="Repita Contraseña"
            name="password2"
            type="password"
            required={true}
            onChange={handleChange}
            error={errorPassword}
            disabled={disablePassword2}
          />

          <FormControl fullWidth required={true}>
            <InputLabel id="select">Roles</InputLabel>
            <Select
              labelId="select"
              id="select2"
              value={rolNewAdmin}
              label="Age"
              onChange={handleChangeSelect}
            >
              <MenuItem value={roles.rol1}>Administrador</MenuItem>
              <MenuItem value={roles.rol2}>Moderador</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" type="submit">
            Registrar
          </Button>
          <Button variant="contained" onClick={() => navigate("/login")}>
            Volver a login
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
