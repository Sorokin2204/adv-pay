import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
const GameButton = ({ onClick }) => {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);
  return (
    <div onClick={onClick} style={{ cursor: 'pointer', userSelect: 'none', width: '82px', height: '28px', position: 'relative', border: '1px solid rgb(255 255 255 / 50%)', borderRadius: '4px', overflow: 'hidden', marginRight: '8px' }}>
      <span style={{ fontSize: '14px', position: 'absolute', top: '49%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: '2', color: 'rgb(255 255 255)' }}>Игры</span>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: { enable: false },
          fpsLimit: 60,
          interactivity: {
            detect_on: 'canvas',
            events: {
              onclick: { enable: true, mode: 'repulse' },
              onhover: {
                enable: true,
                mode: 'bubble',
                parallax: { enable: false, force: 2, smooth: 10 },
              },
              resize: true,
            },
            modes: {
              bubble: { distance: 25, duration: 2, opacity: 0, size: 0, speed: 3 },
              grab: { distance: 50, line_linked: { opacity: 1 } },
              push: { particles_nb: 4 },
              remove: { particles_nb: 2 },
              repulse: { distance: 50, duration: 0.4 },
            },
          },
          particles: {
            color: { value: '#ffffff' },
            line_linked: {
              color: '#ffffff',
              distance: 50,
              enable: false,
              opacity: 0.4,
              width: 1,
            },
            move: {
              attract: { enable: false, rotateX: 600, rotateY: 600 },
              bounce: false,
              direction: 'none',
              enable: true,
              out_mode: 'out',
              random: true,
              speed: 0.3,
              straight: false,
            },
            number: { density: { enable: true, value_area: 300 }, value: 600 },
            opacity: {
              anim: { enable: true, opacity_min: 0.3, speed: 5, sync: false },
              random: {
                enable: true,
                minimumValue: 0.3,
              },
              value: 0.6,
            },
            shape: {
              type: 'circle',
            },
            size: {
              anim: { enable: false, size_min: 0.3, speed: 4, sync: false },
              random: false,
              value: 1,
            },
          },
          retina_detect: true,
        }}
      />
    </div>
    // <Button variant="outlined" onClick={onClick} sx={{ mr: 1, ml: 1 }}>
    //   Игры
    // </Button>
  );
};

export default GameButton;
