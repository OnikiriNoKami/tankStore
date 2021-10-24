import {
    Button,
    Container,
    Grid,
    TextField,
    Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import useNationSelect from "../../../hooks/customSelectHooks/useNationSelect";
import useTankStatusSelect from "../../../hooks/customSelectHooks/useTankStatusSelect";
import useTankTypeSelect from "../../../hooks/customSelectHooks/useTankTypeSelect";
import useValidatedInput from "../../../hooks/useValidatedInput";
import useNumberFormat from "../../../hooks/useNumberFormat";
import useImageUpload from "../../../hooks/useImageUpload";
import AddPhotoAlternate from "@material-ui/icons/AddPhotoAlternate";
import ImageCarousel from "../../ImageCarousel";
import { useEffect, useRef, useState } from "react";
import {
    tankByIdFetch,
    tankImagesFetch,
    mainImageFetch,
} from "../../../asyncActions/fetcher";

const TankUpdater = ({ tankId, ...props }) => {
    const tankLoaded = useSelector((state) => state.tank.loaded);
    const tank = useSelector((state) => state.tank.tank);
    const tankImages = useSelector((state) => state.tank.images);
    const tankImagesLoaded = useSelector((state) => state.tank.imagesLoaded)
    const mainImage = useSelector((state) => state.mainImages.image)

    const title = useValidatedInput("", {
        isEmpty: true,
        minLength: 2,
        maxLength: 100,
    });
    const description = useValidatedInput("", {
        isEmpty: true,
        minLength: 2,
        maxLength: 900,
    });
    const imagesInCaroucel = useImageUpload();
    const priceSilver = useNumberFormat();
    const priceExp = useNumberFormat();
    const nation = useNationSelect();
    const tankType = useTankTypeSelect();
    const tankStatus = useTankStatusSelect();
    const token = useSelector((state) => state.token.token);
    const handleReset = () => {
        title.toDefault();
        description.toDefault();
        priceSilver.toDefault();
        priceExp.toDefault();
        nation.toDefault();
        tankType.toDefault();
        tankStatus.toDefault();
    };

    const dispatch = useDispatch();

    const loadTank = () => {
        if (tankId) {
            dispatch(tankByIdFetch(tankId));
        }
    };

    const loadImages = () => {
        if (tankId) {
            dispatch(tankImagesFetch(tankId));
        }
    };

    const loadMainImage = () => {
        if (tankId) {
            dispatch(mainImageFetch(tankId));
        }
    };

    const prepareDefault = () => {
        nation.setDefault(tank.nationId || "");
        tankType.setDefault(tank.tankTypeId || "");
        tankStatus.setDefault(tank.statusId || "");
        title.setDefaultValue(tank.title || "");
        description.setDefaultValue(tank.description || "");
        priceExp.setDefault(tank.priceExp.toString() || "");
        priceSilver.setDefault(tank.priceSilver.toString() || "");
    };

    useEffect(() => {
        loadTank();
        loadImages();
        loadMainImage();

    }, []);

    useEffect(() => {
        if (tankLoaded) {
            prepareDefault();
        }
    }, [tankLoaded, tank]);

    useEffect(()=>{
        if(tankImagesLoaded){
            imagesInCaroucel.addImages(tankImages)
        }
    }, [tankImagesLoaded])

    const handleSubmit = () => {};

    return (
        <Container style={{ display: "flex", justifyContent: "center" }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={10} sm={10}>
                        <Typography variant="h4">Tank modification</Typography>
                    </Grid>
                    <Grid item xs={10} sm={10}>
                        <TextField
                            label="Tank title"
                            fullWidth
                            error={title.errorStatus}
                            onChange={title.onChange}
                            value={title.value}
                            onBlur={title.onBlur}
                            autoComplete="off"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={10} sm={10}>
                        <TextField
                            label="Tank description"
                            value={description.value}
                            error={description.errorStatus}
                            onChange={description.onChange}
                            onBlur={description.onBlur}
                            variant="outlined"
                            autoComplete="off"
                            multiline
                            minRows={4}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Price silver"
                                    variant="outlined"
                                    autoComplete="off"
                                    value={priceSilver.value}
                                    onBlur={priceSilver.onBlur}
                                    error={priceSilver.error}
                                    onChange={priceSilver.onChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                    InputProps={{
                                        inputComponent: priceSilver.render,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Price exp"
                                    variant="outlined"
                                    autoComplete="off"
                                    value={priceExp.value}
                                    onBlur={priceExp.onBlur}
                                    error={priceExp.error}
                                    onChange={priceExp.onChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                    InputProps={{
                                        inputComponent: priceExp.render,
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <Typography variant="h6">
                            Select correct position in each.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <Grid
                            container
                            spacing={3}
                            justifyContent="space-between"
                        >
                            <Grid item xs={12} md={4}>
                                {nation.render()}
                            </Grid>
                            <Grid item xs={12} md={4}>
                                {tankType.render()}
                            </Grid>
                            <Grid item xs={12} md={4}>
                                {tankStatus.render()}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <Grid container>
                            <Grid item xs={12} sm={4} md={3}>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    color="primary"
                                    endIcon={<AddPhotoAlternate />}
                                >
                                    <Typography variant="body1">
                                        Add image
                                    </Typography>
                                    <input
                                        type="file"
                                        hidden
                                        onChange={imagesInCaroucel.onChange}
                                        onBlur={imagesInCaroucel.onBlur}
                                        accept="image/*"
                                    />
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={8} md={9}></Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={10} sm={10}>
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Button
                                    onClick={handleSubmit}
                                    variant="outlined"
                                    disabled={
                                        title.isDefault &&
                                        description.isDefault &&
                                        nation.isDefault &&
                                        tankStatus.isDefault &&
                                        tankType.isDefault &&
                                        priceSilver.isDefault &&
                                        priceExp.isDefault
                                    }
                                    color="primary"
                                >
                                    Save
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    onClick={handleReset}
                                    variant="outlined"
                                    disabled={
                                        title.isDefault &&
                                        description.isDefault &&
                                        nation.isDefault &&
                                        tankStatus.isDefault &&
                                        tankType.isDefault &&
                                        priceSilver.isDefault &&
                                        priceExp.isDefault
                                    }
                                    color="secondary"
                                >
                                    Default
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <ImageCarousel
                            images={imagesInCaroucel}
                            checkedMain={false}
                            handleChecked={() => {}}
                            dynamicHeight={true}
                        />
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default TankUpdater;
