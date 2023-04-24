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


export default function Info({ infoData }) {

const fecha =dayjs(infoData[0].date).format("DD/MM/YYYY"); 

  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: "48rem", m: "1rem" }} data-aos="zoom-in">
      <Grid container>
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            sx={{ maxHeight: "25rem", minWidth: "15rem" }}
            image={infoData[0].link_logo !== "" ? infoData[0].link_logo : imgND}
            alt={infoData[0].name}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Nombre: {infoData[0].name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Descripción: {infoData[0].description}
            </Typography>
            <Divider sx={{ my: ".5rem" }} />

            <Typography gutterBottom variant="body1" component="div">
              Inaguración: {fecha}
            </Typography>

            <Typography gutterBottom variant="body1" component="div">
              Lugar origen:{" "}
              {infoData[0].birthplace === ""
                ? "Sin definir"
                : ` ${infoData[0].birthplace}`}
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
