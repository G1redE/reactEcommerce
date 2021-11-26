import React, { Component,useRef,useState} from 'react';
import style from '../styles/LoginPage.module.css';
import {Box,OutlinedInput,FormControl,InputLabel,InputAdornment,Button,Typography,Snackbar,styled} from'@mui/material';
import{Email,Lock,VisibilityOff,Visibility,Login,Phone,Google, Mail} from '@mui/icons-material';
import{Link,useHistory} from 'react-router-dom';
import Alert from '../components/Alert';
import { getAuth,RecaptchaVerifier,signInWithPhoneNumber,signInWithPopup,GoogleAuthProvider} from "firebase/auth";
import { firebaseConfig } from '../Constants';


const provider = new GoogleAuthProvider();




const OutlineTextInput = styled(OutlinedInput)({
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor:"#fff"
    } 
    })
    const Label =styled(InputLabel)({
        "&.MuiInputLabel-root.Mui-focused":{
            color:"#fff"
        }
    
    })
    const LoginButton =styled(Button)({
        backgroundColor:"#969884",
        color:"#000",
        "&:hover":{
            backgroundColor:"#898b89"
        },
        "&:focus":{
            backgroundColor:"#fff"
        }
    })
    
function PhoneLogin() {

    const history = useHistory();
    const [phone,setPhone] = useState("");
    const [isPhone,setIsPhone] =useState(false);
    const [otp,setOTP] =useState("")
    const [showSnackBar, setShowSnackbar] =useState(false);
    const snackbarMessage =useRef("");
    
    const googlelogin =() => {
        const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
    // The signed-in user info.
     history.push("/");

    // ...
  })
  .catch((error) => {
    snackbarMessage.current = error.message;
    setShowSnackbar(true);
    console.log(error);
    return;
  });
    }
    const maillogin = () =>{
        history.push('/login');
    }

   const handleClick = () => {
        console.log(phone);
        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
             console.log("hi");
             onSignIn();
            }
          }, getAuth());
        

    }
    
    const onSignIn = () => {
    handleClick();
    const appVerifier = window.recaptchaVerifier;
    let Phonenumber = "+91" + phone;
    console.log(Phonenumber);
    signInWithPhoneNumber(getAuth(), Phonenumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      let otp =prompt("Enter the OTP","");
      confirmationResult.confirm(otp).then((result) => {
          // User signed in successfully.
          history.push('/');
          // ...
        }).catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
        });
      // ...
      
    }).catch((error) => {
      
    });
    
       

    

             
            
    }



    return ( 
        
        <Box className={style.box}>
       
        <Typography variant='h4'>LogIn</Typography>
        <FormControl className={style.formControl}>
            <Label htmlFor="outline-adorment-phone">Phone</Label>
            <OutlineTextInput
            id="outline-adorment-phone"
            value={phone}
            type='number'
            label='Phone'
            required={true}

            onChange={(event) => setPhone(event.target.value)}
            startAdornment={
                <InputAdornment position='start'>
                    <Phone/>
                </InputAdornment>
            }
            
           
            />
        </FormControl>
        <Box className={style.LoginButton}>  
                <LoginButton id='sign-in-button'  fullWidth variant="contained" startIcon={<Login/>} onClick= {
                    ()=>{if(phone!=="" && phone.length===10){
                   
                    onSignIn();
                    }

                    else alert("give correct number")
            }}>Submit Number</LoginButton>
            </Box>
            <Box className={style.LoginButton} id='googlebtnbox'>
                <LoginButton fullWidth id={style.googlebtn} variant="contained" startIcon={<Google/>} onClick={googlelogin}>LogIn using Google</LoginButton>
            </Box>
            <Box className={style.LoginButton} id='googlebtnbox'>
                <LoginButton fullWidth id={style.mailbtn} variant="contained" startIcon={<Mail/>} onClick={maillogin}>LogIn using Mail</LoginButton>
            </Box>
        </Box>
    );
}



export default PhoneLogin;