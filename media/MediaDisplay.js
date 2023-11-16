



import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './mystyle.css'

const MediaDisplay = ({ media }) => {
    const a = 'http://localhost:1337';

    return (
        <div className="media-carousel">
      
                {media.map((mediaItem) => (
                    <div key={mediaItem.id}>
                        {renderMedia(mediaItem.attributes, a)}
                    </div>
                ))}
           
        </div>
    );
};

const renderMedia = (attributes, a) => {
    const { id, name, mime, url, height } = attributes;

    if (mime.startsWith('image/')) {
        return (
            <img
                key={id}
                src={a + url}
                alt={name}
                width='100px'
                // height={height}
            />
        );
    } else if (mime.startsWith('audio/')) {
        return (
            <audio key={id} controls>
                <source src={a + url} type={mime} />
                Your browser does not support the audio element.
            </audio>
        );
    } else if (mime.startsWith('video/')) {
        return (
            <video width='100%' height={height} controls>
                <source src={a + url} type={mime} />
                Your browser does not support the video element.
            </video>
        );
    } else {
        return (
            <p key={id}>
                File type not supported: {name}
            </p>
        );
    }
};

export default MediaDisplay;
