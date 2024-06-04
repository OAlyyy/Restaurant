import {
  Grid,
  makeStyles,
  createStyles,
  Card,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Divider,
} from "@material-ui/core";
import React, { useState } from "react";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { auth } from "../../../firebase";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";



const useStyle = makeStyles((theme) =>
  createStyles({
    card: {
      borderRadius: "15px",
      padding: "20px",
      boxShadow: " 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
      backgroundColor: "#ECECEC",
    },
  
    card_title: {
      textAlign: "center",
      marginBottom: theme.spacing(4),
      marginTop: theme.spacing(3),
    },
    login: {
      "font-weight": "500",
      color: "#7A7A7A",
      fontSize: "20px",
    },
    input_center: {
      display: "flex",
      justifyContent: "center",
    },
    input_center2: {
      display: "flex",
      justifyContent: "center",
      marginTop: "3vh",
    },
    input: {
      width: "95%",
      marginBottom: theme.spacing(3),
      "& label.Mui-focused": {
        color: "#lightgrey",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#grey",
        },
        "&:hover fieldset": {
          borderColor: "#797979",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#7D54C3",
        },
      },
    },
    btn: {
      backgroundColor: "#3376B5",
      color: "#fff",
      "font-weight": "600",
      height: "5vh",
      width: "50%",
      textTransform: "none",
      fontSize: "19px",
      marginBottom: "7vh",
      "&:hover ": {
        backgroundColor: "#225D94",
      },
   
    },
    dividerTitle: {
      textAlign: "center",
      marginBottom: "2vh",
      justifyContent: "top",
      transform: "translateY(-50%)",
    },
    iconBox: {
      width: "100%",
      textAlign: "center",
      justifyContent: "center",
      marginBottom: "4vh",
      margin: "auto",
    },
    socialIcon: {
      width: "60%",
      padding: "3px",
      boxSizing: "border-box",
      borderRadius: "15px",
    },
    hint1: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "1.7vh",
      color: "#7A7A7A",
      "&:hover": {
        cursor: "pointer",
      },
    },
    hint2: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "1.7vh",
      color: "#7A7A7A",
    },
    signup: {
      fontSize: "18px",
      color: "#3f3f3f",
      "font-weight": "600",
      "&:hover": {
        cursor: "pointer",
      },
    },
  })
);

 function SignUp() {
  const classes = useStyle();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    showPassword: false,
  });

  

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleError = (input) => {
    switch (input) {
      case "Firebase: Error (auth/invalid-email).":
        setErrMsg("Invalid email format");
        break;

      case "Firebase: Error (auth/email-already-in-use).":
        setErrMsg("Email is already in use");
        break;

    case "Firebase: Password should be at least 6 characters (auth/weak-password).":
        setErrMsg("Password should be at least 6 characters")
        break;
        
      default:
        break;
    }
  };


  const register = async () => {
    try {
      // eslint-disable-next-line
      const user = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      navigate("/login")
    } catch (error) {
      console.log(error.message);
      handleError(error.message);
    }
  };


      
  return (

        <Card className={classes.card}>
          <Grid container justifyContent="center">
            <Grid item xs={12} className={classes.card_title}>
              <Typography variant="body1" className={classes.login}>
                Sign Up to your account
              </Typography>
            </Grid>

            <Grid item xs={12} md={9} lg={7} className={classes.input_center}>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                className={classes.input}
                value={values.email}
                onChange={handleChange("email")}
              />
            </Grid>

            <Grid item xs={12} md={9} lg={7} className={classes.input_center}>
              <FormControl variant="outlined" className={classes.input}>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={9} lg={7} className={classes.input_center}>
              {errMsg !== "" && <h5 className={classes.error}>{errMsg}</h5>}
            </Grid>

            <Grid item xs={12} className={classes.input_center2}>
              <Button
                variant="contained"
                className={classes.btn}
                size="large"
                onClick={register}
              >
                Sign up
              </Button>
            </Grid>
            <Grid item xs={4} className={classes.divider}>
              <Divider />
            </Grid>
          </Grid>
        </Card>
  );
}

export default SignUp;