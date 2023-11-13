import styles from './PeakSelector.module.css';

interface PeakSelectorProps {
  label: string | number;
  onClick: () => void;
  isActive: boolean;
};

export default function PeakSelector({ label, onClick, isActive }: PeakSelectorProps) {
  const buttonStyle = isActive ? styles.activeButton : styles.button;
  return (
    <button className={buttonStyle} onClick={onClick} type='button'>
      {label}
    </button>
  );
};

