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
            <li className="game__list-item"> Печати в игру приходят моментально, каждый пак содержит бонусные печати</li>
            <li className="game__list-item"> Ваш донат полностью легален, печати засчитываются в накопительный игровой счет Мисс Соловья</li>
            <li className="game__list-item"> Если возникла ошибка при донате, повторите попытку или напишите нам</li>
            <li className="game__list-item"> Мы не несем ответственности, если вы указали неверный ID</li>
            <li className="game__list-item"> Деньги сначала зачисляются на ваш лицевой счет сайта, потом вы их донатите в игру</li>
          </ul>
        </>
      ),
      helpImage: `/id_idv.jpg`,
      background: '/gameidv-bg.jpg',
      checkPlayer: true,
      checkRequired: true,
      checkText: 'Подтвердить',
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
      pacakgeImageList: [`/game-img-1.png`, `/game-img-2.png`, `/game-img-3.png`, `/game-img-4.png`, `/game-img-5.png`],
      privacyContent: (
        <>
          Игровую валюту на данной странице вы донатите в пользу NetEase Games. Мы не являемся правообладателем игровой валюты Identity V, не определяем порядок её использования и функционирования в игре. Производя донат в игру Identity V вы соглашаетесь с данным{' '}
          <a class="link" href="https://game.longeplay.com.tw/member/complete_agreement">
            {' '}
            пользовательским соглашением
          </a>
          ,{' '}
          <a class="link" href=" https://donate-gold.ru/terms-of-use">
            пользовательским соглашением Donate Gold
          </a>{' '}
          и нашей{' '}
          <a class="link" href="https://donate-gold.ru/privacy-policy">
            политикой конфиденциальности
          </a>
          .{' '}
        </>
      ),
    },
    {
      id: 2,
      name: 'Донат в игру Genshin Impact',
      desc: (
        <>
          <ul className="game__list">
            <li className="game__list-item"> На данной странице вы донатите в игру Genshin Impact самостоятельно, указывая только UID</li>
            <li className="game__list-item"> Донаты абсолютно легальны, наш сайт автоматизирует пополнение через официальных поставщиков (Codashop, RazerGold и др.)</li>
            <li className="game__list-item"> Если вы донатите себе впервые в игру, вам придут 2х кристаллов с каждого пака</li>
            <li className="game__list-item"> С каждым паком вам приходят бонусные кристаллы</li>
            <li className="game__list-item"> Донаты приходят от 1 минуты до ~30. Время зависит от загруженности сервера</li>
            <li className="game__list-item"> Для пользователей PlayStation после доната, нужно зайти в свой аккаунт с ПК или телефона, привязав его предварительно в PlayStation, и кристаллы придут на аккаунт</li>
            <li className="game__list-item"> Если возникла ошибка при донате, повторите попытку или напишите нам</li>
            <li className="game__list-item"> Мы не несем ответственности, если вы указали неверный UID</li>
            <li className="game__list-item"> Деньги сначала зачисляются на ваш лицевой счет сайта, потом вы их донатите в игру</li>
          </ul>
        </>
      ),
      helpImage: `/id_genshin.jpg`,
      background: '/back-genshin.jpg',
      checkPlayer: true,
      checkRequired: true,
      checkText: 'Проверить',
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
      pacakgeImageList: [`/game-img-6-1.png`, `/game-img-6.png`, `/game-img-7.png`, `/game-img-8.png`, `/game-img-9.png`, `/game-img-10.png`, `/game-img-11.png`],
      privacyContent: (
        <>
          Игровую валюту на данной странице вы донатите в пользу HoYoverse (miHoYo). Мы не являемся правообладателем игровой валюты Genshin Impact, не определяем порядок её использования и функционирования в игре. Производя донат в игру Genshin Impact вы соглашаетесь с данным{' '}
          <a class="link" href="https://genshin.hoyoverse.com/ru/company/privacy">
            {' '}
            пользовательским соглашением
          </a>
          ,{' '}
          <a class="link" href=" https://donate-gold.ru/terms-of-use">
            пользовательским соглашением Donate Gold
          </a>{' '}
          и нашей{' '}
          <a class="link" href="https://donate-gold.ru/privacy-policy">
            политикой конфиденциальности
          </a>
          .
        </>
      ),
    },
    {
      id: 3,
      name: 'Донат в игру Arena',
      desc: (
        <>
          <ul className="game__list">
            <li className="game__list-item"> На данной странице вы донатите в игру Arena самостоятельно, указывая только UID</li>
            <li className="game__list-item"> Донаты абсолютно легальны, наш сайт автоматизирует пополнение через официальных поставщиков (Codashop, RazerGold и др.)</li>
            <li className="game__list-item"> Если вы донатите себе впервые в игру, вам придут 2х кристаллов с каждого пака</li>
            <li className="game__list-item"> С каждым паком вам приходят бонусные кристаллы</li>
            <li className="game__list-item"> Донаты приходят от 1 минуты до ~30. Время зависит от загруженности сервера</li>
            <li className="game__list-item"> Для пользователей PlayStation после доната, нужно зайти в свой аккаунт с ПК или телефона, привязав его предварительно в PlayStation, и кристаллы придут на аккаунт</li>
            <li className="game__list-item"> Если возникла ошибка при донате, повторите попытку или напишите нам</li>
            <li className="game__list-item"> Мы не несем ответственности, если вы указали неверный UID</li>
            <li className="game__list-item"> Деньги сначала зачисляются на ваш лицевой счет сайта, потом вы их донатите в игру</li>
          </ul>
        </>
      ),
      helpImage: `/id_genshin.jpg`,
      background: '/back-genshin.jpg',
      checkPlayer: true,
      checkRequired: true,
      checkText: 'Проверить',
      serverList: [
        {
          name: 'Global',
          serverId: 'cs12',
        },
      ],
      pacakgeImageList: [`/game-img-6-1.png`, `/game-img-6.png`, `/game-img-7.png`, `/game-img-8.png`, `/game-img-9.png`, `/game-img-10.png`, `/game-img-11.png`],
      privacyContent: (
        <>
          Игровую валюту на данной странице вы донатите в пользу HoYoverse (miHoYo). Мы не являемся правообладателем игровой валюты Genshin Impact, не определяем порядок её использования и функционирования в игре. Производя донат в игру Genshin Impact вы соглашаетесь с данным{' '}
          <a class="link" href="https://genshin.hoyoverse.com/ru/company/privacy">
            {' '}
            пользовательским соглашением
          </a>
          ,{' '}
          <a class="link" href=" https://donate-gold.ru/terms-of-use">
            пользовательским соглашением Donate Gold
          </a>{' '}
          и нашей{' '}
          <a class="link" href="https://donate-gold.ru/privacy-policy">
            политикой конфиденциальности
          </a>
          .
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
  return <DrawerAppBar isFull>{dataFindTypeGame && dataPage ? <GamePageComponent data={dataPage} /> : errorFindTypeGame ? <NotFound /> : <></>}</DrawerAppBar>;
};
export default GamePage;
