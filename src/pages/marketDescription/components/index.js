import React from "react";

const TitleSection = React.lazy(() => import("./titleSection/titleSection"));
const InfoSection = React.lazy(() =>
  import("./informationSection/informationSection")
);
const GallerySection = React.lazy(() =>
  import("./gallerySection/gallerySection")
);
const ReviewSection = React.lazy(() => import("./reviewSection/reviewSection"));

export { TitleSection, InfoSection, GallerySection, ReviewSection };
