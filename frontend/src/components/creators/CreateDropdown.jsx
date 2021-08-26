import { Accordion, AccordionDetails, AccordionSummary, Button, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import { useHistory } from 'react-router-dom';
import AccordionStyles from '../../styles/AccordionStyles';
import ListStyles from '../../styles/ListStyles';
import { ADMIN_ROUTE } from '../../utils/consts';
import createItems from '../../utils/menuCreateItems';

const CreateDropdown = () => {
    const classesList = ListStyles()
    const classesAccordion = AccordionStyles()
    const history = useHistory()

    const handleCreateClick = (text) => {
       history.push(`${ADMIN_ROUTE}/create&${text}`)
    }

    return (
        <Accordion className={classesAccordion.accordion}>
            <AccordionSummary
                expandIcon={<ArrowDropDownOutlinedIcon/>}    
            >
                <Typography variant='h6'>
                    Create
                </Typography>
            </AccordionSummary>
            <AccordionDetails className={classesAccordion.details}>
                <List 
                    className={classesList.list}
                >
                    {createItems.map(item => (
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

export default CreateDropdown