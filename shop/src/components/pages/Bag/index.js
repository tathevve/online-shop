import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectBagItems, selectItems, setBagItems } from '../../../redux/slicers/app';
import Header from '../../shared/Header';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { TextField } from '@mui/material';


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
    const items = useSelector(selectItems);
    const [total, setTotal] = useState(0);
    const [rowTotal, setRowTotal] = useState(0);
    const [value, setValue] = useState(bagItems);



    useEffect(() => {
        let total = 0;

        cartItems.forEach(element => {
            const itemCount = bagItems.find(i => i.id === element.id)?.count;

            total += itemCount * element.price;

        });

        setTotal(total);
    }, [cartItems, bagItems])


    useEffect(() => {
        if (bagItems?.length && items?.length) {
            const bagItemIds = bagItems.map(i => i.id);
            const result = items.filter(i => bagItemIds.includes(i.id));
            setCartItems(result);
        }
    }, [bagItems?.length, items?.length])



    useEffect(() => {
        const updatedCount = cartItems.map((element) => {
            const itemCount = bagItems.find(i => i.id === element.id)?.count;
            return {
                id: element.id,
                rowTotal: itemCount * element.price
            }

        })

        setRowTotal(updatedCount);

    }, [cartItems, bagItems])




    const changeQuantity = (e, id) => {

        const newValue = valueOfInput(e, id)
        console.log(newValue);

        // setValue(newValue)
        // setValue(e)  
        // dispatch(setBagItems(e))

        // const updatedCount = bagItems.map((i) => {
        //     if (i.id === item.id) {
        //         //setValue(e)
        //         return {
        //             ...i,
        //             count:e
        //         }
        //     }
        // })

        // const updatedCount = bagItems.map((i) => {
        //     if (i.id === item.id) {
        //         if (typeOfOperation === 'plus') {
        //             return {
        //                 ...i,
        //                 count: i.count + 1,

        //             }
        //         } else if (typeOfOperation === 'minus') {
        //             if (i.count - 1 <= 0) {
        //                 return {
        //                     ...i,
        //                     count: 0
        //                 }
        //             } else {
        //                 return {
        //                     ...i,
        //                     count: i.count - 1,

        //                 }
        //             }
        //         }
        //     } else {
        //         return {
        //             ...i
        //         }
        //     }

        // })

        // dispatch(setBagItems(updatedCount));

    }

    const valueOfInput = useCallback((e, id) => {
        // console.log(e)

        //  console.log(id)
        const newCount = bagItems.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    count: parseInt(e)
                }
            } else {
                return {
                    ...item
                }
            }
        })

        console.log(newCount,'newCount')
        dispatch(setBagItems(newCount))

    }, [bagItems])



    
    useEffect(() => {
        const removedItemsId = bagItems.find((i) => i.count === 0)?.id;
        console.log(removedItemsId,'removedItemsId')
        if (removedItemsId) {
            const removedItem = cartItems.filter(p => p.id !== removedItemsId);
            console.log(removedItem, 'removedItemFilter')
            setCartItems(removedItem)
        }

    }, [bagItems])

    const checkRowTotal = useCallback((id) => {
        return rowTotal?.length > 0 && rowTotal.find((item) => item.id === id)?.rowTotal;
    }, [rowTotal])

    console.log(cartItems, 'cartItem');
    
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
                                    <img src={item.image} alt="image" style={{ height: '250px' }} />
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
                        bagItems.length > 0 && bagItems.map((item) => {

                            return item.count > 0 ? (
                                <div key={item.id} className={styles.countAndTotal}>
                                    <div>
                                        <p>
                                            <TextField
                                                id="outlined-number"
                                                label="Number"
                                                type="number"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                onChange={(e) => valueOfInput(e.target.value, item.id)}

                                                value={item.count}

                                            />

                                        </p>
                                    </div>
                                    <div><p>{checkRowTotal(item.id)}</p></div>
                                </div>
                            ) : null
                        })
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