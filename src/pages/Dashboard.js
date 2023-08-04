import React, { useContext, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { AuthContext } from '../contexts/AuthProvider/AuthProvider';
import { collection, deleteDoc, deleteField, doc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';





const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()
    const [task, setTask] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    useEffect(() => {
        const getTask = async () => {
            try {
                const taskData = [];
                const q = query(collection(db, 'task'), where('name', "==", user.email));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach(doc => {
                    taskData.push({ id: doc.id, ...doc.data() });
                });
                setTask(taskData);
            }
            catch (error) {
                console.log(error);
            }
        }
        getTask();
    }, [user.email])

    const handleDelete = async (id) => {
        // try {
        //     const taskRef = doc(db, 'task', id);
        //     await deleteDoc(taskRef);
        //     

        //     setTask = ((previousTask) => previousTask.filter(item => item.id !== id));

        //     toast.success('Project list updated successfully!');

        // }
        // catch (error) {
        //     console.log(error)


        // }

        await deleteDoc(doc(db, 'task', id));
        alert("please reload the page to see updated list");
    }

    const handleView = (id) => {
        // const taskSelected = task.find(item => item.id === id);
        // setSelectedTask(taskSelected);

        // console.log(selectedTask);
        // window.my_modal_5.showModal();
        navigate(`/view/${id}`)
    }
    const rows = task.map((item) => ({
        id: item.id,
        giver: item.giver,
        title: item.title,
        subDate: item.subDate,
        details: item.details,
        timeStamp: item.timeStamp,
        delete: item.giveriD,
    }));


    const columns = [

        { field: 'giver', headerName: 'Assignee', width: 130 },
        { field: 'title', headerName: 'Project Title', width: 150 },
        {
            field: 'subDate',
            headerName: 'Submission Date',

            width: 120,
        },
        {
            field: 'details',
            headerName: 'Project Details',
            width: 400,


        },
        {
            field: 'timeStamp',
            headerName: 'View Data',
            renderCell: (params) => (
                <button onClick={() => handleView(params.row.id)} className='w-22 btn btn-outline btn-info'>View </button>),

            width: 300,

        },
        {
            field: 'delete',
            headerName: 'Delete Data',
            renderCell: (params) => (
                <button onClick={() => handleDelete(params.row.id)} className='w-22 btn btn-outline btn-error'>Mark as Done</button>),

            width: 300,

        },
    ];


    console.log(task);
    return (
        <div style={{ height: 400, width: '100%' }}>
            {/* {task.map(item => (
                <div key={item.id}>
                    <Link to={`/view/${item.id}`}></Link>
                </div>
            ))} */}
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}


            />


            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg ">{ }</h3>
                    <p className="py-4 font-mono">{ }</p>
                    <p className="py-4 font-mono">Submission Date-{ }</p>
                    <p className="py-4 font-mono"><small className='text-bottom font-semibold'>Project Assign by-{ }</small></p>
                    <div className="modal-action">

                        <button className="btn">Close</button>
                    </div>
                </form>
            </dialog>

        </div>
    );
};

export default Dashboard;