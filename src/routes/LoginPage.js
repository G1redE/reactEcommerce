import React, { Component, useState,useRef } from 'react';
import style from '../styles/LoginPage.module.css';
import {Box,OutlinedInput,FormControl,InputLabel,InputAdornment,Button,Typography,Snackbar,styled} from'@mui/material';
import{Email,Lock,VisibilityOff,Visibility,Login,Google,Phone, StayCurrentLandscapeOutlined} from '@mui/icons-material';
import{Link,useHistory} from 'react-router-dom';
import Alert from '../components/Alert';
import { getAuth, signInWithEmailAndPassword,signInWithPopup, GoogleAuthProvider,onAuthStateChanged, signInWithCredential,} from "firebase/auth";
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import {firebaseConfig,userJson,cartItemJson,userCollection} from '../Constants';
import {setDoc,doc} from 'firebase/firestore';
import { initializeFirestore } from '../helperfunctions/firebase';
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


function LoginPage(props) {
    const history = useHistory();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [isPasswordVisible,setIsPassWordVisible] =useState(false);
    const [showSnackBar, setShowSnackbar] =useState(false);
    const snackbarMessage =useRef("");
    const [db] = useState(()=> initializeFirestore());


    const phonelogin =() => {
        history.push('/login/phone');
    }
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
    const login = () => {
        if(!email||!password){
            snackbarMessage.current= "Email/Password seems to be empty";
            setShowSnackbar(true);
            return;
        }
        signInWithEmailAndPassword(getAuth(), email, password)
        .then((userCredentials) => {
            let data  =JSON.parse(JSON.stringify(userJson));
            data.userEmail =userCredentials?.user?.email || email;
            data.userId = userCredentials?.user?.uid;
            return  setDoc(doc(db,userCollection,userCredentials?.user?.uid),
            data
            );
        }).then((documentref) => {
            console.log(documentref);
            history.push("/");
        })
        .catch((error) => {
            snackbarMessage.current = error.message;
            setShowSnackbar(true);
            console.log(error);
            return;
        })
    };


    return (

            <Box className={style.box}>
                <Typography variant='h4'>LogIn</Typography>
                <FormControl className={style.formControl}>
                    <Label htmlFor="outline-adorment-email">Email</Label>
                    <OutlineTextInput
                    id="outline-adorment-email"
                    value={email}
                    type='email'
                    onChange={(event) => setEmail(event.target.value)}
                    startAdornment={
                        <InputAdornment position='start'>
                            <Email/>
                        </InputAdornment>
                    }
                    label='Email'
                    required
                    />
                </FormControl>

                <FormControl className={style.formControl}>
                    <Label htmlFor="outline-adorment-password">Password</Label>
                    <OutlineTextInput
                    id="outline-adorment-password"
                    value={password}
                    type={isPasswordVisible?"text":"password"}
                    onChange={(event) => setPassword(event.target.value)}
                    startAdornment={
                        <InputAdornment position='start'>
                            <Lock/>
                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position='end'>
                         {isPasswordVisible ?  (<Visibility className={style.passwordIcon} onClick={() => setIsPassWordVisible((prev) => !prev)}/>) : (<VisibilityOff className={style.passwordIcon} onClick={() => setIsPassWordVisible((prev) => !prev)}/> ) }  
                        </InputAdornment>
                    }
                    label='Password'
                    required
                    />
                </FormControl>
            <Box className={style.LoginButton}>
                <LoginButton fullWidth variant="contained" startIcon={<Login/>} onClick={login}>LogIn</LoginButton>
            </Box>
            <Box className={style.signupbtn}>
                <Typography variant="subtitle1">
                    Don't have an Account?
                    <span className={style.span}></span>
                    <Link to="/signup">SignUp</Link>
                </Typography>
            </Box>
            <Box className={style.LoginButton}>
                <LoginButton fullWidth variant="contained" id={style.googlebtn} startIcon={<Google/>} onClick={googlelogin}>LogIn using Google</LoginButton>
            </Box>
            <Box className={style.LoginButton}>
                <LoginButton fullWidth variant="contained"  id={style.phonebtn} startIcon={<Phone/>} onClick={phonelogin}>LogIn using Phonenumber</LoginButton>
            </Box>
            <Snackbar
                open={showSnackBar}
                autoHideDuration={6000}
                onClose={() => setShowSnackbar(false)}
                anchorOrigin={ {vertical:"top",horizontal:"right"}}
                key={`top+right`}
                >
                <Alert onClose = {() => setShowSnackbar(false)} severity="error" sx={{width:"100%"}}>{snackbarMessage.current}</Alert>
            </Snackbar>
            </Box>
        
      );
}

export default LoginPage;