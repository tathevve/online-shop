import React from 'react';
import logo from "../../assets/images/header_logo.svg";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '85px',
    boxShadow: '0 3px 6px rgb(0 0 0 / 16%)',
    padding: '7px',
    '& a': {
      width:'11%',
      '& img': {
        width:'100%'
      }
    }
  },
  bagIcon: {
    '& svg': {
      width: '35%',
      height: 'auto'
    }
  },

}))

function Header() {
  const styles = useStyles();

  return (
    <div className={styles.header}>
      
      <Link to='/' ><img src={logo} alt="logo" /></Link>
      <Link to='/bag'><div className={styles.bagIcon}><ShoppingBagOutlinedIcon /></div></Link>
    </div>
  )
}

export default Header