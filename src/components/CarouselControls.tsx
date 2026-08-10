import { ArrowLeft, ArrowRight } from 'lucide-react';

interface CarouselControlsProps {
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
}

export default function CarouselControls({
  scrollPrev,
  scrollNext,
  canScrollPrev,
  canScrollNext,
}: CarouselControlsProps) {

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        aria-label="Video trước"
        className="flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-full border border-[#2a221c]/12 text-[#2a221c] transition-all duration-300 hover:border-[#2a221c]/30 hover:bg-[#2a221c]/[0.02] disabled:cursor-not-allowed disabled:opacity-20 disabled:hover:border-[#2a221c]/12 disabled:hover:bg-transparent"
      >
        <ArrowLeft className="h-5 w-5" strokeWidth={1.25} />
      </button>
      <button
        onClick={scrollNext}
        disabled={!canScrollNext}
        aria-label="Video sau"
        className="flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-full border border-[#2a221c]/12 text-[#2a221c] transition-all duration-300 hover:border-[#2a221c]/30 hover:bg-[#2a221c]/[0.02] disabled:cursor-not-allowed disabled:opacity-20 disabled:hover:border-[#2a221c]/12 disabled:hover:bg-transparent"
      >
        <ArrowRight className="h-5 w-5" strokeWidth={1.25} />
      </button>
    </div>
  );
}
