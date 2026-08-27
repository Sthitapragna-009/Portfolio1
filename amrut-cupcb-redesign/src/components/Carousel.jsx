import { useRef, useState } from "react";

// A horizontally-scrolling, scroll-snapped row with prev/next controls and
// an index readout — used for the Highlights reel.
export default function Carousel({ children }) {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const count = children.length;

  function scrollToIndex(next) {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(count - 1, next));
    const card = track.children[clamped];
    if (card) {
      track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
    }
    setIndex(clamped);
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[0];
    if (!card) return;
    const width = card.offsetWidth + 24;
    const next = Math.round(track.scrollLeft / width);
    setIndex(Math.max(0, Math.min(count - 1, next)));
  }

  return (
    <div className="carousel">
      <div className="carousel__track" ref={trackRef} onScroll={handleScroll}>
        {children}
      </div>
      <div className="carousel__controls">
        <span className="mono carousel__index">
          {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
        <div className="carousel__arrows">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scrollToIndex(index - 1)}
            disabled={index === 0}
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => scrollToIndex(index + 1)}
            disabled={index === count - 1}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
