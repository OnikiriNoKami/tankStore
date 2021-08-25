import { makeStyles } from "@material-ui/core";


const ListStyles = makeStyles((theme) => {
    return {
        list:{
            padding: 0,
            margin: 0,
            width: "100%",
        },
        item: {
            paddingLeft: '30px'
        }
    }
})

export default ListStyles