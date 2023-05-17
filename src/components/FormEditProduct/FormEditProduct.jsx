import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Alert,
  Button,
  ButtonGroup,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { db, storage } from "../../fbConfig";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import imgND from "../../img/ND.png";
import { v4 } from "uuid";
import Spinner from "../Spinner/Spinner";
import dayjs from "dayjs";

export default function FormEditProduct() {
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
      "SANDWICHS",
      "ENSALADAS",
    ],
  };

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [file, setFile] = useState(null);
  const [imgDelete, setImgDelete] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [event, setEvent] = useState({});
  const [stateImg, setStateImg] = useState(false);
  const { idProduct } = useParams();
  const [newCategory, setNewCategory] = useState(false);
  const [onOffer, setOnOffer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState();
  const [upLoadedData, setUpLoadedData] = useState(false);

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

  const deleteImg = async (collection, id) => {
    try {
      const imgRef = ref(storage, `${collection}/${id}`);
      await deleteObject(imgRef);
    } catch (error) {
      handleNotistack("No se pudo eliminar la imagen correctamente!", "error");
      console.error(error.code);
    }
  };

  const handleChangeSwitch = (e) => {
    setChecked(e.target.checked);
    setEvent({ ...event, post: e.target.checked });
  };
  const handleChangeSelect = (e) => {
    setEvent({ ...event, category: e.target.value });
    setNewCategory(e.target.value);
  };
  const handleChangeSelectOffer = (e) => {
    setEvent({ ...event, offer: e.target.value });
    setOnOffer(e.target.value);
  };

  const handleNotistack = (message, variant) => {
    // default | error | success | warning | info
    return enqueueSnackbar(message, { variant });
  };

  const handleChange = ({ target: { name, value } }) => {
    let nextInfo = undefined;
    if (name === "price") {
      nextInfo = {
        ...event,
        [name]: value,
        lastUpdate: dayjs().format("YYYY/MM/DD"),
      };
    } else {
      nextInfo = { ...event, [name]: value };
    }
    setEvent(nextInfo);
  };

  useEffect(() => {
    const docRef = doc(db, "products", idProduct);

    const getDocument = async () => {
      await getDoc(docRef)
        .then((res) => {
          const resp = res.data();
          setEvent(resp);
          setNewCategory(resp.category);
          setChecked(resp.post);
          setLoading(false);
          setOnOffer(resp.offer);
          setStateImg(resp.idImg !== "" ? true : false);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    getDocument();
  }, [idProduct]);

  useEffect(() => {
    const upLoadFile = async (file, folderName) => {
      try {
        const aleatorio = v4();
        const storageRef = ref(storage, folderName + "/" + aleatorio);

        await uploadBytes(storageRef, file);
        const urlFile = await getDownloadURL(storageRef);

        const docRef = doc(db, "products", event.id);

        await updateDoc(docRef, {
          ...event,
          idImg: aleatorio,
          link_img: urlFile,
        });
      } catch (er) {
        console.log(er);
      }
    };

    if (file !== null && upLoadedData) {
      upLoadFile(file, "products");
      setFile(null);
    }
  }, [file, event, upLoadedData]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setUpLoadedData(true);

      if (imgDelete) {
        await deleteImg("products", event.idImg);
      }
      const docRef = doc(db, "products", event.id);

      await updateDoc(docRef, event);
      handleNotistack("Datos actualizados correctamente!", "success");
      navigate("/admin/products");
    } catch (error) {
      handleNotistack("Error al actualizar los datos", "error");
    }
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
            bgcolor: "#fff",
            borderRadius: ".5rem",
            maxWidth: "100%",
            padding: { xs: "1rem", sm: "2rem" },
          }}
          data-aos="fade-right"
          data-aos-easing="linear"
        >
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid item xs={12} md={6}>
              <Stack spacing="1.5rem">
                <FormControlLabel
                  control={
                    <Switch
                      checked={checked}
                      onChange={handleChangeSwitch}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label={checked ? "PUBLICAR" : "SIN PUBLICAR"}
                  sx={{ display: "flex", justifyContent: "center" }}
                />

                <TextField
                  id="name"
                  label="Nombre"
                  name="name"
                  type="text"
                  value={event.name}
                  required={true}
                  onChange={handleChange}
                />

                <TextField
                  id="description"
                  label="Descripción"
                  name="description"
                  type="text"
                  multiline={true}
                  minRows={1}
                  maxRows={5}
                  value={event.description}
                  onChange={handleChange}
                />

                <TextField
                  id="price"
                  label="Precio"
                  name="price"
                  type="number"
                  value={event.price}
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
                    value={onOffer}
                    onChange={handleChangeSelectOffer}
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
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box>
                <Stack spacing="1.5rem" sx={{ maxWidth: "25rem" }}>
                  <div style={{ objectFit: "scale-down" }}>
                    <img
                      src={stateImg && !imgDelete ? event.link_img : imgND}
                      alt={event.name}
                      style={{ width: "100%" }}
                    ></img>
                  </div>

                  {stateImg && !imgDelete && (
                    <>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setImgDelete(true);
                        }}
                      >
                        sustituir imagen
                      </Button>
                    </>
                  )}
                  {(!stateImg || imgDelete) && (
                    <>
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
                    </>
                  )}
                  <ButtonGroup fullWidth={true}>
                    <Button variant="contained" type="submit">
                      Guardar
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => navigate("/admin/products")}
                    >
                      Cancelar
                    </Button>
                  </ButtonGroup>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}
