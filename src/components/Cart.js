import React, { useState,useRef } from "react";
import {
  Badge,
  IconButton,
  Tooltip,
  Modal,
  Box,
  Typography,
  Snackbar
} from "@mui/material";
import {
  ShoppingCart,
  AddCircle,
  RemoveCircle,
  HighlightOff,
} from "@mui/icons-material";
import style from "../styles/Cart.module.css";
import { initializeFirestore } from "../helperfunctions/firebase";
import {userCollection} from "../Constants";
import {doc,setDoc,updateDoc} from 'firebase/firestore';


const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};




function Cart(props) {
  const { cartItems, userAccountDetails,setUserAccountDetails } = props;
  const [db] = useState(() => initializeFirestore());
  const [showModal, setShowModal] = useState(false);
  const [cartItemsNew,setCartItemsNew] = useState(cartItems);
  const[add,setAdd] =useState(0);

  const remove = (data) => {

    const userDoc = doc(db, userCollection, userAccountDetails.userId);
    const itemAlreadyExistsInCart = userAccountDetails.cartItems.findIndex(
        (x) => x.itemId === data.itemId
      );
    cartItems.splice(itemAlreadyExistsInCart,1);

      console.log(cartItems)
       
      updateDoc(userDoc, {
          
    })
    updateDoc(userDoc,{
        cartItems
    })
    setCartItemsNew(cartItems)
    setAdd(add+1)
  }
 
  const increment = (data) => {
      
    const userDoc = doc(db, userCollection, userAccountDetails.userId);
    console.log(userDoc);
    const itemAlreadyExistsInCart = userAccountDetails.cartItems.findIndex(
        (x) => x.itemId === data.itemId
      );
   
      
      
      if(data.itemCount>0){
        cartItems[itemAlreadyExistsInCart].itemCount = cartItems[itemAlreadyExistsInCart].itemCount + 1 ;
      
      
      updateDoc(userDoc, {
          
      })
      updateDoc(userDoc,{
          cartItems
      })
      setCartItemsNew(cartItems);
      setAdd(add+1)
    
      }
    }

    const decrement = (data) => {
      
        const userDoc = doc(db, userCollection, userAccountDetails.userId);
        console.log(userDoc);
        const itemAlreadyExistsInCart = userAccountDetails.cartItems.findIndex(
            (x) => x.itemId === data.itemId
          );
       
          
          
          if(data.itemCount>1){
            cartItems[itemAlreadyExistsInCart].itemCount = cartItems[itemAlreadyExistsInCart].itemCount -1 ;
          
          
          updateDoc(userDoc, {
              
          })
          updateDoc(userDoc,{
              cartItems
          })
          setCartItemsNew(cartItemsNew+1);
          setAdd(add+1)
        
          }
        

        }  
         
     

  const toogleModal = (state) => {
    setShowModal(state);
  };

  return (
    <>
      <Tooltip title="Cart">
        <IconButton
          size="large"
          color="inherit"
          onClick={() => toogleModal(true)}
        >
          <Badge badgeContent={cartItems.length} color="primary">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Tooltip>
      <Modal open={showModal} onClose={() => toogleModal(false)}>
        <Box sx={modalStyle}>
          {cartItems.map((item, index) => (
            <Box className={style.cartItem} key={index}>
              <Box className={style.imageContainer}>
                <img src={item.itemImage} alt="" />
              </Box>
              <Typography>{item.itemTitle}</Typography>
              <Tooltip title="increment">
                <AddCircle className={style.addRemoveIcon}  onClick = {() => { increment(item) } }/>
              </Tooltip>
              <span className={style.spacing}>{item.itemCount}</span>
              <Tooltip title="decrement">
                <RemoveCircle className={style.addRemoveIcon} onClick = {() => { decrement(item) } }/>
              </Tooltip>
              <span className={style.spacing} />
              <Tooltip title="Remove">
                <HighlightOff className={style.addRemoveIcon} onClick = {() => {remove(item)}}/>
              </Tooltip>
            </Box>
          ))}
        </Box>
      </Modal>
    </>
  );
}

export default Cart;