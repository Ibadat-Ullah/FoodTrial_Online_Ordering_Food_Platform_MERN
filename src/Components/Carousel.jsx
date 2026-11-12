import { useEffect, useState } from "react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1600&q=80",
    alt: "A colorful bowl of fresh salad",
  },
  {
    src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1600&q=80",
    alt: "Freshly baked pizza",
  },
  {
    src: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1600&q=80",
    alt: "A cheeseburger with fresh toppings",
  },
  {
    src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1600&q=80",
    alt: "A healthy salad with vegetables",
  },
  {
    src: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=1600&q=80",
    alt: "A plated restaurant meal",
  },
  {
    src: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1600&q=80",
    alt: "A bowl of fresh food",
  },
];

function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) =>
        Math.min(currentIndex + 1, images.length - 1),
      );
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  const showPrevious = () => {
    setActiveIndex((currentIndex) => Math.max(currentIndex - 1, 0));
  };

  const showNext = () => {
    setActiveIndex((currentIndex) =>
      Math.min(currentIndex + 1, images.length - 1),
    );
  };

  return (
    <section
      aria-label="Featured food"
      className="relative mt-6 h-[320px] w-full overflow-hidden sm:h-[420px] md:h-[500px]"
    >
      <div
        className="flex h-full transition-transform duration-700 ease-in-out motion-reduce:transition-none"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {images.map((image) => (
          <div key={image.src} className="h-full w-full flex-none">
            <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={showPrevious}
        aria-label="Previous image"
        disabled={activeIndex === 0}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-4 py-2 text-2xl text-white hover:bg-black/70"
      >
        &#8249;
      </button>
      <button
        type="button"
        onClick={showNext}
        aria-label="Next image"
        disabled={activeIndex === images.length - 1}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-4 py-2 text-2xl text-white hover:bg-black/70"
      >
        &#8250;
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show image ${index + 1}`}
            aria-current={index === activeIndex}
            className={`h-2.5 w-2.5 rounded-full ${
              index === activeIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default Carousel;
