import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../Modal/Modal';
import { GalleryStyled, GalleryImage } from './ImageGalleryItem.styled';

export function ImageGalleryItem ({ image }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(true)
  }
  return (
  <>
    <GalleryStyled onClick={handleToggleModal}>
      <GalleryImage
        className="ImageGalleryItem-image"
        src={image.webformatURL}
        alt="img"
      />
    </GalleryStyled>
    {isModalOpen && (
      <Modal onClose={handleToggleModal} largeImg={image.largeImageURL} />
    )}
  </>
);
    }
/*
export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  handleToggleModal = () => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
    }));
  };
  render() {
    const { webformatURL, largeImageURL } = this.props.image;
    const { isModalOpen } = this.state;
    return (
      <>
        <GalleryStyled onClick={this.handleToggleModal}>
          <GalleryImage
            className="ImageGalleryItem-image"
            src={webformatURL}
            alt="img"
          />
        </GalleryStyled>
        {isModalOpen && (
          <Modal onClose={this.handleToggleModal} largeImg={largeImageURL} />
        )}
      </>
    );
  }
}*/

ImageGalleryItem.propTypes = {
  image: PropTypes.object,
};
