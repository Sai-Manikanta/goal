import axios from 'axios'

function PaymentSuccess({ order }) {
    return (
        <div className="p-4">
            <p className="pb-3 border-b">
                Payment Successfull 🎉🎉🎉
            </p>
            <div className="mt-4">
                <p>Status: {order.status}</p>
                <p>Amount: {order.amount}</p>
                <p>Ordered at: {order.created_at}</p>
            </div>
        </div>
    )
}

export default PaymentSuccess

export async function getServerSideProps(context){
    const { orderId } = context.query;

    const URI = `https://rzp_live_lVEs73zpgsvlNu:nIGYhZOAdYPJIqsJohnIbx1q@api.razorpay.com/v1/orders/${orderId}`;

    const { data } = await axios.get(URI);

    return {
        props: {
            order: data,
        }
    }
}