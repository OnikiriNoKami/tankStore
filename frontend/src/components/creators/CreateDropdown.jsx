import { Accordion, AccordionDetails, AccordionSummary, Button, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import AccordionStyles from '../../styles/AccordionStyles';
import ListStyles from '../../styles/ListStyles';
import createItems from '../../utils/menuCreateItems';

const CreateDropdown = () => {
    const classesList = ListStyles()
    const classesAccordion = AccordionStyles()

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
                <List className={classesList.list}>
                    {createItems.map(item => (
                        <ListItem
                            className={classesList.item}
                            button
                            key={item.text}
                        >
                            <ListItemText primary={item.text}/>
                        </ListItem>
                    ))}
                </List>
            </AccordionDetails>
        </Accordion>
    )
}

export default CreateDropdown