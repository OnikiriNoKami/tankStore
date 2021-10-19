import {
    Button,
    Container,
    Grid,
    TextField,
    Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { imageMultipleSet, mainImageSet, tankCreate, imageSingleSet } from "../../asyncActions/creation";
import useNationSelect from "../../hooks/customSelectHooks/useNationSelect";
import useTankStatusSelect from "../../hooks/customSelectHooks/useTankStatusSelect";
import useTankTypeSelect from "../../hooks/customSelectHooks/useTankTypeSelect";
import useValidatedInput from "../../hooks/useValidatedInput";
import useNumberFormat from "../../hooks/useNumberFormat";
import useImageUpload from "../../hooks/useImageUpload";
import AddPhotoAlternate from "@material-ui/icons/AddPhotoAlternate";
import ImageCarousel from "../ImageCarousel";
import { useState } from "react";

const TankCreator = () => {
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
    const images = useImageUpload();
    const priceSilver = useNumberFormat();
    const priceExp = useNumberFormat();
    const nation = useNationSelect();
    const tankType = useTankTypeSelect();
    const tankStatus = useTankStatusSelect();
    const token = useSelector((state) => state.token.token);
    const dispatch = useDispatch();
    const [checkedMain, setCheckedMain] = useState("");
    const handleClear = () => {
        title.clear();
        description.clear();
        nation.clear();
        tankType.clear();
        tankStatus.clear();
        priceSilver.clear();
        priceExp.clear();
        images.clear();
        setCheckedMain("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(
            tankCreate(
                title.value,
                description.value,
                priceSilver.value,
                priceExp.value,
                nation.selected,
                tankType.selected,
                tankStatus.selected,
                token
            )
        );
        if (result.id) {
            if(images.value.length > 1){
                const imageResult = await dispatch(
                    imageMultipleSet(result.id, images.value, token)
                );
            }

            if(images.value.length === 1){
                const imageResult = await dispatch(
                    
                    imageSingleSet(result.id, images[0].value, token)
                );
            }

            if(checkedMain!==''){
                const mainImgRes = await dispatch(
                    mainImageSet(result.id, images.value.find(elem=>elem.id===checkedMain), token)
                )
            }
        }
        handleClear();
    };

    const handleChecked = (code) => {
        if (checkedMain !== code) {
            setCheckedMain(code);
        } else {
            setCheckedMain("");
        }
    };

    return (
        <Container style={{ display: "flex", justifyContent: "center" }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={10} sm={10}>
                        <Typography variant="h4">Tank creation</Typography>
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
                                        onChange={images.onChange}
                                        onBlur={images.onBlur}
                                        accept="image/*"
                                    />
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={8} md={9}>
                                {images.value.length!==0 ? checkedMain === "" ? (
                                    <Typography color='secondary' variant="h6">
                                        Main image not choosed.
                                    </Typography>
                                ) : (
                                    <Typography color='primary' variant="h6">
                                        Main image choosed.
                                    </Typography>
                                ):
                                <Typography color='secondary' variant="h6">
                                        No images uploaded!
                                    </Typography>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={10} sm={10}>
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <Button
                                    onClick={handleSubmit}
                                    variant="outlined"
                                    disabled={
                                        !title.validInput ||
                                        !description.validInput ||
                                        !nation.validInput ||
                                        !tankStatus.validInput ||
                                        !tankType.validInput ||
                                        !priceSilver.validInput ||
                                        !priceExp.validInput
                                    }
                                    color="primary"
                                >
                                    Create
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    onClick={handleClear}
                                    variant="outlined"
                                    disabled={
                                        title.isEmpty &&
                                        description.isEmpty &&
                                        !nation.dirty &&
                                        !tankStatus.dirty &&
                                        !tankType.dirty &&
                                        !priceSilver.dirty &&
                                        !priceExp.dirty
                                    }
                                    color="secondary"
                                >
                                    Clear
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={10}>
                        <ImageCarousel
                            images={images}
                            checkedMain={checkedMain}
                            handleChecked={handleChecked}
                            dynamicHeight={true}
                        />
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default TankCreator;
