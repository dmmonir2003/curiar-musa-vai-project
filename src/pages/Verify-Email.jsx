import React, { useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import toast from "react-hot-toast";
import useFetch from "../hooks/useFetch";
import { VERIFY_EMAIL } from "../constants";

const VerifyEmail = () => {
    const navigate = useNavigate();
    const { fetchData } = useFetch();
    const { token } = useParams(); 

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await fetchData(`${VERIFY_EMAIL}/${token}`);
                if (response.status === 200 || response.status === 201) {
                    toast.success(response.data.message || 'Email Verified Successfully');
                    navigate('/');
                } 
            } catch (error) {
                console.error("Verification error:", error);
                toast.error(error.response.data.message || "An error occurred during verification.");
            }
        };

        if (token) {
            verifyEmail();
        } else {
            navigate('/');
        }
    }, [ token]);

    return (
        <div className="flex justify-center items-center h-screen bg-black">
            <div className="text-center">
                <h1 className="text-white text-2xl font-medium">
                    Verifying Email...
                </h1>
            </div>
        </div>
    );
};

export default VerifyEmail;