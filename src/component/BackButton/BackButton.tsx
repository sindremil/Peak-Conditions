import { useNavigate } from 'react-router-dom';
import style from "./BackButton.module.css";
import backArrow from "../../assets/backButton/backArrow.svg";

interface BackButtonProps {
  to: string;
  text?: string;
}

export default function BackButton({ to, text = 'Tilbake' }: BackButtonProps): JSX.Element {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <button className={style.backButton} onClick={handleClick} type='button'>
      <img src={backArrow} alt="back" />
      <p>{text}</p>
    </button>
  );
}
