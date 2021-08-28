import { Accordion, AccordionDetails, AccordionSummary, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import { useHistory } from 'react-router-dom';
import AccordionStyles from '../../styles/AccordionStyles';
import ListStyles from '../../styles/ListStyles';
import { ADMIN_ROUTE } from '../../utils/consts';
import updateItems from '../../utils/menuUpdateItems';

const UpdateDropdown = () => {
    const classesList = ListStyles()
    const classesAccordion = AccordionStyles()
    const history = useHistory()

    const handleCreateClick = (text) => {
       history.push(`${ADMIN_ROUTE}/change&${text}`)
    }

    return (
        <Accordion className={classesAccordion.accordion}>
            <AccordionSummary
                expandIcon={<ArrowDropDownOutlinedIcon/>}    
            >
                <Typography variant='h6'>
                   Change
                </Typography>
            </AccordionSummary>
            <AccordionDetails className={classesAccordion.details}>
                <List 
                    className={classesList.list}
                >
                    {updateItems.map(item => (
                        <ListItem
                            className={classesList.item}
                            button
                            key={item.text}
                            onClick={()=>handleCreateClick(item.text)}                     
                        >
                            <ListItemText  primary={item.text}/>
                        </ListItem>
                    ))}
                </List>
            </AccordionDetails>
        </Accordion>
    )
}

export default UpdateDropdown