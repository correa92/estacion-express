import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { db } from "../../fbConfig";
import PulseLoader from "react-spinners/PulseLoader";

export default function FormEditUser() {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#1976d2",
  };

  const roles = {
    rol1: "administrador",
    rol2: "moderador",
  };
  const [user, setUser] = useState({});
  const { idUser } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [rolNewAdmin, setRolNewAdmin] = useState("");
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState(false);

  const handleChangeSwitch = (event) => {
    setChecked(event.target.checked);
    console.log(checked);
  };

  const handleChangeSelect = (e) => {
    setRolNewAdmin(e.target.value);
    setUser({ ...user, rol: e.target.value });
  };

  const handleNotistack = (message, variant) => {
    // default | error | success | warning | info
    return enqueueSnackbar(message, { variant });
  };

  const handleChange = ({ target: { name, value } }) => {
    const nextData = { ...user.info, [name]: value };
    const nextInfo = { ...user, info: nextData };
    setUser(nextInfo);
  };

  useEffect(() => {
    const docRef = doc(db, "administradores", idUser);

    const getDocument = async () => {
      await getDoc(docRef)
        .then((res) => {
          const resp = res.data();
          setUser(resp);
          setRolNewAdmin(resp.rol);
          setChecked(resp.active);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    getDocument();
  }, [idUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const objeto = {
      email: user.email.trim(),
      uid: user.uid.trim(),
      rol: user.rol.trim(),
      active: checked,
      info: {
        name: user.info.name.trim(),
        lastName: user.info.lastName.trim(),
        movil: user.info.movil.trim(),
        avatar: "",
      },
    };

    const docRef = doc(db, "administradores", user.uid);
    await updateDoc(docRef, objeto)
      .then(() => {
        handleNotistack("Datos actualizados correctamente!", "success");
        navigate("/admin/administrators");
      })
      .catch(() => {
        handleNotistack("Error al actualizar los datos", "error");
      });
  };

  return (
    <>
      {loading ? (
        <Container
          sx={{
            display: "grid",
            placeContent: "center",
            height: "90vh"
          }}
        >
          <PulseLoader
            color="#1976d2"
            loading={loading}
            cssOverride={override}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Container>
      ) : (
        <Box
          onSubmit={handleSubmit}
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
            bgcolor: "#fff",
            borderRadius: ".5rem",
            maxWidth:'30rem'
          }}
          data-aos="fade-right"
     data-aos-easing="linear"

        >
          <Stack spacing="1.5rem">
            <FormControlLabel
              control={
                <Switch
                  checked={checked}
                  onChange={handleChangeSwitch}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label={checked ? "ACTIVO" : "INACTIVO"}
              sx={{ display: "flex", justifyContent: "center" }}
            />

            <TextField
              id="email"
              label="Email"
              name="email"
              type="text"
              value={user.email}
              disabled={true}
              onChange={handleChange}
            />

            <TextField
              id="name"
              label="Nombre"
              name="name"
              type="text"
              value={user.info.name}
              required={true}
              onChange={handleChange}
            />

            <TextField
              id="lastName"
              label="Apellido"
              name="lastName"
              type="text"
              value={user.info.lastName}
              required={true}
              onChange={handleChange}
            />
            <TextField
              id="movil"
              label="Móvil"
              name="movil"
              type="number"
              value={user.info.movil}
              required={true}
              onChange={handleChange}
            />

            <FormControl fullWidth required={true}>
              <InputLabel id="select">Roles</InputLabel>
              <Select
                labelId="select"
                id="select2"
                value={rolNewAdmin}
                label="select"
                onChange={handleChangeSelect}
              >
                <MenuItem value={roles.rol1}>Administrador</MenuItem>
                <MenuItem value={roles.rol2}>Moderador</MenuItem>
              </Select>
            </FormControl>

            <Button variant="contained" type="submit">
              Guardar
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/admin/administrators")}
            >
              Volver
            </Button>
          </Stack>
        </Box>
      )}
    </>
  );
}