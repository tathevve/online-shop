import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { selectBagItems, selectItems } from '../../../redux/slicers/app';
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
        width: '31%'
    },
    countAndTotal: {
        display: 'flex',
        justifyContent: 'space-between',
        height: '250px'
    },
    priceItem: {
        width:'29%',
        textAlign:'center'
    }


}))

function Bag() {
    const bagItems = useSelector(selectBagItems);
    const styles = useStyles();
    const [cartItems, setCartItems] = useState([]);
    const items = useSelector(selectItems);
    const [total, setTotal] = useState(0);
    const [rowTotal, setRowTotal] = useState(0);



    useEffect(() => {
        let total = 0;

        cartItems.forEach(element => {
            total += element.count * element.price;

        });

        setTotal(total);
    }, [cartItems, bagItems])


    useEffect(() => {
        if (bagItems?.length && items?.length) {
            const bagItemUpdatedList = bagItems.map(i => i);
            const result = items.map(i => {
                return {
                    ...i,
                    id: bagItemUpdatedList.find((m) => m.id === i.id)?.id,
                    count: bagItemUpdatedList.find((m) => m.id === i.id)?.count,
                }
            });
            setCartItems(result);
        }
    }, [bagItems?.length, items?.length])



    useEffect(() => {
        const updatedCount = cartItems.map((element) => {
            return {
                id: element.id,
                rowTotal: element.count * element.price
            }

        })

        setRowTotal(updatedCount);

    }, [cartItems, bagItems])





    const valueOfInput = useCallback((value, id) => {
        const updatedList = cartItems.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    count: parseInt(value)
                }
            } else {
                return {
                    ...item
                }
            }
        })
        setCartItems(updatedList)

    }, [cartItems])




    useEffect(() => {
        const removedItemsId = cartItems.find((i) => i.count === 0)?.id;
        if (removedItemsId) {
            const removedItem = cartItems.filter(p => p.id !== removedItemsId);
            setCartItems(removedItem)
        }

    }, [cartItems])

    const checkRowTotal = useCallback((id) => {
        return rowTotal?.length > 0 && rowTotal.find((item) => item.id === id)?.rowTotal;
    }, [rowTotal])

    console.log(cartItems,'cartItems')
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
                                <div className={styles.priceItem}>{item.price}</div>

                                <div className={styles.countbagEachItem}>
                                    <div className={styles.countAndTotal}>
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
                                        <div>{checkRowTotal(item.id)}</div>

                                    </div>
                                </div>

                            </div>
                        ))
                    }
                </div>
                {/* 
                    {
                        bagItems.length > 0 && bagItems.map((item) => {

                            return item.count > 0 ? (
                                
                                    <div>
                                            
                                    </div>
                                   
                                </div>
                            ) : null
                        })
                    }
                </div> */}



            </div>

            <hr />
            <div className={styles.totalValue}>
                <p>TOTAL:  {total}</p>
            </div>



        </div>
    )
}

export default Bag