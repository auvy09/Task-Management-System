import React, { useContext } from 'react';
import img from '../imgV1/login.png';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';

const Signup = () => {
    const { createUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleSignup = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password, name);
        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('Signup Successfully ')
                navigate('/dashboard');
            })
            .catch(e => console.error(e));
    }

    return (

        <div className="hero my-24 w-full">
            <div className="hero-content grid gap-16 md:grid-cols-2 flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl text-center font-bold">Register now!</h1>
                    <img src={img} alt="" />

                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSignup} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Your Name</span>
                            </label>
                            <input type="text" name='name' placeholder="Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="Email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="Password" className="input input-bordered" required />

                        </div>
                        <div className="form-control mt-6">
                            <input type="submit" className="btn btn-secondary" value="Signup" />

                        </div>
                    </form>
                    <p className='text-center mb-6'>Already have an account? <Link className='text-indigo-500' to='/login'>Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Signup;