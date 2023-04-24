import { Container } from "@mui/material";
import { PulseLoader } from "react-spinners";

export default function Spinner() {
    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "#1976d2",
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
              color="#1976d2"
              cssOverride={override}
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </Container>
  )
}