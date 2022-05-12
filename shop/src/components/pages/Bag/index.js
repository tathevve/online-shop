import React, { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectBagItems, selectItems, setBagItems } from '../../../redux/slicers/app';
import Header from '../../shared/Header';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import TextField from '@mui/material/TextField';


const useStyles = makeStyles((theme) => ({
    bagTable: {
        width: '100%',
    },
    itemDescription: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '85%'
    },
    smallHeader: {
        '& th': {
            borderBottom: '1px solid black'

        },
        height: '85px',
    },
    bagEachItem: {
        '& td': {
            margin: '11px'

        }
    },
    totalValue: {
        fontSize: '33px',
        padding: '15px',

    }

}))

function Bag() {
    const bagItems = useSelector(selectBagItems);
    const styles = useStyles();
    const dispatch = useDispatch();
    const arr = [];
    const items = useSelector(selectItems);
    let total = 0;

    const getPrice = items.map((item) => {
        arr.push(item.price);
    })

    const changeQuantity = (item, typeOfOperation) => {

        const updatedCount = bagItems.map((i) => {
            if (i.id == item.id) {
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
                            price: arr[item.id - 1]
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

    const totalPrice = bagItems.forEach(element => {
        total = total + element.price
    });


    return (
        <div>
            <Header />

            <table className={styles.bagTable}>
                <tr className={styles.smallHeader}>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                </tr>


                {
                    bagItems.length > 0 && bagItems.map((item) => (
                        <tr className={styles.bagEachItem}>
                            <td key={item.id} className={styles.itemDescription}>
                                <img src={item.image} style={{ height: '250px' }} />
                                <p>{item.name}</p>
                                <p>{item.description}</p>

                            </td>
                            <td>{arr[item.id - 1]}</td>

                            <td><p><button onClick={() => changeQuantity(item, 'minus')}>-</button> {item.count} <button onClick={() => changeQuantity(item, 'plus')}>+</button>
                            </p></td>

                            <td><p>{item.price}</p></td>

                        </tr>
                    ))
                }


                <hr />
                <div className={styles.totalValue}>
                    <p>TOTAL:  {total}</p>
                </div>


            </table>
        </div>
    )
}

export default Bag