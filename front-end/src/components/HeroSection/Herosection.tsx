import { Stack, Typography } from "@mui/material"
import Lottie from "lottie-react"
import hero from "../../assets/Hero.json"

const Herosection = () => {
    return (
        <Stack sx={{ width: "100%", flexDirection: {xs:"column",md:"row"},gap: 5, justifyContent: "space-between", alignItems: "center" }}>
            <Stack sx={{ width: "100%",gap: 2 }}>
                <Typography variant="h4">Elevate Your Style with Our Exclusive Collection</Typography>
                <Typography variant="subtitle1">Discover the latest trends and timeless classics in fashion. From chic dresses to stylish accessories, find everything you need to redefine your wardrobe. Shop now and enjoy free shipping on your first order!</Typography>
            </Stack>
            <Stack sx={{ width: "100%" }}>
                <Lottie animationData={hero} loop={true} />
            </Stack>
        </Stack>
    )
}
export default Herosection