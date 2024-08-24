// PaymentCancel.jsx
import React from 'react';
import { Container, Typography, Button, Paper, Stack } from '@mui/material';

const PaymentCancel = () => {
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
                        <Typography variant="h4" color="error.main">
                            Payment Cancelled
                        </Typography>
                        <Typography variant="body1">
                            We're sorry, but your payment was not processed.
                        </Typography>
                        <Typography variant="body1">
                            Please try again or contact support if the issue persists.
                        </Typography>
                        <Button variant="contained" color="secondary" href="/">
                            Return to Home
                        </Button>
                    </Stack>
                </Paper>
            </Container>
        </Paper>

    );
};

export default PaymentCancel;
