// PaymentSuccess.jsx
import { Container, Typography, Button, Paper, Stack } from '@mui/material';

const PaymentSuccess = () => {
    return (
        <Paper
            elevation={3}
            sx={{
                padding: '2rem',
                textAlign: 'center',
                bgcolor: 'background.paper',
                borderRadius: 2
            }}
        >

            <Container component="main" maxWidth="xs">
                <Paper elevation={3} style={{ padding: '2rem', textAlign: 'center' }}>
                    <Stack spacing={2}>
                        <Typography variant="h4" color="success.main">
                            Payment Successful!
                        </Typography>
                        <Typography variant="body1">
                            Your payment was processed successfully.
                        </Typography>
                        <Typography variant="body1">
                            Thank you for your purchase!
                        </Typography>
                        <Button variant="contained" color="primary" href="/">
                            Return to Home
                        </Button>
                    </Stack>
                </Paper>
            </Container>
        </Paper>
    );
};

export default PaymentSuccess;
