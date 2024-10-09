


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { AuthUser } from '../AuthRouter';
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
// import { makeStyles } from '@material-ui/core/styles';

// const theme = createTheme();

// // Styles
// const useStyles = makeStyles((theme) => ({
//     section: {
//         height: '100vh',
//         display: 'flex',
//         flexDirection: 'column',
//         backgroundColor: '#E2F1E7', // Background color applied from the header component
//     },
//     container: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         flexGrow: 1,
//     },
//     form: {
//         backgroundColor: '#E2F1E7', // Light background for form
//         padding: '2rem',
//         borderRadius: '8px',
//         boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
//         width: '100%',
//         maxWidth: '400px',
//     },
//     img: {
//         maxWidth: '100%',
//         height: 'auto',
//         borderRadius: '8px',
//     },
//     button: {
//         backgroundColor: '#3a4e69', // Light background similar to the search button in the header
//         color: '#ffffff', // Dark text color for contrast
//         '&:hover': {
//             backgroundColor: '#1E3E62', // Slightly darker shade for hover effect
//         },
//     },
//     footer: {
//         backgroundColor: '#ffffff', // Darker footer background for consistency
//         color: '#3a4e69',
//         textAlign: 'center',
//         padding: '1rem 0',
//         marginTop: 'auto',
//     },
//     rememberContainer: {
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginTop: '1rem',
//     },
// }));

// export default function SignIn() {
//     const classes = useStyles();
//     let auth = AuthUser();
//     let navigate = useNavigate();

//     const initialUser = { email: '', password: '' };
//     const [user, setUser] = useState(initialUser);
//     const [isSubmit, setIsSubmit] = useState(false);
//     const [formError, setFormError] = useState({});

//     useEffect(() => {
//         if (Object.keys(formError).length === 0 && isSubmit) {
//             console.log('data sending');
//         }
//     }, [formError, isSubmit]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmit(true);
//         setFormError(validate(user));

//         if (Object.keys(formError).length === 0) {
//             const { data } = await axios.post('http://127.0.0.1:8080/login', user);
//             if (data.status === 201 && !data.data[0].status) {
//                 setFormError({ error: 'User was Blocked' });
//             } else if (data.status === 201) {
//                 console.log(data);
//                 auth.login(data);
//                 navigate('/dashboard', { replace: true });
//             } else {
//                 setFormError({ error: data.message });
//             }
//         }
//     };

//     const handleChange = (e) => {
//         setUser({ ...user, [e.target.name]: e.target.value });
//     };

//     const validate = (value) => {
//         const error = {};
//         const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

//         if (!value.email) {
//             error.email = 'Email is required';
//         } else if (!regex.test(value.email)) {
//             error.email = 'Invalid email format';
//         }
//         if (!value.password) {
//             error.password = 'Password is required';
//         } else if (value.password.length < 5) {
//             error.password = 'Password must be more than 4 characters';
//         } else if (value.password.length > 10) {
//             error.password = 'Password must be within 10 characters';
//         }

//         return error;
//     };

//     return (
//         <ThemeProvider theme={theme}>
//             <section className={classes.section}>
//                 <Container className={classes.container}>
//                     <Grid container spacing={2}>
//                         <Grid item md={6} className="d-flex justify-content-center align-items-center">
//                             <img
//                                 src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
//                                 alt="Sample"
//                                 className={classes.img}
//                             />
//                         </Grid>
//                         <Grid item md={6}>
//                             <form onSubmit={handleSubmit} className={classes.form}>
//                                 <Typography component="h1" variant="h4" style={{ textAlign: 'center', color: '#3a4e69', marginBottom: '1rem' }}>
//                                     SIGN IN
//                                 </Typography>
//                                 <TextField
//                                     error={!!formError.email}
//                                     helperText={formError.email || ''}
//                                     margin="normal"
//                                     required
//                                     fullWidth
//                                     id="email"
//                                     label="Email Address"
//                                     name="email"
//                                     autoComplete="email"
//                                     onChange={handleChange}
//                                     autoFocus
//                                 />
//                                 <TextField
//                                     error={!!formError.password}
//                                     helperText={formError.password || ''}
//                                     margin="normal"
//                                     required
//                                     fullWidth
//                                     name="password"
//                                     label="Password"
//                                     type="password"
//                                     id="password"
//                                     onChange={handleChange}
//                                     autoComplete="current-password"
//                                 />
//                                 <div className={classes.rememberContainer}>
//                                     <div className="form-check">
//                                         <input
//                                             className="form-check-input me-2"
//                                             type="checkbox"
//                                             value=""
//                                             id="rememberMe"
//                                         />
//                                         <label className="form-check-label" htmlFor="rememberMe" style={{ color: '#333' }}>
//                                             Remember me
//                                         </label>
//                                     </div>
//                                     <Link href="#" variant="body2" style={{ color: '#3498db' }}>
//                                         Forgot password?
//                                     </Link>
//                                 </div>
//                                 <Button
//                                     type="submit"
//                                     fullWidth
//                                     variant="contained"
//                                     className={classes.button}
//                                     style={{
//                                         marginTop: '1rem',
//                                         padding: '0.5rem',
//                                     }}
//                                 >
//                                     Sign In
//                                 </Button>
//                             </form>
//                         </Grid>
//                     </Grid>
//                 </Container>
//                 <Box mt={5} className={classes.footer}>
//                     <Typography variant="body2">
//                         &copy; {new Date().getFullYear()} Your Company. All rights reserved.
//                     </Typography>
//                 </Box>
//             </section>
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
    img: {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: '8px',
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
    rememberContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '1rem',
    },
}));

export default function SignIn() {
    const classes = useStyles();
    let auth = AuthUser();
    let navigate = useNavigate();

    const initialUser = { email: '', password: '' };
    const [user, setUser] = useState(initialUser);
    const [isSubmit, setIsSubmit] = useState(false);
    const [formError, setFormError] = useState({});

    useEffect(() => {
        if (Object.keys(formError).length === 0 && isSubmit) {
            console.log('data sending');
        }
    }, [formError, isSubmit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmit(true);
        setFormError(validate(user));

        if (Object.keys(formError).length === 0) {
            const { data } = await axios.post('http://127.0.0.1:8080/login', user);
            if (data.status === 201 && !data.data[0].status) {
                setFormError({ error: 'User was Blocked' });
            } else if (data.status === 201) {
                console.log(data);
                auth.login(data);
                navigate('/dashboard', { replace: true });
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
                                    SIGN IN
                                </Typography>
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
                                    autoFocus
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
                                <div className={classes.rememberContainer}>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input me-2"
                                            type="checkbox"
                                            value=""
                                            id="rememberMe"
                                        />
                                        <label className="form-check-label" htmlFor="rememberMe" style={{ color: '#333' }}>
                                            Remember me
                                        </label>
                                    </div>
                                    <Link href="#" variant="body2" style={{ color: '#3498db' }}>
                                        Forgot password?
                                    </Link>
                                </div>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    className={classes.button}
                                    style={{
                                        marginTop: '1rem',
                                        padding: '0.5rem',
                                    }}
                                >
                                    Sign In
                                </Button>
                                <Button
                                    onClick={() => navigate('/admin')}
                                    fullWidth
                                    variant="outlined"
                                    className={classes.button}
                                    style={{
                                        marginTop: '1rem',
                                        padding: '0.5rem',
                                        color: '#fff',
                                        borderColor: '#3a4e69',
                                    }}
                                >
                                    Admin Login
                                </Button>
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
