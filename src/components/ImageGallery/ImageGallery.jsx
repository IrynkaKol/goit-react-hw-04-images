import React from 'react';
import PropTypes from 'prop-types';
import {ImageGalleryStyled} from './ImageGallery.styled'
import { ImageGalleryItem } from './ImageGalleryItem';


export const ImageGallery = ({ images }) => {
  return (
    <ImageGalleryStyled>
      {images.map(img => {
        return <ImageGalleryItem key={img.id} image={img} />;
      })}
    </ImageGalleryStyled>
  );
};
ImageGallery.propTypes = {
  images: PropTypes.array,
}