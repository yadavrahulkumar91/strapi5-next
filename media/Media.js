import React from 'react';

const MediaDisplay = ({ media }) => {
    const a = 'http://localhost:1337';

    const renderMedia = (mediaItem) => {
        const { id, name, mime, url, height } = mediaItem.attributes;

        if (mime.startsWith('image/')) {
            return (
                <img
                    key={id}
                    src={a + url}
                    alt={name}
                    width='100px'
                    height={height}
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
                <video key={id} width='100px' height={height} controls>
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

    return (
        <div>
            {media.map(renderMedia)}
        </div>
    );
};

export default MediaDisplay;