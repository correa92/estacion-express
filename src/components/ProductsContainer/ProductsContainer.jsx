import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../fbConfig";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import Spinner from "../Spinner/Spinner";
import Product from "../Product/Product";
import { deleteObject, ref } from "firebase/storage";

export default function ProductsContainer() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [empty, setEmpty] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const [reload, setReload] = useState(false);

  const handleNotistack = (message, variant) => {
    // default | error | success | warning | info
    enqueueSnackbar(message, { variant });
  };

  const deleteProduct = async (collection, uid, id_Img) => {
    try {
      await deleteDoc(doc(db, collection, uid));
      await deleteImg(collection, id_Img);

      const list = items.filter((e) => e.uid !== uid);
      setItems(list);
      setReload(true);
      return handleNotistack("Se elimino correctamente!", "success");
    } catch (error) {
      return handleNotistack(error, "error");
    }
  };

  const deleteImg = async (collection, id) => {
    const imgRef = ref(storage, `${collection}/${id}`);
    try {
      await deleteObject(imgRef);
    } catch (error) {
      handleNotistack("No se pudo eliminar la imagen correctamente!", "error");
    }
  };

  useEffect(() => {
    const filtro = query(collection(db, "products"));
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
          setReload(false);
        } else {
          setLoading(false);
          setEmpty(true);
        }
      })
      .catch((e) => console.log(e));
  }, [reload]);

  return (
    <Box component="div">
      <h2>PRODUCTOS</h2>
      <Button variant="contained" onClick={() => navigate("new_product")}>
        Agregar producto
      </Button>

      <Box
        component="div"
        sx={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start" }}
      >
        {loading ? (
          <Spinner />
        ) : (
          <>
            {empty ? (
              <h1>No se encontraron productos</h1>
            ) : (
              <Product productsList={items} fn={deleteProduct} />
            )}
          </>
        )}
      </Box>
    </Box>

    // or
  );
}
