import { Avatar, Box, Card, CardContent, CardHeader, Container, Grid, Typography } from "@mui/material";
import { rootColors } from "../../Utilities/rootColors";


const userTestimonials = [
    {
        avatar: <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />,
        name: 'Remy Sharp',
        occupation: 'Senior Engineer',
        testimonial:
            "I absolutely love how versatile this product is! Whether I'm tackling work projects or indulging in my favorite hobbies, it seamlessly adapts to my changing needs. Its intuitive design has truly enhanced my daily routine, making tasks more efficient and enjoyable.",
    },
    {
        avatar: <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />,
        name: 'Travis Howard',
        occupation: 'Lead Product Designer',
        testimonial:
            "One of the standout features of this product is the exceptional customer support. In my experience, the team behind this product has been quick to respond and incredibly helpful. It's reassuring to know that they stand firmly behind their product.",
    },
    {
        avatar: <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />,
        name: 'Cindy Baker',
        occupation: 'CTO',
        testimonial:
            'The level of simplicity and user-friendliness in this product has significantly simplified my life. I appreciate the creators for delivering a solution that not only meets but exceeds user expectations.',
    },
    {
        avatar: <Avatar alt="Remy Sharp" src="/static/images/avatar/4.jpg" />,
        name: 'Julia Stewart',
        occupation: 'Senior Engineer',
        testimonial:
            "I appreciate the attention to detail in the design of this product. The small touches make a big difference, and it's evident that the creators focused on delivering a premium experience.",
    },
    {
        avatar: <Avatar alt="Travis Howard" src="/static/images/avatar/5.jpg" />,
        name: 'John Smith',
        occupation: 'Product Designer',
        testimonial:
            "I've tried other similar products, but this one stands out for its innovative features. It's clear that the makers put a lot of thought into creating a solution that truly addresses user needs.",
    },
    {
        avatar: <Avatar alt="Cindy Baker" src="/static/images/avatar/6.jpg" />,
        name: 'Daniel Wolf',
        occupation: 'CDO',
        testimonial:
            "The quality of this product exceeded my expectations. It's durable, well-designed, and built to last. Definitely worth the investment!",
    },
];


export default function Testimonials() {
   

    return (
        <Container
            id="testimonials"
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: { xs: 3, sm: 6 },
            }}
        >
            <Box
                sx={{
                    width: { sm: '100%', md: '60%' },
                    textAlign: { sm: 'left', md: 'center' },
                }}
            >
                <Typography component="h2" align="center" variant="h4" color="text.primary">
                    Testimonials
                </Typography>
                <Typography variant="body1" align="center" color="text.secondary" sx={{color:rootColors.text,mt:3 }}>
                    See what our customers love about our products. Discover how we excel in
                    efficiency, durability, and satisfaction. Join us for quality, innovation,
                    and reliable support.
                </Typography>
            </Box>
            <Grid container spacing={2}>
                {userTestimonials.map((testimonial, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
                        <Card
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                flexGrow: 1,
                                p: 1,
                                bgcolor:rootColors.grey,
                            }}
                        >
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {testimonial.testimonial}
                                </Typography>
                            </CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    pr: 2,
                                }}
                            >
                                <CardHeader
                                    avatar={testimonial.avatar}
                                    title={testimonial.name}
                                    subheader={testimonial.occupation}
                                />
                                {/* <img
                                    src={logos[index]}
                                    alt={`Logo ${index + 1}`}
                                    style={logoStyle}
                                /> */}
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}