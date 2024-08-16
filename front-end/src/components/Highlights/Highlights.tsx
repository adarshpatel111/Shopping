import SettingsIcon from '@mui/icons-material/Settings';

import { Box, Container, Typography, Grid, Stack, Card } from '@mui/material';
import { rootColors } from '../../Utilities/rootColors';

const items = [
    {
        icon: <SettingsIcon/> ,
        title: 'Adaptable performance',
        description:
            'Our product effortlessly adjusts to your needs, boosting efficiency and simplifying your tasks.',
    },
    {
        icon:"" ,
        title: 'Built to last',
        description:
            'Experience unmatched durability that goes above and beyond with lasting investment.',
    },
    {
        icon:"" ,
        title: 'Great user experience',
        description:
            'Integrate our product into your routine with an intuitive and easy-to-use interface.',
    },
    {
        icon:"" ,
        title: 'Innovative functionality',
        description:
            'Stay ahead with features that set new standards, addressing your evolving needs better than the rest.',
    },
    {
        icon:"" ,
        title: 'Reliable support',
        description:
            'Count on our responsive customer support, offering assistance that goes beyond the purchase.',
    },
    {
        icon:"" ,
        title: 'Precision in every detail',
        description:
            'Enjoy a meticulously crafted product where small touches make a significant impact on your overall experience.',
    },
];

export default function Highlights() {
    return (
        <Box
            id="highlights"
            sx={{
                color: 'white',
            }}
        >
            <Container
                sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: { xs: 3, sm: 10 },
                }}
            >
                <Box
                    sx={{
                        width: { sm: '100%', md: '60%' },
                        textAlign: { sm: 'left', md: 'center' },
                    }}
                >
                    <Typography component="h2" align="center" variant="h4">
                        Highlights
                    </Typography>
                    <Typography variant="body1" align="center"  sx={{ color: 'grey.400',mt:3 }}>
                        Explore why our product stands out: adaptability, durability,
                        user-friendly design, and innovation. Enjoy reliable customer support and
                        precision in every detail.
                    </Typography>
                </Box>
                <Grid container spacing={3} >
                    {items.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index} mb={7}>
                            <Stack
                                direction="column"
                                color="inherit"
                                component={Card}
                                spacing={1}
                                useFlexGap
                                sx={{
                                    p: 3,
                                    height: '100%',
                                    border: '1px solid',
                                    borderColor: 'grey.800',
                                    background: 'transparent',
                                    bgcolor: rootColors.grey,
                                }}
                            >
                                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                                <div>
                                    <Typography fontWeight="medium" gutterBottom>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'grey.400' }}>
                                        {item.description}
                                    </Typography>
                                </div>
                            </Stack>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}