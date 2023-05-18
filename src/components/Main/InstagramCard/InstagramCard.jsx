import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider, Grid } from "@mui/material";

import imgND from "../../../img/ND.png";



export default function InstagramCard({ list }) {

  return list.map((evento) => {

    return (
      <Card
        sx={{ maxWidth: "48rem", m: "1rem" }}
        key={evento.id}
        data-aos="zoom-in"
        className="instagramCard"
      >
        <Grid container>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              sx={{ maxHeight: "25rem" }}
              image={evento.media_url !== "" ? evento.media_url : imgND}
              alt={evento.username}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Username: {evento.username}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Descripción: {evento.caption}
              </Typography>
              <Divider sx={{ my: ".5rem" }} />
              <Typography gutterBottom variant="body1" component="div">
                <Button
                  variant="contained"
                  href={evento.permalink}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ir a publicación
                </Button>
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    );
  });
}
