// src/components/Contact.tsx
import React from 'react';
import { Card, CardContent, Typography, Stack, Box, Button, TextField } from '@mui/material';
import { Email as EmailIcon, Phone as PhoneIcon, LocationOn as LocationOnIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { rootColors } from "../../Utilities/rootColors";

const Contact: React.FC = () => {
  return (
    <Stack
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: { xs: 2, sm: 3, md: 4 }, // Responsive padding
        gap: 4,
        // bgcolor: rootColors.grey,
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 4, textAlign: 'center' }}>
        Contact Us
      </Typography>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={4}
        sx={{ flexWrap: 'wrap', justifyContent: 'center' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card sx={{ width: { xs: '100%', sm: 300 }, boxShadow: 3, bgcolor: rootColors.grey }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <EmailIcon color="primary" />
                <Typography variant="h6">Email Us</Typography>
              </Stack>
              <Typography sx={{ mt: 2 }}>support@example.com</Typography>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card sx={{ width: { xs: '100%', sm: 300 }, boxShadow: 3, bgcolor: rootColors.grey }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <PhoneIcon color="primary" />
                <Typography variant="h6">Call Us</Typography>
              </Stack>
              <Typography sx={{ mt: 2 }}>+123 456 7890</Typography>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card sx={{ width: { xs: '100%', sm: 300 }, boxShadow: 3, bgcolor: rootColors.grey  }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <LocationOnIcon color="primary" />
                <Typography variant="h6">Visit Us</Typography>
              </Stack>
              <Typography sx={{ mt: 2 }}>
                123 Example Street, City, Country
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      </Stack>
      
      <Stack
        sx={{
          width: '100%',
          maxWidth: '600px',
          mt: 4,
          bgcolor: rootColors.grey,
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Send Us Your Feedback
        </Typography>
        <Stack component={'form'} noValidate autoComplete="off" sx={{bgcolor: rootColors.grey}}>
          <Stack spacing={2}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              required
            />
            <TextField
              label="Message"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              required
            />
            <Button variant="contained" color="primary" type="submit">
              Send Feedback
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <Box sx={{ width: '100%', mt: 4, height: { xs: '300px', md: '400px' } }}>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118106.70010221681!2d73.17308625!3d22.32210265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc8ab91a3ddab%3A0xac39d3bfe1473fb8!2sVadodara%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1722919058678!5m2!1sen!2sin" width="100%" height="450" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </Box>
    </Stack>
  );
};

export default Contact;
