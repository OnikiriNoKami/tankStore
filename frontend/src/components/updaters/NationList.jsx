import { Button, Container, Grid, Typography } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { nationFetch } from "../../asyncActions/fetcher"
import { useEffect } from "react"


const NationList = () => {
    const dispatch = useDispatch()
    const nations = useSelector(state => state.nations.nations)

    useEffect(()=>{
        dispatch(nationFetch())
    },[])

    return (
        <Container>
            <Grid container spacing={3} justifyContent='center'>

            {nations.length !== 0 ? nations.map((nation) => {
                return (
                    <Grid key={nation.id} item xs={10} sm={7}>
                        <Grid container>
                            <Grid item xs={2} sm={3}>
                                <Typography  variant='h4'>{nation.id}</Typography>
                            </Grid>
                            <Grid item xs={10} sm={9}>
                                <Typography  variant='h4'>{nation.title}</Typography>
                            </Grid>

                        </Grid>


                        
                        
                    </Grid>
                )
            })
            :
            <Typography variant='h4'>No nations</Typography>
            }
            </Grid>
        </Container>
    )
}

export default NationList

