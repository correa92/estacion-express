import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import imgND from "../../img/ND.png";
import dayjs from "dayjs";

const styleCard = {
  "&:hover": {
    "transition": ".5s .10s",
    "scale":"1.01",
    "boxShadow": "0px 18px 27px -7px rgba(0,0,0,0.75)"
  },
  maxWidth: "70rem",
  m: "1rem",
}; 
export default function Info({ infoData }) {
  const fecha = dayjs(infoData[0].date).format("DD/MM/YYYY");

  const navigate = useNavigate();
  return (
    <Card sx={styleCard} data-aos="zoom-in">
      <Grid container>
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            sx={{ maxHeight: "25rem", background:"#04d94f"}}
            image={infoData[0].link_logo !== "" ? infoData[0].link_logo : imgND}
            alt={infoData[0].name}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CardContent sx={{width:"100%"}}>
            <Typography gutterBottom variant="body1" component="div">
              {<strong>Nombre:</strong>} {infoData[0].name}
            </Typography>
            <Typography variant="body1">
              {<strong>Descripción:</strong>} {infoData[0].description}
            </Typography>
            <Divider sx={{ my: ".5rem" }} />

            <Typography gutterBottom variant="body1" component="div">
              {<strong>Inaguración: </strong>}{fecha}
            </Typography>

            <Typography gutterBottom variant="body1" component="div">
              {<strong>Lugar origen:</strong>}{" "}
              {infoData[0].birthplace === ""
                ? "Sin definir"
                : ` ${infoData[0].birthplace}`}
            </Typography>
            <Typography gutterBottom variant="body1" component="div">
              {<strong>Días y Horas de apertura: </strong>}{infoData[0].dayAndHour}
            </Typography>
            <Typography gutterBottom variant="body1" component="div">
              {<strong>URL Instagram: </strong>}{infoData[0].instagram}
            </Typography>
            <Typography gutterBottom variant="body1" component="div">
              {<strong>Teléfono: </strong>}{infoData[0].movil}
            </Typography>
            <Typography gutterBottom variant="body1" component="div">
              {<strong>Mensaje de whatsapp: </strong>}{infoData[0].message_whatsapp}
            </Typography>
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/admin/establishment_edit");
              }}
            >
              Editar Info
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
}
