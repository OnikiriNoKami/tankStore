import { useState } from "react";

const useImageUpload = () => {
    const [images, setImages] = useState([]);
    const [isDirty, setIsDirty] = useState(false);

    const handleClear = () => {
        setImages([])
        setIsDirty(false)
    }

    const handleChange = (event) => {
        if (event.target.files[0]) {
            setImages([...images, event.target.files[0]]);
        }
    };

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
    };
};

export default useImageUpload;
