import React, { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addItemToBag, selectBagItems, selectItems, setBagItems } from '../../../redux/slicers/app';
import Header from '../../shared/Header';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import TextField from '@mui/material/TextField';


const useStyles = makeStyles((theme) => ({
    bagTable: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
    },
    itemDescription: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '85%'
    },
    smallHeader: {
        borderBottom: '1px solid black',
        width: '100%',
        height: '85px',
        display: 'flex',
        justifyContent: 'space-evenly',
        marginBottom: '24px',
        '& p': {
            width: '11%'
        }
    },
    bagEachItem: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',

    },
    descriptionArea: {
        width: '84%',
        paddingBottom: '21px',
        display: 'flex',
        justifyContent: 'space-between'

    },
    itemName: {
        width: '50%!important'
    },
    countbagEachItem: {
        width: '40%'
    },
    countAndTotal: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '250px'
    }


}))

function Bag() {
    const bagItems = useSelector(selectBagItems);
    const styles = useStyles();
    const [cartItems, setCartItems] = useState([]);
    const dispatch = useDispatch();
    const arr = [];
    const items = useSelector(selectItems);
    const [total, setTotal] = useState(0);
    const [rowTotal, setRowTotal] = useState(0);

    useEffect(() => {
        let total = 0;
        let rowTotal = 0;
        cartItems.forEach(element => {
            const itemCount = bagItems.find(i => i.id === element.id)?.count;

            total += itemCount * element.price;
            rowTotal = itemCount * element.price;

            console.log(itemCount, 'cart')

        });

        setRowTotal(rowTotal);
        setTotal(total);
    }, [cartItems, bagItems])


    useEffect(() => {
        if (bagItems?.length && items?.length) {
            const bagItemIds = bagItems.map(i => i.id);
            const result = items.filter(i => bagItemIds.includes(i.id));
            setCartItems(result);
        }
    }, [bagItems?.length, items?.length])



    const changeQuantity = (item, typeOfOperation) => {

        const updatedCount = bagItems.map((i) => {
            if (i.id === item.id) {
                if (typeOfOperation === 'plus') {
                    return {
                        ...i,
                        count: i.count + 1,
                        price: i.price + arr[item.id - 1]
                    }
                } else if (typeOfOperation === 'minus') {
                    if (i.count - 1 <= 0) {
                        return {
                            ...i,
                            count: 0,
                            price: 0
                        }
                    } else {
                        return {
                            ...i,
                            count: i.count - 1,
                            price: i.price - arr[item.id - 1]

                        }
                    }

                }

            } else {
                return {
                    ...i
                }
            }

        })

        dispatch(setBagItems(updatedCount));

    }




    return (
        <div>
            <Header />
            <div className={styles.smallHeader}>
                <p className={styles.itemName}>Name</p>
                <p>Price</p>
                <p>Qty</p>
                <p>Total</p>
            </div>
            <div className={styles.bagTable}>

                <div className={styles.bagEachItem}>
                    {
                        cartItems.length > 0 && cartItems.map((item) => (
                            <div key={item.id} className={styles.descriptionArea}>
                                <div className={styles.itemDescription}>
                                    <img src={item.image} style={{ height: '250px' }} />
                                    <p>{item.name}</p>
                                    <p>{item.description}</p>

                                </div>
                                <div>{item.price}</div>
                            </div>
                        ))
                    }
                </div>
                <div className={styles.countbagEachItem}>
                    {
                        bagItems.length > 0 && bagItems.map((item) => (
                            <div key={item.id} className={styles.countAndTotal}>


                                <div>
                                    <p>
                                        <button onClick={() => changeQuantity(item, 'minus')}>-</button>
                                        {item.count}
                                        <button onClick={() => changeQuantity(item, 'plus')}>+</button>
                                    </p>
                                </div>

                                <div><p>{rowTotal}</p></div>
                            </div>
                        ))
                    }
                </div>



            </div>

            <hr />
            <div className={styles.totalValue}>
                <p>TOTAL:  {total}</p>
            </div>



        </div>
    )
}

export default Bag