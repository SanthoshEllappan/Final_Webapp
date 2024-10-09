// import { useEffect, useState } from 'react';
// import { AuthUser } from '../AuthRouter';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import {
//     Button,
//     CssBaseline,
//     TextField,
//     Link,
//     Grid,
//     Box,
//     Typography,
//     Container,
//     createTheme,
//     ThemeProvider,

// } from '@material-ui/core';


// const theme = createTheme();

// export default function SignUp() {

//     let auth = AuthUser()
//     const navigate = useNavigate()

//     const initialUser = { name: "", "email": "", "password": "" }
//     const [user, setUser] = useState(initialUser)
//     const [isSubmit, setIsSubmit] = useState(false)
//     const [formError, setFormError] = useState({})

//     useEffect(() => {

//         if (Object.keys(formError).length === 0 && isSubmit) {
//             console.log(user)
//         }

//     }, [formError, isSubmit])

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         setIsSubmit(true)
//         setFormError(validate(user))


//         if (Object.keys(formError).length === 0) {

//             const userData = await axios.post('http://127.0.0.1:8080/reg', user)
//             const data = userData.data

//             if (data.status === 201) {
//                 auth.signUp(data)
//                 navigate('/', { replace: false })
//             }
//             else {
//                 setFormError({ "error": data.message })
//                 console.log(data)
//             }

//         }
//     };


//     const handleChange = (e) => {
//         setUser({ ...user, [e.target.name]: e.target.value })
//     }

//     //form validation 
//     const validate = (value) => {
//         const error = {}
//         const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

//         if (!value.name) {
//             error.name = "Username is required"
//         }
//         if (!value.email) {
//             error.email = "email is required"
//         } else if (!regex.test(value.email)) {
//             error.email = "Invalide email format"

//         }
//         if (!value.password) {
//             error.password = "password is required"
//         } else if (value.password.length < 5) {
//             error.password = "password must be more than 4 characters"
//         } else if (value.password.length > 11) {
//             error.password = "password must be with in 10 characters"
//         }

//         return error
//     }


//     return (
//         <ThemeProvider theme={theme}>
//             <Container component="main" maxWidth="xs">
//                 <CssBaseline />

//                 <Box
//                     sx={{
//                         marginTop: 10,
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                     }}
//                 >

//                     <Typography component="h1" variant="h4" style={{
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                         marginTop: '30px'
//                     }}>
//                         Sign Up
//                     </Typography>

//                     <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>


//                         <TextField
//                             error={formError.name ? true : false}
//                             helperText={formError.name ? formError.name : ''}
//                             margin="normal"
//                             required
//                             fullWidth
//                             id="name"
//                             label="Enter name"
//                             name="name"
//                             autoComplete="name"
//                             onChange={handleChange}
//                             autoFocus
//                         />

//                         <TextField
//                             error={formError.email ? true : false}
//                             helperText={formError.email ? formError.email : ''}
//                             margin="normal"
//                             required
//                             fullWidth
//                             id="email"
//                             label="Email Address"
//                             name="email"
//                             autoComplete="email"
//                             onChange={handleChange}
//                             autoFocus
//                         />
//                         <TextField
//                             error={formError.password ? true : false}
//                             helperText={formError.password ? formError.password : ''}
//                             margin="normal"
//                             required
//                             fullWidth
//                             name="password"
//                             label="Password"
//                             type="password"
//                             id="password"
//                             onChange={handleChange}
//                             autoComplete="current-password"
//                         />

//                         <Button
//                             type="submit"
//                             fullWidth
//                             variant="contained"
//                             sx={{ mt: 3, mb: 2 }}
//                             style={{ marginTop: "20px" }}
//                         >
//                             Sign Up
//                         </Button>
//                         <Grid container style={{ marginTop: '10px' }} >
//                             <Grid item>
//                                 <Link href="/login" variant="body2">
//                                     {"Already have an account? Log In"}
//                                 </Link>
//                             </Grid>
//                         </Grid>
//                         {(formError.error) &&
//                             <Button
//                                 type="button"
//                                 fullWidth
//                                 variant="contained"
//                                 sx={{ mt: 3, mb: 2 }}
//                                 style={{
//                                     marginTop: "20px",
//                                     backgroundColor: "red"
//                                 }}
//                             >
//                                 {(formError.error) ? formError.error : ''}
//                             </Button>
//                         }
//                     </Box>
//                 </Box>

//             </Container>
//         </ThemeProvider>
//     );
// }


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthUser } from '../AuthRouter';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    Container,
    createTheme,
    ThemeProvider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const theme = createTheme();

// Styles
const useStyles = makeStyles((theme) => ({
    section: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#E2F1E7', // Background color applied from the header component
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
    },
    form: {
        backgroundColor: '#E2F1E7', // Light background for form
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
    },
    button: {
        backgroundColor: '#3a4e69', // Light background similar to the search button in the header
        color: '#ffffff', // Dark text color for contrast
        '&:hover': {
            backgroundColor: '#1E3E62', // Slightly darker shade for hover effect
        },
    },
    footer: {
        backgroundColor: '#ffffff', // Darker footer background for consistency
        color: '#3a4e69',
        textAlign: 'center',
        padding: '1rem 0',
        marginTop: 'auto',
    },
}));

export default function SignUp() {
    const classes = useStyles();
    let auth = AuthUser();
    const navigate = useNavigate();

    const initialUser = { name: '', email: '', password: '' };
    const [user, setUser] = useState(initialUser);
    const [isSubmit, setIsSubmit] = useState(false);
    const [formError, setFormError] = useState({});

    useEffect(() => {
        if (Object.keys(formError).length === 0 && isSubmit) {
            console.log('User data:', user);
        }
    }, [formError, isSubmit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmit(true);
        setFormError(validate(user));

        if (Object.keys(formError).length === 0) {
            const { data } = await axios.post('http://127.0.0.1:8080/reg', user);
            if (data.status === 201) {
                auth.signUp(data);
                navigate('/', { replace: false });
            } else {
                setFormError({ error: data.message });
            }
        }
    };

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const validate = (value) => {
        const error = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!value.name) {
            error.name = 'Username is required';
        }
        if (!value.email) {
            error.email = 'Email is required';
        } else if (!regex.test(value.email)) {
            error.email = 'Invalid email format';
        }
        if (!value.password) {
            error.password = 'Password is required';
        } else if (value.password.length < 5) {
            error.password = 'Password must be more than 4 characters';
        } else if (value.password.length > 10) {
            error.password = 'Password must be within 10 characters';
        }

        return error;
    };

    return (
        <ThemeProvider theme={theme}>
            <section className={classes.section}>
                <Container className={classes.container}>
                    <Grid container spacing={2}>
                        <Grid item md={6} className="d-flex justify-content-center align-items-center">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                alt="Sample"
                                className={classes.img}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <form onSubmit={handleSubmit} className={classes.form}>
                                <Typography component="h1" variant="h4" style={{ textAlign: 'center', color: '#3a4e69', marginBottom: '1rem' }}>
                                    SIGN UP
                                </Typography>
                                <TextField
                                    error={!!formError.name}
                                    helperText={formError.name || ''}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Enter Name"
                                    name="name"
                                    autoComplete="name"
                                    onChange={handleChange}
                                    autoFocus
                                />
                                <TextField
                                    error={!!formError.email}
                                    helperText={formError.email || ''}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleChange}
                                />
                                <TextField
                                    error={!!formError.password}
                                    helperText={formError.password || ''}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    className={classes.button}
                                    style={{ marginTop: '1rem', padding: '0.5rem' }}
                                >
                                    Sign Up
                                </Button>
                                <Grid container justifyContent="flex-end" style={{ marginTop: '1rem' }}>
                                    <Grid item>
                                        <Link href="/login" variant="body2" style={{ color: '#3498db' }}>
                                            Already have an account? Log In
                                        </Link>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </Container>
                <Box mt={5} className={classes.footer}>
                    <Typography variant="body2">
                        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
                    </Typography>
                </Box>
            </section>
        </ThemeProvider>
    );
}
