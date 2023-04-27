import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import imgND from "../../img/ND.png";

const styleCard = {
  "&:hover": {
    "transition": ".5s .10s",
    "scale":"1.02",
    "boxShadow": "0px 18px 27px -7px rgba(0,0,0,0.75)"
  },
  maxWidth: "35rem",
  m: "1rem",
};

export default function Product({ productsList, fn }) {
  const navigate = useNavigate();

  return productsList.map((evento) => {
    return (
      <Card sx={styleCard} key={evento.id} data-aos="zoom-in">
        <Grid container>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              sx={{ height: "100%" }}
              image={evento.link_img !== "" ? evento.link_img : imgND}
              alt={evento.name}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CardContent>
              <Typography
                gutterBottom={true}
                variant="body1"
                component="div"
                sx={{
                  fontWeight: "600",
                  background: evento.offer ? "green" : "red",
                  color: "#fff",
                  p: "5px",
                  textAlign: "center",
                  borderRadius: "1rem",
                }}
              >
                {evento.offer ? "EN OFERTA" : "SIN OFERTA"}
              </Typography>
              <Typography
                gutterBottom={true}
                variant="body1"
                component="div"
                sx={{
                  fontWeight: "600",
                  background: evento.post ? "green" : "red",
                  color: "#fff",
                  p: "5px",
                  textAlign: "center",
                  borderRadius: "1rem",
                }}
              >
                {evento.post ? "PUBLICADO" : "SIN PUBLICAR"}
              </Typography>

              <Divider sx={{ my: ".5rem" }} />

              <Typography gutterBottom variant="body1" component="div">
                {<strong>Categoría:</strong>} {evento.category}
              </Typography>

              <Typography gutterBottom variant="body1" component="div">
                {<strong>Nombre:</strong>} {evento.name.toUpperCase()}
              </Typography>
              <Typography variant="body1">
                {<strong>Descripción:</strong>}{" "}
                {evento.description === ""
                  ? "SIN DESCRIPCIÓN"
                  : evento.description}
              </Typography>
              <Divider sx={{ my: ".5rem" }} />

              <Typography gutterBottom variant="body1" component="div">
                {<strong>Precio actualizado: </strong>}
                {evento.lastUpdate}
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                {<strong>Precio:</strong>} $ {evento.price}
              </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                onClick={() => navigate(`product_edit/${evento.id}`)}
              >
                Editar
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  fn("products", evento.id, evento.idImg);
                }}
              >
                Eliminar
              </Button>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    );
  });
}
