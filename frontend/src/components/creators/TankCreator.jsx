import { Button, Container, Grid, TextField, Typography } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { tankCreate } from "../../asyncActions/creation"
import useNationSelect from "../../hooks/customSelectHooks/useNationSelect"
import useTankStatusSelect from "../../hooks/customSelectHooks/useTankStatusSelect"
import useTankTypeSelect from "../../hooks/customSelectHooks/useTankTypeSelect"
import useValidatedInput from "../../hooks/useValidatedInput"


const TankCreator = () => {
    const title = useValidatedInput('', {isEmpty: true, minLength: 2, maxLength: 100})
    const nation = useNationSelect()
    const tankType = useTankTypeSelect()
    const tankStatus = useTankStatusSelect()
    const token = useSelector(state => state.token.token)
    const dispatch = useDispatch()

    const handleClear = () => {
        title.clear()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //dispatch(tankCreate())
        handleClear()
    }

    return (
        <Container style={{display: 'flex', justifyContent:'center'}}>
            {nation.render()}
            {tankType.render()}
            {tankStatus.render()}
        </Container>
    )

}

export default TankCreator