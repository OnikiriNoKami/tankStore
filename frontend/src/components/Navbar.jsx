import { AppBar, Button, Link, Toolbar, Grid, Typography } from "@material-ui/core"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { logout } from "../asyncActions/auth"
import { AUTH_ROUTE, ADMIN_ROUTE, LOGIN_ROUTE } from "../utils/consts"

const Navbar = () => {
    const dispatch = useDispatch()

    const history = useHistory()

    const toLogin = () => {
        history.push(LOGIN_ROUTE)
    }

    const toAdmin = () => {
        history.push(ADMIN_ROUTE)
    }

    const toLogout = () => {
        dispatch(logout())
    }

    return (
        <AppBar>
            <Toolbar positiob='fixed'>
                <Grid container justifyContent='space-evenly'>
                <Grid item sm={2}>
                        <Typography variant='h4'>
                            <Button  onClick={toLogout}>
                                Logout
                            </Button>
                        </Typography>
                    </Grid>
                    <Grid item sm={2}>
                        <Typography variant='h4'>
                            <Button  onClick={toLogin}>
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