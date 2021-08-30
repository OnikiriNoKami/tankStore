import { Button } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { nationFetch } from "../../asyncActions/fetcher"
import { tankTypeUpdater } from "../../asyncActions/updating"


const NationList = () => {
    const dispatch = useDispatch()

    const handleClick = () => {
        console.log('Click')
        dispatch(nationFetch())
    }


    return (<Button onClick={handleClick}>
        Update
    </Button>)
}

export default NationList