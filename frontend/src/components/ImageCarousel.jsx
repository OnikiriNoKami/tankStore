import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../override.css";
import { Carousel } from "react-responsive-carousel";
import { Checkbox, FormControlLabel } from "@material-ui/core";

const ImageCarousel = ({ images = [],handleChecked,checkedMain, ...props }) => {
    return (
        <Carousel {...props}>
            {images.value.length !== 0 ? (
                images.value.map((image) => (
                    <div key={image.url}>
                        <img src={image.url} />
                            <FormControlLabel
                                label="As main image"
                                style={{
                                    position: "absolute",
                                    right: 25,
                                    top: 5,
                                }}
                                control={<Checkbox checked={image.id===checkedMain} onChange={()=>handleChecked(image.id)} />}
                            />
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
