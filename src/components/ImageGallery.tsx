import React, { useEffect, useRef, useState } from "react";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";

const ImageGallery = ({ photoGallery, c_photoGalleryTitle }) => {
  if (!photoGallery || photoGallery.length === 0) return null;

  const [galleryVisible, setGalleryVisible] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setGalleryVisible(true);
      },
      { threshold: 0.2 }
    );
    if (galleryRef.current) observer.observe(galleryRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="galerii"
      className="bg-background py-24 px-6 border-b border-divider"
    >
      <div className="container mx-auto max-w-screen-xl">
        <h2 className="text-section-title font-bold mb-12 text-foreground">
          {c_photoGalleryTitle}
        </h2>
        <div
          ref={galleryRef}
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 transition-opacity transform duration-1000 ease-in-out ${
            galleryVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Gallery>
            {photoGallery.map((photo, index) => (
              <Item
                key={index}
                original={photo.image.url}
                thumbnail={photo.image.url}
                width={photo.image.width}
                height={photo.image.height}
                title={photo.description || photo.details}
              >
                {({ ref, open }) => (
                  <button
                    type="button"
                    onClick={open}
                    className="w-full focus:outline-none focus:ring-2 focus:ring-primary rounded-2xl"
                    aria-label={`Open photo ${index + 1} fullscreen`}
                  >
                    <img
                      ref={ref}
                      src={photo.image.url}
                      alt={photo.image.alternateText || `Gallery photo ${index + 1}`}
                      className="w-full h-auto object-cover shadow-md rounded-2xl overflow-hidden transform hover:scale-105 transition duration-300"
                    />
                  </button>
                )}
              </Item>
            ))}
          </Gallery>
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
