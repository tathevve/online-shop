import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectBagItems, selectItems, setBagItems } from '../../../redux/slicers/app'
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
    const bagItems = useSelector(selectBagItems);
    const dispatch = useDispatch();



    const addToBagHandler = (item) => {



        const findedItem = bagItems.find((i) => i.id === item.id)


        if (findedItem) {
            const updatedData = bagItems.map((i) => {
                if (i.id === findedItem.id) {
                    return {
                        ...i,
                        count: i.count + 1,
                        price: item.price * (i.count + 1)
                    }
                } else {
                    return i
                }
            })
            dispatch(setBagItems(updatedData))

        } else {
            dispatch(setBagItems([...bagItems, item]))

        }


    }

    console.log(bagItems)
    return (
        <div>
            <Header />
            <div className={styles.itemsArea}>
                {
                    items.length > 0 && items.map((item) => (
                        <div key={item.id}>
                            <img src={item.image} style={{ height: '250px' }} />
                            <p>{item.name}</p>
                            <p>{item.description}</p>
                            <p>{item.price}</p>

                            <Button variant="outlined" onClick={() => addToBagHandler(item)}>Add To Bag <AddIcon /></Button>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Home


