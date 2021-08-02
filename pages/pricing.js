import { useState, useEffect } from 'react'
import Image from 'next/image'
import { BiRupee } from 'react-icons/bi'
import { RiStockFill } from 'react-icons/ri'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { useRouter } from 'next/router'

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

function Pricing() {
	const [orderId, setOrderId] = useState('');
	const router = useRouter();

	useEffect(() => {
		if(orderId){
			router.replace(`/success/${orderId}`);
		}
	}, [orderId])

    async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		const data = await fetch('https://shielded-inlet-36228.herokuapp.com/razorpay', { method: 'POST' }).then((t) =>
			t.json()
		)

		// console.log('---order---')
		// console.log(data)

		const options = {
			key: 'rzp_live_lVEs73zpgsvlNu',
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id,
			name: 'Stock calls',
			description: 'Get awesome stock calls',
			image: 'https://raw.githubusercontent.com/mehulmpt/razorpay-payments-tutorial/8141a0d6435b9fa648725a40fcee92fa83820546/backend/logo.svg',
			handler: function (response) {
				// alert(response.razorpay_payment_id)
				// alert(response.razorpay_order_id)
				// alert(response.razorpay_signature)
				//console.log('---success capture---')
				//console.log(response)
				setOrderId(response.razorpay_order_id);
				//router.replace('/dashboard')
				//router.push('/dashboard')
			}
            //,
			// prefill: {
			// 	name,
			// 	// email: 'sdfdsjfh2@ndsfdf.com',
			// 	// phone_number: '9899999999'
			// }
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}

    return (
        <div className="bg-gray-200 h-screen p-1">
            <div 
                className="bg-white m-5 rounded-xl p-6 text-gray-800"
            >
                <div className="border-b pb-3 flex">
                    <Image 
                        src="/images/pyramid.jpg" 
                        alt="candles"
						width="60px" 
						height="50px"
                        className="w-16 h-14 object-cover object-right rounded-lg"
                    />
                    <div className="pl-2">
                        <h2 className="font-black tracking-wider text-lg">Silver</h2>
                        <p className="flex items-center text-xl">
                            <BiRupee /> 1000&nbsp;
                            <span className="text-xs">/month</span>
                        </p>
                    </div>
                </div>
                
                <div className="space-y-2 py-3 mb-1">
                    <p className="flex items-center">
						<RiStockFill size="1.4rem" className="text-green-400" />&nbsp;
						<span className="text-sm">
							Comodity Intraday
						</span>
					</p>
                    <p className="flex items-center">
					<RiStockFill size="1.4rem" className="text-green-400" />&nbsp;
						<span className="text-sm">
							Bank Nifty
						</span>
					</p>
                    <p className="flex items-center">
						<RiStockFill size="1.4rem" className="text-green-400" />&nbsp;
						<span className="text-sm">
							Crud oil Intraday
						</span>
					</p>
                </div>

                <button 
					className="bg-blue-500 text-white w-full text-center py-2 rounded-lg font-thin flex justify-center hover:bg-blue-600"
					onClick={displayRazorpay}
				>
					<span className="flex items-center">
						<AiOutlineCheckCircle size="1.2rem" />
                   	 	<span className="pl-1">Pay Now</span>
					</span>
                </button>
            </div>
        </div>
    )
}

export default Pricing
