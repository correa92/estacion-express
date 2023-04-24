import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Button, ButtonGroup, Grid, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
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

export default function FormEditInfo() {
  const acceptedFormats = {
    img1: "image/png",
    img2: "image/jpeg",
  };
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [file, setFile] = useState(null);
  const [imgDelete, setImgDelete] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [event, setEvent] = useState({});
  const [stateImg, setStateImg] = useState(false);
  const [loading, setLoading] = useState(true);
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
    const imgRef = ref(storage, `${collection}/${id}`);

    deleteObject(imgRef)
      .then(() => {
        const dbRef = doc(db, "info", "1");
        updateDoc(dbRef, {
          idImg: "",
          link_logo: "",
        });
      })
      .catch((error) => {
        handleNotistack(
          "No se pudo eliminar la imagen correctamente!",
          "error"
        );
        console.error(error);
      });
  };

  const handleNotistack = (message, variant) => {
    // default | error | success | warning | info
    return enqueueSnackbar(message, { variant });
  };

  const handleChange = ({ target: { name, value } }) => {
    const nextInfo = { ...event, [name]: value };
    setEvent(nextInfo);
  };

  useEffect(() => {
    const docRef = doc(db, "info", "1");

    const getDocument = async () => {
      await getDoc(docRef)
        .then((res) => {
          const resp = res.data();
          setEvent(resp);
          setLoading(false);
          setStateImg(resp.idImg !== "" ? true : false);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    getDocument();
  }, []);

  useEffect(() => {
    const upLoadFile = async (file, folderName) => {
      try {
        const aleatorio = v4();
        const storageRef = ref(storage, folderName + "/" + aleatorio);

        await uploadBytes(storageRef, file);
        const urlFile = await getDownloadURL(storageRef);

        const docRef = doc(db, "info", "1"); //--------------------------------------------------------------------------

        await updateDoc(docRef, {
          ...event,
          idImg: aleatorio,
          link_logo: urlFile,
        });
      } catch (er) {
        console.log(er);
      }
    };

    if (file !== null && upLoadedData) {
      upLoadFile(file, "info");
      setFile(null);
    }
  }, [file, event, upLoadedData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUpLoadedData(true);

    if (imgDelete) {
      await deleteImg("info", event.idImg);
    }

    const docRef = doc(db, "info", "1");

    await updateDoc(docRef, event)
      .then(() => {
        handleNotistack("Datos actualizados correctamente!", "success");
        navigate("/admin/establishment");
      })
      .catch(() => {
        handleNotistack("Error al actualizar los datos", "error");
      });
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
          }}
          data-aos="fade-right"
          data-aos-easing="linear"
        >
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid item xs={12} md={6}>
              <Stack spacing="1.5rem">
                <TextField
                  id="name"
                  label="Título"
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
                  maxRows={4}
                  value={event.description}
                  onChange={handleChange}
                />

                <TextField
                  id="date"
                  label="Fecha de origen"
                  name="date"
                  type="date"
                  value={event.date}
                  onChange={handleChange}
                />
                <TextField
                  id="birthplace"
                  label="Dirección"
                  name="birthplace"
                  type="text"
                  value={event.birthplace}
                  onChange={handleChange}
                />
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box>
                <Stack spacing="1.5rem" sx={{ maxWidth: "25rem" }}>
                  <div style={{ objectFit: "scale-down" }}>
                    <img
                      src={stateImg && !imgDelete ? event.link_logo : imgND}
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
                        Eliminar Logo
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
                      onClick={() => navigate("/admin/establishment")}
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
