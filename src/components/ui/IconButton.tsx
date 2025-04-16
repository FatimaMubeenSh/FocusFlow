
interface IconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
  className?: string;
  text?: string;
  disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick, ariaLabel, className, text, disabled }) => {
  return (
    <button onClick={onClick} aria-label={ariaLabel}  className={`flex btn btn-icon ${disabled ? 'disabled': ""} focus:outline-none focus:ring-2 focus:ring-gray-200 ${className}`}>
      { icon }{text && <span className="mx-2">{text}</span>}
    </button>
  );
};

export default IconButton;