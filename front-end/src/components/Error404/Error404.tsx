import Lottie from "lottie-react"
import error404 from "../../assets/404.json"
const Error404 = () => {
  return (
    <Lottie style={{ width: "100%",height: "100vh" }} animationData={error404} loop={true}/>
  )
}
export default Error404