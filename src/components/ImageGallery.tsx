"use client";

import ReactImageGallery from "react-image-gallery";

interface ImageGalleryProps {
  images: string[];
}

export const ImageGallery = (props: ImageGalleryProps) => {
  const mappedImageGallery = props.images.map((img) => ({
    original: img,
    thumbnail: img,
    fullscreen: "true",
  }));

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
