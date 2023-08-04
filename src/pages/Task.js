import React, { useContext } from 'react';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';
import { AuthContext } from '../contexts/AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';

const Task = () => {
    const { user } = useContext(AuthContext)

    const handleAdd = async (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const date = form.date.value;
        const title = form.title.value;
        const details = form.details.value;
        console.log(email, date, title, details);

        await addDoc(collection(db, "task"), {
            name: email,
            giver: user.email,
            giveriD: user.uid,

            subDate: date,
            title: title,
            details: details,
            timeStamp: serverTimestamp(),




        });
        form.reset();

        toast.success('Successfully given!')



    }

    return (
        <form onSubmit={handleAdd} className='grid grid-cols-1 gap-4 text-center'>

            <input type="email" name='email' placeholder="Task Handler Email" className="input input-bordered w-full max-w-xs font-mono" />
            <label className="label">

                <span className="label-text-alt font-mono">Submission date</span>
            </label>
            <input type="date" name='date' placeholder="Submission date" className="input input-bordered w-full max-w-xs font-mono" />
            <textarea placeholder="Project name" name='title' className="textarea textarea-bordered textarea-md w-full max-w-xs font-mono" ></textarea>

            <textarea placeholder="Project details" name='details' className="textarea textarea-bordered textarea-lg w-full max-w-xs font-mono" ></textarea>

            <input type="submit" className="btn btn-outline btn-primary w-56" value="Assign" />
        </form>

    );
};

export default Task;