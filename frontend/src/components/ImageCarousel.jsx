import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../override.css";
import { Carousel } from "react-responsive-carousel";

const ImageCarousel = ({ images = [], ...props }) => {
    return (
        <Carousel {...props}>
            {images.value.length !== 0 ? (
                images.value.map((image) => (
                    <div key={image.url}>
                        <img src={image.url} />
                    </div>
                ))
            ) : (
                <div>
                    <p className="legend">No images</p>
                </div>
            )}
        </Carousel>
    );
};

export default ImageCarousel;
