import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import '../styles/ListGame.scss';
import ItemGame from './ItemGame';
const ListGame = () => {
  const listGame = [
    { img: '/genshin-impact.jpg', name: 'Genshin Impact', link: 'genshin-impact' },
    { img: '/identityv.png', name: 'Identity V', link: 'identity-v' },
    { img: '/onmyoji-arena.jpg', name: 'Onmyoji Arena', link: 'onmyoji-arena' },
	{ img: '/lotr-risetowar.jpg', name: 'Скоро!' },
  ];
  return (
    <>
      <div className="list-game">
        {listGame?.map((item) => (
          <ItemGame {...item} />
        ))}
      </div>
    </>
  );
};

export default ListGame;