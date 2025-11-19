/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import useCreateOrEdit from '../hooks/useCreateOrEdit';
import { CANCEL_VERIFY_PAYMENT, VERIFY_PAYMENT } from '../constants';
import useFetch from '../hooks/useFetch';

const PaymentSuccess = () => {
  const [status, setStatus] = useState('checking');
  const [message, setMessage] = useState('Checking payment status...');
  const [searchParams] = useSearchParams();
//   const [paymentId, setPaymentId] = useState(null);
  const navigate = useNavigate();
  const {submitData} = useCreateOrEdit()


const paymentId = localStorage.getItem('paymentId');


  const verifyPayment = async () => {
      try {
        const response = await submitData(`${VERIFY_PAYMENT}`, {
          paymentId: paymentId,}, "POST");
        if (response.data.paymentStatus === 'paid') {
          setStatus('success');
          setMessage('Payment successful! Redirecting...');
          setTimeout(() => navigate('/dashboard'), 3000);
        } else {
          setStatus('failed');
          setMessage('Payment failed or canceled. Please try again.');
        }
      } catch (error) {
        setStatus('failed');
        setMessage('Error verifying payment. Please contact support.');
      }
    };

  const verifyPaymentAndCancel = async (routeId) => {
      try {
        const response = await submitData(`${CANCEL_VERIFY_PAYMENT}`, {
          paymentId: paymentId, routeId:routeId}, "POST");
        if (response.data.paymentStatus === 'paid') {
          setStatus('success');
          setMessage('Payment successful! Redirecting...');
          setTimeout(() => navigate('/daily-routes'), 3000);
        } else {
          setStatus('failed');
          setMessage('Payment failed or canceled. Please try again.');
        }
      } catch (error) {
        setStatus('failed');
        setMessage('Error verifying payment. Please contact support.');
      }
    };

  useEffect(() => {
    const checkPaymentStatus = searchParams.get('checkPaymentStatus');
    const routeId = searchParams.get('routeId')




    // // 🚫 Redirect if accessed directly without necessary parameters
    // if (!checkPaymentStatus === 'true' || !paymentId) {
    //   navigate('/');
    //   return;
    // }

    if(!checkPaymentStatus || !paymentId) {
      navigate('/');
      return;
    }

   if(paymentId && checkPaymentStatus && !routeId){
  //  alert(routeId)
     verifyPayment();
   }
   if(paymentId && checkPaymentStatus && routeId){

     verifyPaymentAndCancel(routeId);
   }

  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-center p-6">
      <div className="max-w-md bg-white shadow-xl rounded-xl p-8">
        {status === 'checking' && (
          <>
            <div className="loader mb-4"></div>
            <p className="text-gray-600">{message}</p>
          </>
        )}
        {status === 'success' && (
          <>
            <h2 className="text-green-600 text-2xl font-semibold mb-2">✅ Payment Success!</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}
        {status === 'failed' && (
          <>
            <h2 className="text-red-600 text-2xl font-semibold mb-2">❌ Payment Failed</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
