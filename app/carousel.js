"use client";

import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const photos = [
  // {
  //   url: "https://firebasestorage.googleapis.com/v0/b/gamechanger-drive-91.appspot.com/o/mbbs_carousel%2FIMG_1283.JPG?alt=media&token=47e089bf-e0d2-4949-9804-be54e526d6ad",
  //   legent: "",
  // },
  // {
  //   url: "https://firebasestorage.googleapis.com/v0/b/gamechanger-drive-91.appspot.com/o/mbbs_carousel%2FIMG_1499.JPG?alt=media&token=5fe66360-861a-4d9e-8419-186f8c81f3ce",
  //   legent: "",
  // },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/gamechanger-drive-91.appspot.com/o/mbbs_carousel%2FIMG_1598.JPG?alt=media&token=38e20710-cc31-4f7e-b7f6-aa0ac045c496",
    legent: "",
  },
  {
    url: "https://firebasestorage.googleapis.com/v0/b/gamechanger-drive-91.appspot.com/o/mbbs_carousel%2F_MG_9353.JPG?alt=media&token=f5579a09-c2ec-4248-968e-af9921188328",
    legent: "",
  },
];

export default function Carousel1() {
  return (
    <div className='w-1/2 m-auto'>
    <Carousel
    showThumbs={false}
    >
      {photos.map((photo, i) => (
        <div key={i}>
          <img src={photo.url} alt={photo.legend} />
          <p className="legend">{photo.legend}</p>
        </div>
      ))}
    </Carousel>
    </div>
  );
}
