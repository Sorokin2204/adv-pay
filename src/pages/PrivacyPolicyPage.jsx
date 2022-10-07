import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import HomeLayout from '../components/HomeLayout';
import { Box, Container, Typography } from '@mui/material';
import Footer from '../components/Footer';
const PrivacyPolicyPage = () => {
  return (
    <>
      {' '}
      <HomeLayout>
        <Container>
<Box sx={{ marginTop: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start' }}>
              <Typography variant="h4" sx={{ mt: 2 }}>
                Политика конфиденциальности
              </Typography>
              <Typography variant="body1" sx={{ margin: '0 auto', maxWidth: '100%', mt: 2 }}>
		Конфидециальность ваших данных является одним из приоритетов работы нашего сервиса. В данном документе содержится список информация, которую мы собираем и то как мы её используем.
<br /><br />
Куки (cookies)<br />
Мы используем файлы cookies на нашем сайте. Используя сайт Donate Gold, вы соглашаетесь использовать файлы cookies в соответствии с нашей политикой конфиденциальности.<br /><br />

Логирование<br />
Мы используем для записи действий на сайте стандартные log файлы. Когда пользователь находится на сайте, стандартными способами регистрации действий на сайте фиксируются в log файлы. Записываются IP пользователей, тип браузера, дата и время посещения страницы, переходы на другие страницы и клики. Эти данные никак не индетифицируют пользователя. Данная информация предназначена только для общего анализа поведения пользователя на сайте.<br /><br />

Какие данные мы собираем и храним<br />
- Email пользователя - используется для регистрации пользователя и необходим для авторизации.<br />
Мы не проверяем достоверность этих данных, предоставляемой пользователями, и не осуществляет контроль за их дееспособностью. Однако мы исходим из того, что пользователь предоставляет достоверную информацию, указанные им при регистрации данные принадлежат лично ему и поддерживает эту информацию в актуальном состоянии. Риск предоставления недостоверной информации несет предоставивший ее пользователь.<br /><br />

- Баланс пользователя на сайте, суммы, даты, количество и наименование покупок.<br />
Указанные данные собираются и хранятся для статистической информации, а так же для предоставления этих данных конкретному пользователю его данных.<br /><br />

Все указанные выше данные хранятся в строгой конфиденциальности, кроме случаев добровольного предоставления пользователем информации о себе для общего доступа неограниченному кругу лиц.<br /><br />

Сервис вправе передать указанные данные пользователя третьим лицам, если передача предусмотрена российским или иным применимым законодательством в рамках установленной законодательством процедуры.<br /><br />

Пользователь вправе полностью удалить свой аккаунт со всеми его пользовательскими данными.<br /><br />

Мы вправе вносить изменения в настоящую политику конфиденциальности. Новая редакция политики конфиденциальности вступает в силу с момента ее опубликования на данной странице.<br /><br />
		              </Typography>
            </Box>
 </Box>
		</Container>
      </HomeLayout>
    </>
  );
};

export default PrivacyPolicyPage;
