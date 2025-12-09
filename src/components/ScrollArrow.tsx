import { ChevronDown } from 'lucide-react';

interface ScrollArrowProps {
  targetId: string;
}

export const ScrollArrow = ({ targetId }: ScrollArrowProps) => {
  const handleClick = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="scroll-arrow"
      aria-label={`Scroll to ${targetId}`}
    >
      <ChevronDown className="w-8 h-8" />
    </button>
  );
};
