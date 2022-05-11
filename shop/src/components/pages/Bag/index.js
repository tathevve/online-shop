import React from 'react'
import { useSelector } from 'react-redux';
import { selectBagItems } from '../../../redux/slicers/app';
import Header from '../../shared/Header';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
    bagEachItem: {
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    bagTable: {
        '& ul': {
            listStyle: 'none',
            display:'flex',
            justifyContent:'space-evenly'
        }
    }

}))

function Bag() {
    const bagItems = useSelector(selectBagItems);
    const styles = useStyles();

    console.log(bagItems, 'a')

    return (
        <div>
            <Header />

            <div className={styles.bagTable}>
                <ul >
                    <li>Name</li>
                    <li>Price</li>
                    <li>Qty</li>
                    <li>Total</li>
                </ul>
            </div>
            <div className={styles.bagSection}>
                {
                    bagItems.length > 0 && bagItems.map((item) => (
                        <div key={item.id} className={styles.bagEachItem}>
                            <img src={item.image} style={{ height: '250px' }} />
                            <p>{item.name}</p>
                            <p>{item.description}</p>
                            <p>{item.price}</p>

                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Bag