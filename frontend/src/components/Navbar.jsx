import { AppBar, Button, Link, Toolbar, Grid, Typography } from "@material-ui/core"
import { useHistory } from "react-router-dom"
import { AUTH_ROUTE, ADMIN_ROUTE } from "../utils/consts"

const Navbar = () => {
    const history = useHistory()

    const toReg = () => {
        history.push(AUTH_ROUTE)
    }

    const toAdmin = () => {
        history.push(ADMIN_ROUTE)
    }

    return (
        <AppBar>
            <Toolbar>
                <Grid container justifyContent='space-evenly'>
                    <Grid item sm={2}>
                        <Typography variant='h4'>
                            <Button  onClick={toReg}>
                                To reg
                            </Button>
                        </Typography>
                    </Grid>
                    <Grid item sm={2}>
                        <Typography variant='h4'>
                            <Button  onClick={toAdmin}>
                                To admin
                            </Button>
                        </Typography>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar