import { Container } from "@mui/material";
import { PulseLoader } from "react-spinners";

export default function Spinner() {
    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "#FE6A2C",
      };
  return (
    <Container
            sx={{
              display: "grid",
              placeContent: "center",
              height: "80vh",
            }}
          >
            <PulseLoader
              color="#FE6A2C"
              cssOverride={override}
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </Container>
  )
}