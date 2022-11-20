import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import HomeLayout from '../components/HomeLayout';
import { Box, Container, Typography } from '@mui/material';
import Footer from '../components/Footer';
const AboutPage = () => {
  return (
    <>
      {' '}
      <HomeLayout>
        <Container>
          <Box sx={{ marginTop: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start' }}>
			  <Typography variant="h4" sx={{ mt: 2 }}>О сервисе</Typography>
			  <Typography variant="body1" sx={{ maxWidth: '100%', mt: 2 }}>
                Наш сервис позволяет донатить в мобильные и компьютерные игры напрямую разработчикам через их API. Все ваши транзакции абсолютно легальны. Банов ваших аккаунтов не будет, проверено тысячами пользователей.<br/><br/>
				
				Позвольте коротко объяснить как это работает. В каждой современной игре есть внутриигровая валюта, будь то кристалы, монетки, печати, золото и прочие названия. Это донатная валюта, которая покупается за реальные деньги игроками. Игрок по сути обменивает валюту настоящую на валюту виртуальную, и покупают на неё различный контент в игре. Чтобы купить донатную валюту в играх существуют магазины, где игрок выбирая соответствующий номинал (пак валюты) - совершает покупку валюты (донатит). Сама покупка происходит через магазин приложений, например App Store или Google Play. Эти платформы удерживают с разработчика большой процент от перевода игрока. И чтобы снижать свои расходы, у каждого разработчика игры есть так называемые прямые продажи игровой валюты (Direct Payment или Direct Top Up). <br/><br/>
				<img src="/shema.jpg" style={{ maxWidth: '100%'}} /><br/><br/>
				В этом случае продажа игровой валюты идет не через платформы гигантов App Store и Google Play, а или напрямую через разработчика и свой веб-ресурс или через платежные агрегаторы. При этом техническая механика пополнения счета виртуальной игровой валютой в игре остается прежней. Все транзакции происходят через API разработчика. С единственной разницей, что вы указываете свой игровой ID аккаунта, куда хотите задонатить. Наш сервис этим и занимается.<br/><br/>
              </Typography>
            </Box>
          </Box>
        </Container>
      </HomeLayout>
    </>
  );
};

export default AboutPage;
