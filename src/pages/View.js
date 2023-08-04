
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { Link, useParams } from 'react-router-dom';
import { db } from '../firebase/firebase.config';
import { useEffect, useState } from 'react';

const View = () => {
    const { id } = useParams();
    const [taskData, setTaskData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fireDb = getFirestore();
                const docRef = doc(fireDb, 'task', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setTaskData(docSnap.data());
                } else {
                    setTaskData(null);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);


    return (
        <div className="hero min-h-screen bg-base-200">


            <div className="hero-content flex-col lg:flex-row-reverse">

                <div>
                    <h1 className="text-5xl font-bold font-mono ">Title: {taskData.title}</h1>
                    <p className="py-6 font-mono">Details: {taskData.details}</p>
                    <p className="py-6 font-mono">Submission Date: {taskData.subDate}</p>
                    <p className="py-6 font-mono">Task given by: {taskData.giver}</p>
                    <Link to="/dashboard" className="btn btn-primary">Go Back</Link>
                </div>
            </div>
        </div>
    );
};

export default View;