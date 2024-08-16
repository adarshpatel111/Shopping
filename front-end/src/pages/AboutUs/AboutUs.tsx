// src/components/AboutUs.tsx
import React from 'react';
import { Stack, Typography, Card, CardContent, Box, Container, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { rootColors } from "../../Utilities/rootColors";
import { Work as WorkIcon, School as SchoolIcon, Favorite as FavoriteIcon } from '@mui/icons-material';

const AboutUs: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ padding: { xs: 2, sm: 4 }, bgcolor: rootColors.primary }}>
      {/* Header Section */}
      <Stack spacing={4} alignItems="center" sx={{ textAlign: 'center', padding: '20px 0' }}>
        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          About Us
        </Typography>
        <Typography variant="h5" sx={{ color: rootColors.text }}>
          We are a passionate team dedicated to delivering the best experience to our customers.
        </Typography>
      </Stack>

      {/* Cards Section */}
      <Stack
        spacing={4}
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="center"
        alignItems="center"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card sx={{ width: { xs: '100%', sm: 300 }, boxShadow: 3, borderRadius: 2, bgcolor: rootColors.grey }}>
            <CardContent>
              <Stack spacing={2} alignItems="center">
                <Avatar sx={{ width: 80, height: 80, bgcolor: rootColors.text }}>
                  <WorkIcon />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Our Mission
                </Typography>
                <Typography>
                  To create value for our clients by providing innovative solutions and excellent service.
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Card sx={{ width: { xs: '100%', sm: 300 }, boxShadow: 3, borderRadius: 2, bgcolor: rootColors.grey }}>
            <CardContent>
              <Stack spacing={2} alignItems="center">
                <Avatar sx={{ width: 80, height: 80, bgcolor: rootColors.text }}>
                  <SchoolIcon />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Our Values
                </Typography>
                <Typography>
                  Integrity, Excellence, and Innovation are the cornerstones of our approach to business.
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <Card sx={{ width: { xs: '100%', sm: 300 }, boxShadow: 3, borderRadius: 2, bgcolor: rootColors.grey }}>
            <CardContent>
              <Stack spacing={2} alignItems="center">
                <Avatar sx={{ width: 80, height: 80, bgcolor: rootColors.text }}>
                  <FavoriteIcon />
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Our Team
                </Typography>
                <Typography>
                  A diverse group of professionals dedicated to achieving excellence in every project.
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </motion.div>
      </Stack>

      {/* Connect with Us Section */}
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Connect with Us
        </Typography>
        <Typography>
          We are always here to help. Feel free to reach out to us via our contact page.
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUs;
