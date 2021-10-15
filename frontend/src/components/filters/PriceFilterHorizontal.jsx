import useNumberFormat from "../../hooks/useNumberFormat";
import { Grid, TextField } from "@material-ui/core";
import { useEffect } from "react";

const PriceFilterHorizontal = ({ clear, setClear,filterGetter, filterValid }) => {
    const priceExpM = useNumberFormat();
    const priceExpL = useNumberFormat();
    const priceSilvM = useNumberFormat();
    const priceSilvL = useNumberFormat();
    useEffect(() => {
        filterGetter([
            { key: "silvPrLess", value: priceSilvL.value },
            { key: "silvPrMore", value: priceSilvM.value },
            { key: "expPrLess", value: priceExpL.value },
            { key: "expPrMore", value: priceExpM.value },
        ]);
    }, [priceExpM.value, priceExpL.value, priceSilvL.value, priceSilvM.value]);

    useEffect(() => {
        if (
            priceExpM.validInput ||
            priceExpL.validInput ||
            priceSilvL.validInput ||
            priceSilvM.validInput
        ) {
            filterValid(true);
        } else {
            filterValid(false);
        }
    }, [
        priceExpM.validInput,
        priceExpL.validInput,
        priceSilvL.validInput,
        priceSilvM.validInput,
    ]);

    useEffect(() => {
        if(clear){
            setClear(false);
            priceExpL.clear()
            priceExpM.clear()
            priceSilvL.clear()
            priceSilvM.clear()
        }
    }, [clear]);

    return (
        <Grid container spacing={3}>
            <Grid item xs={6} md={3}>
                <TextField
                    label="More exp then"
                    autoComplete="off"
                    value={priceExpM.value}
                    onBlur={priceExpM.onBlur}
                    onChange={priceExpM.onChange}
                    fullWidth
                    InputProps={{
                        inputComponent: priceExpM.render,
                    }}
                />
            </Grid>
            <Grid item xs={6} md={3}>
                <TextField
                    label="Less exp then"
                    autoComplete="off"
                    value={priceExpL.value}
                    onBlur={priceExpL.onBlur}
                    onChange={priceExpL.onChange}
                    fullWidth
                    InputProps={{
                        inputComponent: priceExpL.render,
                    }}
                />
            </Grid>
            <Grid item xs={6} md={3}>
                <TextField
                    label="More silver then"
                    autoComplete="off"
                    value={priceSilvM.value}
                    onBlur={priceSilvM.onBlur}
                    onChange={priceSilvM.onChange}
                    fullWidth
                    InputProps={{
                        inputComponent: priceSilvM.render,
                    }}
                />
            </Grid>
            <Grid item xs={6} md={3}>
                <TextField
                    label="Less silver then"
                    autoComplete="off"
                    value={priceSilvL.value}
                    onBlur={priceSilvL.onBlur}
                    onChange={priceSilvL.onChange}
                    fullWidth
                    InputProps={{
                        inputComponent: priceSilvL.render,
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default PriceFilterHorizontal;
