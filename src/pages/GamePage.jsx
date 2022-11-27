import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router';
import DrawerAppBar from '../components/MainLayout';
import NotFound from '../components/NotFound';
import { findTypeGame } from '../redux/slices/typeGame.slice';
import GamePageComponent from './GamePageComponents';

const GamePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const gameList = [
    {
      id: 1,
      name: 'Донат в игру Identity V',
      desc: (
        <>
          <ul className="game__list">
            <li className="game__list-item"> печати в игру приходят моментально, каждый пак содержит бонусные печати</li>
            <li className="game__list-item"> ваш донат полностью легален, печати засчитываются в накопительный игровой счет Мисс Соловья</li>
            <li className="game__list-item"> если возникла ошибка при донате, повторите попытку или напишите нам</li>
            <li className="game__list-item"> мы не несем ответственности, если вы указали неверный ID</li>
			<li className="game__list-item"> деньги сначала зачисляются на ваш лицевой счет сайта, потом вы их донатите в игру</li>
          </ul>
        </>
      ),
      helpImage: `/id_idv.jpg`,
      background: '/gameidv-bg.jpg',
      checkPlayer: true,
      serverList: [
        {
          name: 'NA/EU',
          serverId: '2011',
        },
        {
          name: 'Asia',
          serverId: '2001',
        },
      ],
      pacakgeImageList: [`/game-img-1.png`, `/game-img-2.png`, `/game-img-3.png`, `/game-img-4.png`, `/game-img-5.png` ,],
      privacyContent: (<>Игровую валюту на данной странице вы донатите в пользу NetEase Games. Мы не являемся правообладателем игровой валюты Identity V, не определяем порядок её использования и функционирования в игре. Производя донат в игру Identity V вы соглашаетесь с данным <a class="link" href="https://game.longeplay.com.tw/member/complete_agreement">           пользовательским соглашением</a>, <a class="link" href=" https://donate-gold.ru/terms-of-use">пользовательским соглашением Donate Gold</a> и нашей <a class="link" href="https://donate-gold.ru/privacy-policy">политикой конфиденциальности</a>. </>
      ),
    },
    {
      id: 2,
      name: 'Донат в игру Genshin Impact',
      desc: (
        <>
          <ul className="game__list">
            <li className="game__list-item"> Первый</li>
            <li className="game__list-item"> Второй</li>
            <li className="game__list-item"> Третий</li>
            <li className="game__list-item"> Четвертый</li>
          </ul>
        </>
      ),
      helpImage: `/game-img-1.png`,
      background: '/back-genshin.jpg',
      checkPlayer: false,
      serverList: [
        {
          name: 'Europe',
          serverId: 'Europe',
        },
		{
          name: 'America',
          serverId: 'America',
        },
                {
          name: 'Asia',
          serverId: 'Asia',
        },
        {
          name: 'TW, HK, MO',
          serverId: 'TW, HK, MO',
        },
      ],
      pacakgeImageList: [`/game-img-6-1.png`, `/game-img-6.png`, `/game-img-6.png`, `/game-img-6.png`, `/game-img-6.png`, `/game-img-6.png`, `/game-img-6.png`],
      privacyContent: (
        <>Игровую валюту на данной странице вы донатите в пользу HoYoverse (miHoYo). Мы не являемся правообладателем игровой валюты Genshin Impact, не определяем порядок её использования и функционирования в игре. Производя донат в игру Genshin Impact  вы соглашаетесь с данным <a class="link" href="https://genshin.hoyoverse.com/ru/company/privacy">           пользовательским соглашением</a>, <a class="link" href=" https://donate-gold.ru/terms-of-use">пользовательским соглашением Donate Gold</a> и нашей <a class="link" href="https://donate-gold.ru/privacy-policy">политикой конфиденциальности</a>.
        </>
      ),
    },
  ];
  const [dataPage, setDataPage] = useState(null);
  const {
    findTypeGameState: { data: dataFindTypeGame, error: errorFindTypeGame },
  } = useSelector((state) => state.typeGame);

  useEffect(() => {
    if (id) {
      dispatch(findTypeGame(id));
    }
  }, [id]);
  useEffect(() => {
    if (dataFindTypeGame && !errorFindTypeGame) {
      const findGame = gameList?.find((gameItem) => gameItem?.id === dataFindTypeGame?.id);
      if (findGame) {
        setDataPage(findGame);
      }
    }
  }, [dataFindTypeGame]);
  console.log(dataPage);
  return <DrawerAppBar isFull>{dataFindTypeGame && dataPage ? <GamePageComponent data={dataPage} /> : errorFindTypeGame ? <NotFound /> : <></>}</DrawerAppBar>;
};
export default GamePage;
