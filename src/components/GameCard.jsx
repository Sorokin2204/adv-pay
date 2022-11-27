import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import '../styles/GameCard.scss';
import { currencyFormat } from '../utils/currencyFormat';
const GameCard = ({ img, disabled, price,gameId, label, value, onClickCard, onClickCart, onClick = () => {}, active }) => {
  return (
    <div className={`game-card ${active && 'game-card--active'}`} onClick={onClickCard}>
      <img src={img} alt="" className="game-card__img" />
      <div className="game-card__middle">
        <img
          src={`/game-icon-${gameId}.png`}
          style={{
            objectFit: 'contain',
            display: 'block',
            width: '22px',
            height: '22px',
          }}
        />
        {label}
      </div>
      <div className="game-card__bottom">
        <div className="game-card__price">{currencyFormat(price)}</div>
        <div className="game-card__btn-box">
          <button className="game-card__cart" onClick={onClickCart}>
            Купить
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
