import React, { useState,useRef } from 'react';
import style from '../styles/LoginPage.module.css';
import {Box,OutlinedInput,FormControl,InputLabel,InputAdornment,Button,Typography,Snackbar,styled} from'@mui/material';
import{Email,Lock,VisibilityOff,Visibility,SupervisedUserCircle} from '@mui/icons-material';
import{Link,useHistory} from 'react-router-dom';
import Alert from '../components/Alert';
import { getAuth, createUserWithEmailAndPassword,signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {userJson,userCollection} from '../Constants';
import {doc,setDoc} from 'firebase/firestore';
import { initializeFirestore } from '../helperfunctions/firebase';



   
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

function SignUpPage() {
    const history = useHistory();
    const [email,setEmail] = useState("");
    const [db] = useState(() => initializeFirestore());
    const [password,setPassword] = useState("");
    const[confirmPassword,setConfirmPassword]=useState("");
    const [isPasswordVisible,setIsPassWordVisible] =useState(false);
    const [isConfirmPasswordVisible,setIsConfirmPassWordVisible] =useState(false);
    const [showSnackBar, setShowSnackbar] =useState(false);
    const snackbarMessage =useRef("");


    const signup = () => {
        if(!email || !password || !confirmPassword){
         
            snackbarMessage.current= "Email/Password seems to be empty";
            setShowSnackbar(true);
            return;
        }
        if(password !== confirmPassword){
            snackbarMessage.current= "Password and confirm Password is not same";
            setShowSnackbar(true);
            return;

        }
        createUserWithEmailAndPassword(getAuth(), email, password)
        .then((userCredentials) => {
           
            let data  = JSON.parse(JSON.stringify(userJson));
            data.userEmail = userCredentials?.user?.email || email;
            data.userId = userCredentials?.user?.uid;
            return setDoc(
                doc( db, userCollection, userCredentials?.user?.uid),
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
                <FormControl className={style.formControl}>
                    <Label htmlFor="outline-adorment-password">Confirm Password</Label>
                    <OutlineTextInput
                    id="outline-adorment-password"
                    value={confirmPassword}
                    type={isConfirmPasswordVisible?"text":"password"}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    startAdornment={
                        <InputAdornment position='start'>
                            <Lock/>
                        </InputAdornment>
                    }
                    endAdornment={
                        <InputAdornment position='end'>
                         {isConfirmPasswordVisible ?  (<Visibility className={style.passwordIcon} onClick={() => setIsConfirmPassWordVisible((prev) => !prev)}/>) : (<VisibilityOff className={style.passwordIcon} onClick={() => setIsConfirmPassWordVisible((prev) => !prev)}/> ) }  
                        </InputAdornment>
                    }
                    label='Password'
                    required
                    />
                </FormControl>
            <Box className={style.LoginButton}>
                <LoginButton fullWidth variant="contained" startIcon={<SupervisedUserCircle/>} onClick={signup}>SignUp</LoginButton>
            </Box>
            <Box className={style.signupbtn}>
                <Typography variant="subtitle1">
                    Already have an Account?
                    <span className={style.span}></span>
                    <Link to="/login">Login Now</Link>
                </Typography>

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

export default SignUpPage;