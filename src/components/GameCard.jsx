import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import '../styles/GameCard.scss';
import { currencyFormat } from '../utils/currencyFormat';
const GameCard = ({ img, price, label, value, onClickCard, onClick = () => {}, active }) => {
  return (
    <div className={`game-card ${active && 'game-card--active'}`} onClick={onClickCard}>
      <img src={img} alt="" className="game-card__img" />
      <div className="game-card__middle">{`× ${value} печатей`}</div>
      <div className="game-card__bottom">
        <div className="game-card__price">{currencyFormat(price)}</div>
        <div className="game-card__btn-box">
          <button className="game-card__cart"></button>
          <button className={`game-card__donate ${active && 'game-card__donate--active'}`} onClick={onClick}>
            Задонатить
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
