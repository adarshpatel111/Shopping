import { IconButton, Stack, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import EditIcon from '@mui/icons-material/Edit';

const MyAccount = () => {
    const BackgroundImg = 'https://images.pexels.com/photos/2482113/pexels-photo-2482113.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    const profileImage = "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600"
    // Fetch data from Loaclstorage
    const user = useSelector((state: any) => state.login.user)
    return (
        <>
            {
                localStorage.getItem('_token_') ?
                    <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
                        <Stack sx={{ backgroundImage: `url(${BackgroundImg})`, backgroundSize: "cover", backgroundPosition: "center", width: "100%", height: "10rem" }}>
                        </Stack>
                        <Stack sx={{ width: "90%" }}>
                            <Stack sx={{ position: "absolute", marginTop: "-5rem", width: "150px", height: "150px", borderRadius: "50%", border: "4px solid white" }}>
                                <img src={profileImage} alt="MyAccount" style={{ width: "150px", height: "150px", borderRadius: "50%" }} />
                            </Stack>
                            <Stack sx={{ marginLeft: "15rem" }}>

                                <>
                                    <Stack sx={{ marginBottom: "1rem", flexDirection: "row", justifyContent: "space-between" }}>
                                        <Stack sx={{ flexDirection: "row" }}>
                                            <Typography variant="h4">{user.firstName} {user.lastName}</Typography>
                                            <IconButton size="small" color="primary">
                                                <EditIcon />
                                            </IconButton>
                                        </Stack>
                                        <Stack>
                                            Date :{new Date().toLocaleDateString()}
                                        </Stack>
                                    </Stack>
                                    <Typography variant="body2">
                                        {user.email}</Typography>
                                </>

                            </Stack>

                        </Stack>
                    </Stack>
                    :
                    null
            }
        </>
    )
}
export default MyAccount