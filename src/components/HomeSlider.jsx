import React, { useState } from 'react';

// react-id-swiper
import 'swiper/css/swiper.css';
import Swiper from 'react-id-swiper';
import '../styles/HomeSlider.scss';
import { Box, Container } from '@mui/material';
//Images
const image1 = '/slide-1.jpg';
const image2 = '/slide-2.jpg';
const image3 = '/slide-3.jpg';

//slider config options

const HeroSliderConfigs = {
  containerClass: 'swiper-container hero-slider',
  parallax: true,
  centeredSlides: true,
  speed: 300,
  spaceBetween: 0,
  effect: 'fade',
  pagination: {
    el: '.swiper-pagination-custom',
    clickable: true,
  },
  autoplay: {
    delay: 5000,
  },
};

//slider component
const HomeSlider = () => {
  const [parallaxSwiper, setParallaxSwiper] = useState(null);
  const parallaxAmount = parallaxSwiper ? parallaxSwiper.width * 0.1 : 0;
  const parallaxOpacity = 0.5;

  return (
    <div>
      <Swiper {...HeroSliderConfigs} getSwiper={setParallaxSwiper}>
        {/* 1 */}
        <div className="hero-slide">
          <div className="slide-image" data-swiper-parallax={parallaxAmount} data-swiper-parallax-opacity={parallaxOpacity}>
            <img src={image1} alt="image1" />
          </div>

          <div className="col-md-6 offset-md-3 my-auto text-center text-white content">
            <Box
              sx={{
                maxWidth: '1000px',
                display: 'flex',
                justifyContent: { mobile: 'space-between', xs: 'end' },
                alignItems: { mobile: ' end', xs: 'center' },
                height: { mobile: '480px', xs: '200px' },
                margin: '0 auto',
                padding: ' 0 30px',
                paddingBottom: { mobile: '0px', xs: '30px' },
                flexDirection: { mobile: 'row', xs: 'column' },
              }}>
              <div data-swiper-parallax={parallaxAmount} data-swiper-parallax-opacity={parallaxOpacity}>
                <Box className="" sx={{ marginBottom: '5px', fontSize: { mobile: '24px', xs: '18px' }, textAlign: { mobile: 'left', xs: 'center' } }}>
                  Кроссовер Identity V x Bungou Stray Dogs уже скоро!
                </Box>
                <Box className="mb-5 small" sx={{ opacity: '0.7', marginBottom: { mobile: '0px', xs: '15px' }, textAlign: { mobile: 'left', xs: 'center' } }}>
                  Старт отложен
                </Box>
              </div>{' '}
              {/* <button class="slider-button">Identity V</button> */}
            </Box>
          </div>
        </div>
        {/* 2 */}
        <div className="hero-slide">
          <div className="slide-image" data-swiper-parallax={parallaxAmount} data-swiper-parallax-opacity={parallaxOpacity}>
            <img src={image2} alt="image2" />
          </div>
          <div className="col-md-6 offset-md-3 my-auto text-center text-white content">
            <Box
              sx={{
                maxWidth: '1000px',
                display: 'flex',
                justifyContent: { mobile: 'space-between', xs: 'end' },
                alignItems: { mobile: ' end', xs: 'center' },
                height: { mobile: '480px', xs: '200px' },
                margin: '0 auto',
                padding: ' 0 30px',
                paddingBottom: { mobile: '0px', xs: '30px' },
                flexDirection: { mobile: 'row', xs: 'column' },
              }}>
              <div data-swiper-parallax={parallaxAmount} data-swiper-parallax-opacity={parallaxOpacity}>
                <Box className="" sx={{ marginBottom: '5px', fontSize: { mobile: '24px', xs: '18px' }, textAlign: { mobile: 'left', xs: 'center' } }}>
                  Костюм Акробата S класса «Шляпник»
                </Box>
                <Box className="mb-5 small" sx={{ opacity: '0.7', marginBottom: { mobile: '0px', xs: '15px' }, textAlign: { mobile: 'left', xs: 'center' } }}>
                  Хэллоуин событие доступно с 20.10
                </Box>
              </div>{' '}
              {/* <button class="slider-button">Find out Now</button> */}
            </Box>
          </div>
        </div>
      </Swiper>
      {/* <div className="swiper-pagination-custom"></div> */}
    </div>
  );
};

export default HomeSlider;
