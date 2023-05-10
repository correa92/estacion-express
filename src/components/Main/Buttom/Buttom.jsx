import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import "./buttom.css";

const color = {
  color: "#444",
};

export default function Buttom({ direction }) {
  return (
    <div className="containerButtom">
      {direction === "left" ? (
        <KeyboardArrowLeftIcon fontSize="large" sx={color} />
      ) : (
        <KeyboardArrowRightIcon fontSize="large" sx={color} />
      )}
    </div>
  );
}
