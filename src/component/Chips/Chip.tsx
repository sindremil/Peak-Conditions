import './Chip.css';
import checkmark from '../../assets/chip/checkmark.svg';

interface ChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

function Chip({ label, selected, onClick }: ChipProps): JSX.Element {
  const handleChipClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className='chip-container'>
      <button
        className={`chip ${selected ? 'selected' : ''}`}
        onClick={handleChipClick}
        role="listbox"
        tabIndex={0}
        aria-label={label}
        type='button'
      >
        <img src={checkmark} alt="checkmark" className={`chipIcon ${selected ? '' : 'hidden'}`}/>
        <span className="chip-label" id='favouritesChipLabel'>{label}</span>
      </button>
    </div>
  );
}

export default Chip;
