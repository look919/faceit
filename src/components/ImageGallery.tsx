"use client";

import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useEffect } from "react";

interface ImageGalleryProps {
  images: string[];
}

export const ImageGallery = (props: ImageGalleryProps) => {
  const mappedImageGallery = props.images.map((img) => ({
    original: img,
    thumbnail: img,
    fullscreen: "true",
  }));

  // Add custom CSS for dark background behind bullets
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .image-gallery-bullets {
        background-color: rgba(0, 0, 0, 0.2);
        padding: 10px 10px;
        border-radius: 15px;
        display: inline-block;
        width: fit-content;
        position: absolute;
        bottom: 20px;
        right: 20px;
        z-index: 4;
      }
      .image-gallery-bullets .image-gallery-bullet {
        background-color: rgba(255, 255, 255, 0.5);
      }
      .image-gallery-bullets .image-gallery-bullet.active {
        background-color: rgba(255, 255, 255, 09);
      }
 
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <ReactImageGallery
      lazyLoad={true}
      items={mappedImageGallery}
      showBullets
      showThumbnails
      showPlayButton={false}
      showIndex
      disableKeyDown
      showFullscreenButton={false}
      useBrowserFullscreen={false}
    />
  );
};
