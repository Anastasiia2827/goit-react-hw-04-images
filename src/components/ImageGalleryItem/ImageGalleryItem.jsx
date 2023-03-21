import PropTypes from 'prop-types';

import{Item, Image} from './ImageGalleryItem.styled'

function ImageGalleryItem({ description, smallImage, largeImage, openModal }) {
    return (
        <Item onClick={() => openModal(largeImage, description)}>
            <Image src={smallImage} alt={description} data-large={largeImage} />
        </Item>
    );
}

ImageGalleryItem.prototype = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string,
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,

};

export default ImageGalleryItem;