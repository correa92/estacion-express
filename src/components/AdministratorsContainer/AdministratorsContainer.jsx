import { Box, Button, Container } from "@mui/material";
import Administrators from "../Administrators/Administrators";
import { useNavigate } from "react-router-dom";
import { collection, query, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../fbConfig";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { PulseLoader } from "react-spinners";
import Spinner from "../Spinner/Spinner";

export default function AdministratorsContainer() {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#1976d2",
  };
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [empty, setEmpty] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const handleNotistack = (message, variant) => {
    // default | error | success | warning | info
    enqueueSnackbar(message, { variant });
  };

  const deleteUser = async (collection, uid) => {
    try {
      await deleteDoc(doc(db, collection, uid));
      const list = items.filter((e) => e.uid !== uid);
      setItems(list);
      return handleNotistack("Se elimino correctamente!", "success");
    } catch (error) {
      return handleNotistack(error, "error");
    }
  };

  useEffect(() => {
    const filtro = query(collection(db, "administradores"));
    getDocs(filtro)
      .then((doc) => {
        if (!doc.empty) {
          const usuarios = doc.docs.map((documento) => {
            const document = { ...documento.data() };
            setLoading(false);
            return document;
          });
          setItems(usuarios);
          setEmpty(false);
        } else {
          setLoading(false);
          setEmpty(true);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <Box component="div">
      <h2>ADMINISTRADORES Y MODERADORES</h2>
      <Button variant="contained" onClick={() => navigate("/register")}>
        Agregar moderador
      </Button>

      <Box
        component="div"
        sx={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start" }}
      >
        {loading ? (
          <Spinner/>
        ) : (
          <>
            {empty ? (
              <h1>No se encontraron moderadores</h1>
            ) : (
              <Administrators userAdmin={items} fn={deleteUser} />
            )}
          </>
        )}
      </Box>
    </Box>

    // or
  );
}