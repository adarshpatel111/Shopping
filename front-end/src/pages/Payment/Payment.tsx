import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom";

const Payment = () => {
    const data=useSelector((state)=>state)
    console.log(data);
    const paymentValues=useLocation();
    console.log(paymentValues)

    
  return (
    <div>Payment</div>
  )
}
export default Payment