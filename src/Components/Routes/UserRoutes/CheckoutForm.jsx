// import React, { useContext, useState } from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import { Contex } from "../../ContexApi/Contex";
// import Swal from "sweetalert2";

// const CheckoutForm = ({ booking }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const axiosSecure = useAxiosSecure()
//   const [transactionId, setTransactionId] = useState('');
//   const [error, setError] = useState('');
//   const { user } = useContext(Contex)

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const card = elements.getElement(CardElement);

//     if (card === null) {
//       return
//     }

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card
//     })

//     if (error) {
//       console.log('payment error', error);
//       setError(error.message);
//     }
//     else {
//       console.log('payment method', paymentMethod)
//       setError('');
//     }

//     const amount = booking.price * 100; // Convert to cents
//     const response = await axiosSecure.post('/create-payment-intent', { amount });
//     const { client_secret } = response.data;

//     // confirm payment
//     const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(client_secret, {
//       payment_method: {
//         card: card,
//         billing_details: {
//           email: user?.email || 'anonymous',
//           name: user?.displayName || 'anonymous'
//         }
//       }
//     })

//     if (confirmError) {
//       console.log('confirm error')
//     }
//     else {
//       console.log('payment intent', paymentIntent)
//       if (paymentIntent.status === 'succeeded') {
//         console.log('transaction id', paymentIntent.id);
//         setTransactionId(paymentIntent.id);

//         // now save the payment in the database
//         const payment = {
//           name: user.displayName,
//           email: user.email,
//           price: amount,
//           transactionId: paymentIntent.id,
//           bookingId: booking._id,
//           date: new Date(), // utc date convert. use moment js to 
//           status: "In Review"
//         }

//         const res = await axiosSecure.post('/payments', payment);
//         console.log('payment saved', res.data);
//         //refetch();
//         if (res.data?.paymentResult?.insertedId) {
//           Swal.fire({
//             position: "top-end",
//             icon: "success",
//             title: "Thank you for the taka paisa",
//             showConfirmButton: false,
//             timer: 1500
//           });
//           //navigate('/dashboard/paymentHistory')
//         }

//       }
//     }

//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button
//         type="submit"
//         className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//         disabled={!stripe}
//       >
//         Pay
//       </button>
//       <p className="text-red-600">{error}</p>
//       {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
//     </form>
//   );
// };

// export default CheckoutForm;


import React, { useContext, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Contex } from "../../ContexApi/Contex";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ booking }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [transactionId, setTransactionId] = useState('');
  const [error, setError] = useState('');
  const { user } = useContext(Contex);
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('Payment error:', error);
      setError(error.message);
      return;
    } else {
      console.log('Payment method:', paymentMethod);
      setError('');
    }

    // Call backend to create a PaymentIntent and get the client_secret
    try {
      const amount = booking.price * 100; // Convert to cents
      const response = await axiosSecure.post('/create-payment-intent', { amount });
      const { client_secret } = response.data;

      // Confirm the payment with the client_secret
      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || 'anonymous',
            name: user?.displayName || 'anonymous',
          },
        },
      });

      if (confirmError) {
        console.log('Confirm error:', confirmError);
        setError(confirmError.message);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        //console.log('Transaction ID:', paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // Save the payment in the database
        const payment = {
          name: user.displayName,
          email: user.email,
          packageName: booking.packageName,
          price: booking.price,
          transactionId: paymentIntent.id,
          bookingId: booking._id,
          date: new Date(),
          status: "In Review",
        };

        await axiosSecure.post('/payments', payment)
        .then(res => {
          if (res.data?.insertedId) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Thank you for your payment!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        axiosSecure.patch(`/update-booking-status/${booking._id}`, { status: "In Review" })
        .then(res => {
          navigate('/dashboard/payment-history')
          console.log(res.data)
        })
        })
        //console.log(res.data)
        
      }
    } catch (err) {
      console.error('Error creating PaymentIntent:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        disabled={!stripe}
      >
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {transactionId && <p className="text-green-600">Your transaction ID: {transactionId}</p>}
    </form>
  );
};

export default CheckoutForm;
