import { Button, Card, Stack } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Administrators({ userAdmin, fn }) {
  const [open, setOpen] = useState(false);
  const [deleteUID, setDeleteUID] = useState("");
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return userAdmin.map((admin) => {
    return (
      <div
        key={admin.uid}
        data-aos="zoom-in"
        data-aos-duration="1000"
        data-aos-easing="ease-in-sine"
      >
        <Card sx={{ m: "1rem", minWidth: "15rem" }}>
          <CardHeader
            avatar={
              <Avatar
                aria-label="avatar"
                alt={admin.info.name}
                src={admin.info.avatar}
              />
            }
            title={`${admin.info.name} ${admin.info.lastName}`.toUpperCase()}
            subheader={`Rol: ${admin.rol.toUpperCase()}`}
          />
          <CardContent>
            <Typography
              gutterBottom={true}
              variant="body2"
              color="text.secondary"
              sx={{
                fontWeight: "600",
                background: admin.active ? "green" : "red",
                color: "#fff",
                p: "5px",
                textAlign: "center",
                borderRadius: "1rem",
              }}
            >
              {admin.active ? "HABILITADO" : "INHABILITADO"}
            </Typography>
            <Typography
              gutterBottom={true}
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: "600" }}
            >
              {` ${admin.email.toUpperCase()}`}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              gutterBottom={true}
            >
              {<strong>Creado: </strong>}
              {admin.registeredTime}
            </Typography>

            <Stack spacing="1rem">
              <Button
                variant="contained"
                onClick={() => {
                  navigate(`user_edit/${admin.uid}`);
                }}
              >
                Modificar datos
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setDeleteUID(admin.uid);
                  handleClickOpen();
                }}
              >
                Eliminar
              </Button>
            </Stack>
          </CardContent>
        </Card>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Atención!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              ¿Desea eliminar al usuario?, Recuerde que este ya no tendrá
              privilegios para acceder al sítio!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button
              onClick={() => {
                fn("administradores", deleteUID);
                handleClose();
              }}
              autoFocus
            >
              Acepto
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  });
}
