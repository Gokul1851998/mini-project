import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from "react-hot-toast";
import Layout from '../components/Layout';



const Profile = () => {
    const [image, setImage] = useState(null)
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.user);
    let imageUrl;

if (image) {
  imageUrl = URL.createObjectURL(image);
} else if(user) {
  imageUrl = user.image;
}

    const cloudAPI = 'dcfbzgrgb'
    const uploadProfile =async () => {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'ureaug60');
        console.log(formData);
        let imageUrl = null
       await axios.post(`https://api.cloudinary.com/v1_1/${cloudAPI}/image/upload`, formData).then(async(response) => {
            console.log(response.data.secure_url);
            const imageUrl=response.data.secure_url
            const response1 = await axios.post("/api/user/update-profile", {imageUpdate:imageUrl},
                {
                    headers: {
                      
                       Autherization: "Bearer " + localStorage.getItem("token"),
                    },
                })
                if(response1.data.success){
                    toast.success(response1.data.message);
                }
        })
    }
    return (
        <Layout>
            <>
                <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
                    <div className="card p-4" style={{backgroundImage:"url('https://media.istockphoto.com/id/1307077638/vector/abstract-green-pattern-background.jpg?s=612x612&w=0&k=20&c=2EedPGB9EC3MZ-fQ6QRY9ZG_0o9WY5k2bRcjb6w4Igc=')"}}>
                        <div className=" image d-flex flex-column justify-content-center align-items-center">
                            <button className="btn btn-secondary">
                                <img className='profileIMage' src={imageUrl} height="100" width="100" /></button>
                            <input style={{width:'123px'}}  type="file" className="form-control" onChange={(e) => {
                                setImage(e.target.files[0])
                            }} />
                            <button onClick={uploadProfile} className='mt-2' style={{backgroundColor:'rgb(0, 85, 85)',color:'white'}}>Upload Profile Picture</button>
                            <span className="name mt-3 text-success">{user? user.name : ''}</span>
                            <span className="idd">{user ? user.email : ''}</span>
                            <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                                {/* <span className="idd1">Oxc4c16a645_b21a</span> */}
                                <span><i className="fa fa-copy"></i></span>
                            </div> <div className="d-flex flex-row justify-content-center align-items-center mt-3">
                                <span className="number"> <span className="follow"></span>
                                </span>
                            </div>
                            <div className=" d-flex mt-2">
                                {/* <button onClick={() => navigate('/editprofile')} className="btn1 btn-dark">Edit Profile</button> */}
                            </div> <div className="text mt-3 text-center">
                                <span>Brototype intern </span>
                            </div>
                            <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
                                <span><i className="fa fa-twitter"></i></span>
                                <span><i className="fa fa-facebook-f"></i></span>
                                <span><i className="fa fa-instagram"></i></span>
                                <span><i className="fa fa-linkedin"></i></span>
                            </div> <div className=" px-2 rounded mt-4 date ">
                                {/* <span className="join">Joined {user && user.createdAt.slice(0, 10) }</span> */}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </Layout>
    )
}

export default Profile