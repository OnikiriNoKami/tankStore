import {
    Button,
    Container,
    Grid,
    TextField,
    Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { imageMultipleSet, tankCreate } from "../../asyncActions/creation";
import useNationSelect from "../../hooks/customSelectHooks/useNationSelect";
import useTankStatusSelect from "../../hooks/customSelectHooks/useTankStatusSelect";
import useTankTypeSelect from "../../hooks/customSelectHooks/useTankTypeSelect";
import useValidatedInput from "../../hooks/useValidatedInput";
import useNumberFormat from "../../hooks/useNumberFormat";
import useImageUpload from "../../hooks/useImageUpload";
import AddPhotoAlternate from "@material-ui/icons/AddPhotoAlternate";
import ImageCarousel from "../ImageCarousel";

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
    const handleClear = () => {
        title.clear();
        description.clear();
        nation.clear();
        tankType.clear();
        tankStatus.clear();
        priceSilver.clear();
        priceExp.clear();
        images.clear();
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
        if(result.id){
            const imageResult = await dispatch(imageMultipleSet(result.id, images.value, token))
        }
        handleClear();
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
                        <Button
                            variant="outlined"
                            component="label"
                            color="primary"
                            endIcon={<AddPhotoAlternate />}
                        >
                            <Typography variant="body1">Add image</Typography>
                            <input
                                type="file"
                                hidden
                                onChange={images.onChange}
                                onBlur={images.onBlur}
                                accept="image/*"
                            />
                        </Button>
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
                        <ImageCarousel images={images} dynamicHeight={true}/>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default TankCreator;
