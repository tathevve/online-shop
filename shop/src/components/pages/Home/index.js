import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToBag, selectItems } from '../../../redux/slicers/app'
import Header from '../../shared/Header';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    itemsArea: {
        display: 'flex',
        justifyContent: 'space-evenly',
        marginTop: '35px',
        marginBottom: '55px'
    }
}))


function Home() {
    const items = useSelector(selectItems);
    const styles = useStyles();
    const dispatch = useDispatch();

    return (
        <div>
            <Header />
            <div className={styles.itemsArea}>
                {
                    items?.length > 0 && items.map((item) => (
                        <div key={item.id}>
                            <img src={item.image} style={{ height: '250px' }} />
                            <p>{item.name}</p>
                            <p>{item.description}</p>
                            <p>{item.price}</p>

                            <Button variant="outlined" onClick={() => dispatch(addItemToBag(item.id))}>Add To Bag <AddIcon /></Button>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Home


