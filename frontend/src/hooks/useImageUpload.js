import { useState } from "react";

const useImageUpload = () => {
    const [images, setImages] = useState([]);
    const [isDirty, setIsDirty] = useState(false);

    const handleClear = () => {
        setImages([]);
        setIsDirty(false);
    };

    const handleChange = (event) => {
        if (event.target.files[0]) {
            setImages([
                ...images,
                {
                    image: event.target.files[0],
                    url: URL.createObjectURL(event.target.files[0]),
                    id: crypto.getRandomValues(new Uint16Array(4)).join('')
                },
            ]);
        }
    };

    const addImage = (image) => {
        if(image.title !==''){
            setImages([
                ...images,
                {
                    image: image,
                    url: process.env.REACT_APP_API_URL+'main/' + image.title,
                    id: crypto.getRandomValues(new Uint16Array(4)).join('')
                }
            ])
        }
    }

    const addImages = (imagesArr) => {
        let arr = []
        for(let image of imagesArr){
            arr.push({
                image: image,
                url: process.env.REACT_APP_API_URL + image.title,
                id: crypto.getRandomValues(new Uint16Array(4)).join('')
            })
            
        }
        setImages([
            ...images,
            ...arr
        ])
    }

    const onBlur = () => {
        if (!isDirty) {
            setIsDirty(true);
        }
    };

    return {
        onChange: handleChange,
        value: images,
        onBlur,
        clear: handleClear,
        addImage,
        addImages
    };
};

export default useImageUpload;
