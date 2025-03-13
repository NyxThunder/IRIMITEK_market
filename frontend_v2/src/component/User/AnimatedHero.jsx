import React from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const AnimatedHero = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 100%)`,
                overflow: 'hidden',
            }}
        >
            {/* Animated Lines */}
            {[...Array(5)].map((_, index) => (
                <motion.div
                    key={index}
                    initial={{ x: '-100vw' }}
                    animate={{ x: '100vw' }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: index * 0.5,
                        ease: 'linear',
                    }}
                    style={{
                        position: 'absolute',
                        top: `${index * 20 + 10}%`,
                        width: '150%',
                        height: '2px',
                        background: 'rgba(255, 255, 255, 0.5)',
                    }}
                />
            ))}

            {/* Pulsating Circle */}
            <motion.div
                initial={{ opacity: 0.3, scale: 1 }}
                animate={{ opacity: 0.8, scale: 1.2 }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                style={{
                    position: 'absolute',
                    bottom: '20%',
                    right: '20%',
                    width: '100px',
                    height: '100px',
                    background: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: '50%',
                    filter: 'blur(15px)',
                }}
            />
        </Box>
    );
};

export default AnimatedHero;
