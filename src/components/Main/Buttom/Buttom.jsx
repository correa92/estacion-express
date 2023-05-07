
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import "./buttom.css"

const color = {
    color: "var(--color-black)"
}

export default function Buttom({direction}) {
  return (
    <div className='containerButtom'>
      {direction ==="left" ? <ArrowCircleLeftIcon fontSize='large' sx={color} /> : <ArrowCircleRightIcon fontSize='large' sx={color}/>}
    </div>
  )
}
