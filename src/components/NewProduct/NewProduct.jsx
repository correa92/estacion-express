import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  Stack,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../fbConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useSnackbar } from "notistack";
import { v4 } from "uuid";
import dayjs from "dayjs";
import Spinner from "../Spinner/Spinner";

export default function NewProduct() {
  const acceptedFormats = {
    img1: "image/png",
    img2: "image/jpeg",
  };
  const offerOption = [true, false];

  const categoryList = {
    category: [
      "PANIFICADOS",
      "CAFETERÍA",
      "JUGOS FRUTALES",
      "SNAKS",
      "BEBIDAS",
      "LÁCTEOS",
      "COMIDAS",
      "POSTRES",
      "SANDWICHS",
      "ENSALADAS",
    ],
  };

  const [newCategory, setNewCategory] = useState("");
  const [offer, setOffer] = useState("");

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [idImg, setIdImg] = useState("");
  const [file, setFile] = useState(null);
  const [evento, setEvento] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [url, setUrl] = useState(false);
  const [uidDoc, setUidDoc] = useState("");
  const [loading, setLoading] = useState(false);
  const [upLoadedData, setUpLoadedData] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setEvento({ ...evento, [name]: value });
  };

  const handleChangeSelect = (e) => {
    setNewCategory(e.target.value);
  };
  const handleChangeSelect2 = (e) => {
    setOffer(e.target.value);
  };

  const handleChangeFile = (e) => {
    if (e.target.files.length > 1) {
      setError(true);
      setErrorMessage("Debe seleccionar solo un archivo!");
    } else if (
      e.target.files[0].type === acceptedFormats.img1 ||
      e.target.files[0].type === acceptedFormats.img2
    ) {
      setFile(e.target.files[0]);
      setError(false);
    } else {
      setError(true);
      setErrorMessage("Formato incorrecto!");
    }
  };

  const upLoadFile = async (file, folderName) => {
    const aleatorio = v4();
    setIdImg(aleatorio);
    const storageRef = ref(storage, folderName + "/" + aleatorio);

    try {
      await uploadBytes(storageRef, file);
      const urlFile = await getDownloadURL(storageRef);
      setEvento({ ...evento, link_img: urlFile });
      setUrl(true);
      setUpLoadedData(true);
    } catch (er) {
      console.log(er);
    }
  };

  useEffect(() => {
    const subirDatos = async (objeto) => {
      try {
        await addDoc(collection(db, "products"), objeto)
          .then((e) => {
            setUidDoc(e.id);
            setLoading(false);
            enqueueSnackbar("Producto creado correctamente!", {
              variant: "success",
            });
          })
          .catch(() => {
            enqueueSnackbar("No se pudo crear el producto", {
              variant: "error",
            });
          });
        setUpLoadedData(false);
      } catch (er) {
        console.log(er);
      }
    };

    const updateDocumento = async (db, folder, id) => {
      const docRef = doc(db, folder, id);
      await updateDoc(docRef, { id: uidDoc })
        .then(() => {
          navigate("/admin/products");
        })
        .catch((e) => console.error(e));
    };

    if (file && url && upLoadedData) {
      const eventoObjeto = {
        name: evento.nameProduct ? evento.nameProduct : "",
        description: evento.description ? evento.description : "",
        lastUpdate: dayjs().format("DD/MM/YYYY"),
        price: evento.price ? parseFloat(evento.price) : 0,
        link_img: evento.link_img ? evento.link_img : "",
        id: "",
        idImg: idImg,
        offer: offer,
        post: true,

        category: newCategory,
      };
      subirDatos(eventoObjeto);
    }

    if (uidDoc.length > 0) {
      updateDocumento(db, "products", uidDoc);
    }
  }, [
    evento,
    file,
    upLoadedData,
    url,
    uidDoc,
    enqueueSnackbar,
    navigate,
    idImg,
    newCategory,
    offer,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await upLoadFile(file, "products");
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Box
          onSubmit={handleSubmit}
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
            bgcolor: "#fff",
            borderRadius: ".5rem",
            maxWidth: "30rem",
          }}
          data-aos="fade-right"
          data-aos-easing="linear"
        >
          <Stack spacing="1.5rem">
            <TextField
              id="nameProduct"
              label="Nombre del producto"
              name="nameProduct"
              type="text"
              required={true}
              onChange={handleChange}
            />

            <TextField
              id="description"
              label="Descripción"
              name="description"
              type="text"
              multiline={true}
              minRows={5}
              maxRows={20}
              onChange={handleChange}
            />

            <TextField
              id="price"
              label="Precio"
              name="price"
              type="number"
              required={true}
              onChange={handleChange}
            />

            <FormControl fullWidth required={true}>
              <InputLabel id="select">Categoria</InputLabel>

              <Select
                labelId="select"
                id="category"
                label="select"
                value={newCategory}
                onChange={handleChangeSelect}
              >
                {categoryList.category.map((cat, index) => {
                  return (
                    <MenuItem key={index} value={cat}>
                      {cat}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl fullWidth required={true}>
              <InputLabel id="select2">Oferta</InputLabel>

              <Select
                labelId="select2"
                id="offer"
                label="select2"
                value={offer}
                onChange={handleChangeSelect2}
              >
                {offerOption.map((cat, index) => {
                  return (
                    <MenuItem key={index} value={cat}>
                      {cat ? "SI" : "NO"}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <Stack direction="column" spacing="2rem">
              {error && (
                <Alert variant="filled" severity="error">
                  {errorMessage}
                </Alert>
              )}

              <input
                type="file"
                name="archivo"
                id="input_file"
                required={true}
                accept={`${acceptedFormats.img1},${acceptedFormats.img2}`}
                onChange={handleChangeFile}
              />
            </Stack>

            <Button variant="contained" type="submit">
              agregar producto
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate("/admin/products")}
            >
              Cancelar
            </Button>
          </Stack>
        </Box>
      )}
    </>
  );
}
