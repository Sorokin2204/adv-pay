import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import clsx from 'clsx';
import HomeLayout from '../components/HomeLayout';
import { Container } from '@mui/material';
import axios from 'axios';
import { getVkReviews } from '../redux/slices/app.slice';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import VK, { Comments } from 'react-vk';
import moment from 'moment';
import 'moment/locale/ru'; // without this line it didn't work
moment.locale('ru');
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const location = useLocation();
  console.log(location?.pathname);
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ px: { xs: 0, mob: 2 }, py: { xs: 1, mob: 2 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const ReviewsPage = () => {
  const [value, setValue] = React.useState(0);
  const [page, setPage] = useState(null);
  const [hideMoreBtn, setHideMoreBtn] = useState(true);
  const [viewComments, setViewComments] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();
  const {
    getVkReviewsState: { data: comments, loading: commentsLoading, error: checkError },
  } = useSelector((state) => state.app);
  useEffect(() => {
    if (page !== null) {
      dispatch(getVkReviews(page));
    }
  }, [page]);
  useEffect(() => {
    setPage(0);
  }, []);

  useEffect(() => {
    if (comments && !commentsLoading) {
      if (comments?.items?.length == 0) {
        setHideMoreBtn(false);
      } else {
        setViewComments([...viewComments, ...comments?.items]);
        setHideMoreBtn(true);
      }
    }
  }, [comments]);
  useEffect(() => {}, []);

  return (
    <>
      <HomeLayout>
        <Container>
          <Typography variant="h4" sx={{ mt: 2 }}>
            Отзывы
          </Typography>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Вконтакте" {...a11yProps(0)} />
                <Tab label="На сайте" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <ul class="vk-comments__list">
                {viewComments?.map((comment) => {
                  let commentName;
                  let commentPhoto;
                  let commentLink;
                  let commentDate = moment(comment?.date * 1000).format('DD MMMM YYYY в HH:mm');
                  if (comment?.profile) {
                    commentName = `${comment?.profile?.first_name} ${comment?.profile?.last_name}`;
                    commentPhoto = comment?.profile?.photo_50;
                    commentLink = `https://vk.com/id${comment?.profile?.id}`;
                  }
                  if (comment?.group) {
                    commentName = comment?.group?.name;
                    commentPhoto = comment?.group?.photo_50;
                    commentLink = `https://vk.com/${comment?.group?.screen_name}`;
                  }

                  return (
                    <li class="vk-comments__item">
                      <a href={commentLink} target="_blank">
                        <img src={commentPhoto} alt="" class="vk-comments__avatar" />
                      </a>
                      <div class="vk-comments__content">
                        <a href={commentLink} target="_blank" class="vk-comments__name">
                          {commentName}
                        </a>
                        <div class="vk-comments__text">{comment?.text}</div>
                        {comment?.attachments?.map((attach) => {
                          if (attach?.type === 'photo') {
                            return <img class="vk-comments__img" src={attach?.photo?.sizes[4]?.url} />;
                          }
                        })}

                        <div class="vk-comments__date">{commentDate}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              {hideMoreBtn && !commentsLoading && (
                <button
                  onClick={() => {
                    setPage(page + 1);
                    setHideMoreBtn(false);
                  }}
                  className="vk-comments__more">
                  Показать ещё
                </button>
              )}
            </TabPanel>
            <TabPanel value={value} index={1}>
              <VK apiId={process.env.REACT_APP_VK_WIDGET_APP_KEY}>
                <div className="" id="vk-comm"></div>
                <Comments elementId={'vk-comm'} />
              </VK>
            </TabPanel>
          </Box>
        </Container>
      </HomeLayout>
    </>
  );
};

export default ReviewsPage;
