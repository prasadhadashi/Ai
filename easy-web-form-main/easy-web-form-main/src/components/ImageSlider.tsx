
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

const slides = [
  {
    id: 1,
    title: "AFFORDABLE",
    subtitle: "HOME LOAN",
    description: "Make Your Dream Home A Reality",
    image: "/lovable-uploads/293ecc32-4471-4efc-a3db-2e4522c40d59.png"
  },
  {
    id: 2,
    title: "GOLD",
    subtitle: "LOAN",
    description: "Get instant loans against your gold",
    image: "/lovable-uploads/45a193bb-fc72-4f9f-b13f-4eeecee3f0dd.png"
  }
];

const ImageSlider = () => {
  const [api, setApi] = useState<any>();
  const plugin = Autoplay({ delay: 4000, stopOnInteraction: true });

  useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      // ...
    });
  }, [api]);

  return (
    <Carousel
      plugins={[plugin]}
      className="w-full max-w-xl mx-auto"
      setApi={setApi}
    >
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide.id}>
            <div className="bg-bank-blue-dark rounded-lg p-6 relative overflow-hidden">
              <h2 className="text-center text-xl text-bank-gold font-bold">{slide.title}</h2>
              <h3 className="text-center text-3xl text-white font-bold mt-1">{slide.subtitle}</h3>
              <p className="text-center text-white text-lg mt-2">{slide.description}</p>
              <div className="mt-8">
                <img 
                  src={slide.image}
                  alt={`${slide.title} ${slide.subtitle}`}
                  className="mx-auto max-w-full h-auto"
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
};

export default ImageSlider;
