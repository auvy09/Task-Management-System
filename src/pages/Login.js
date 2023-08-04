import React, { useContext, useEffect, useState } from 'react';
import img from '../imgV1/login.png';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider/AuthProvider';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, get, remove } from 'firebase/database';
import app from '../firebase/firebase.config';
import { toast } from 'react-hot-toast';


const Login = () => {
    const auth = getAuth(app);
    const database = getDatabase(app);
    const [newUser, setNewUser] = useState('');
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setNewUser(user);
        });

        return () => {
            unsubscribe();
        };
    }, [auth]);
    const saveUserData = (uid, data) => {
        set(ref(database, 'users/' + uid), data);
    };

    const { login } = useContext(AuthContext);
    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = event.target.email.value;
        const password = form.password.value;


        login(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                saveUserData(user.uid, {
                    username: user.displayName,
                    email: user.email,
                });
                toast.success('Login Successfully ')
                navigate('/dashboard');

            })
            .catch(e => setError(true));



    }
    return (
        <div className="hero my-24 w-full">
            <div className="hero-content grid gap-16 md:grid-cols-2 flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl text-center font-bold">Login now!</h1>
                    <img src={img} alt="" />

                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">

                            <input type="submit" className="btn btn-secondary" value="Login" />

                        </div>
                        {error && toast.error('Wrong Email and Password')}
                    </form>
                    <p className='text-center mb-6'>New to this site? <Link className='text-indigo-500' to='/signup'>Signup</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;