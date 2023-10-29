import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FeedItem from '../FeedItem/FeedItem';
import sprite from '../../../images/SpriteIcon.svg';
import Stack from '../../../images/stack.svg';
import Modal from '../../Modal/Modal/Modal';
import FeedEdit from '../FeedEdit/FeedEdit';
import {
  FeedListBtnWrap,
  ImgInfo,
  ImgBtn,
  FeedItemList,
  FeedListItem,
  GridItemWrap,
  GridItemList,
  IconContainer,
  Icon,
  Likes,
  Comments,
} from './StyledFeedList';
import { userFeedListApi } from '../../../api/feed';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../recoil/modalAtom';
import { useRef } from 'react';

export default function FeedList() {
  const ViewSVG = ({ id, color = 'white', size = 26 }) => (
    <svg fill={color} width={size} height={size} stroke={color}>
      <use href={`${sprite}#${id}`} />
    </svg>
  );

  const [viewMode, setViewMode] = useState('list');
  const location = useLocation();
  const navigate = useNavigate();
  const [feedInfo, setFeedInfo] = useState([]);
  const [hasFeeds, setHasFeeds] = useState(false);
  const [feedEditModalOpen, setFeedEditModalOpen] = useState(false);
  const [modal, setModal] = useRecoilState(modalState);
  const observer = useRef();
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(0);
  const limit = 10;

  const { accountname } = location.state || {};
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const getUserInfo = useCallback(async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await userFeedListApi(
        accountname || localStorage.getItem('accountname'),
        token,
        limit,
        skip,
      );
      const posts = res.data.post;
      setSkip((prev) => prev + posts.length);
      if (posts.length === 0 && page === 0) {
        setHasFeeds(false);
      } else {
        setHasFeeds(true);
        setFeedInfo((prev) => [...prev, ...posts]);
      }
    } catch (error) {
      console.error('error');
      navigate('/error');
    }
  }, [accountname, limit, skip, page, navigate]);

  useEffect(() => {
    if (page === 0) return;
    getUserInfo();
  }, [page, getUserInfo]);

  function moveDetail(item) {
    navigate(`/detailfeed`, {
      state: {
        id: item.id,
        infoToIterate: item,
      },
    });
    setModal({ show: false });
  }

  const modalOpen = (type, item) => {
    setModal({
      show: true,
      type,
      feedId: item.id,
      accountname: item.author.accountname,
      item: item,
    });
  };

  const openFeedEditModal = () => {
    setFeedEditModalOpen(true);
  };

  const closeFeedEditModal = () => {
    setFeedEditModalOpen(false);
    setModal((prevModal) => ({ ...prevModal, show: false }));
    window.location.reload();
  };

  useEffect(() => {
    const onIntersect = (entries) => {
      const target = entries[0];
      if (target.isIntersecting) setPage((p) => p + 1);
    };
    const io = new IntersectionObserver(onIntersect, { threshold: 1 });

    if (observer?.current) {
      io.observe(observer.current);
    }
    return () => io && io.disconnect();
  }, [observer]);

  useEffect(() => {
    setSkip(0);
    setPage(0);
    setFeedInfo([]);
  }, [location]);

  return (
    <>
      {hasFeeds && (
        <>
          <FeedListBtnWrap>
            <button type='button' onClick={() => handleViewModeChange('list')}>
              <ViewSVG
                id={
                  viewMode === 'list'
                    ? 'icon-post-list-on'
                    : 'icon-post-list-off'
                }
              />
              <h2 className='a11y-hidden'>게시물 리스트 타입으로 보기 버튼</h2>
            </button>
            <button type='button' onClick={() => handleViewModeChange('album')}>
              <ViewSVG
                id={
                  viewMode === 'album'
                    ? 'icon-post-album-on'
                    : 'icon-post-album-off'
                }
              />
              <h2 className='a11y-hidden'>게시물 앨범 형태로 보기 버튼</h2>
            </button>
          </FeedListBtnWrap>
          {viewMode === 'list' ? (
            <FeedItemList>
              {feedInfo.map((item) => (
                <FeedListItem key={item.id}>
                  <FeedItem
                    modalOpen={() =>
                      modalOpen(!accountname ? 'myFeed' : 'yourFeed', item)
                    }
                    feedInfo={item}
                    getUserInfo={getUserInfo}
                    commentCnt={item.commentCount}
                  />
                </FeedListItem>
              ))}
            </FeedItemList>
          ) : (
            <GridItemWrap>
              {feedInfo.map((item) => (
                <GridItemList $hasimage={item.image === ''} key={item.id}>
                  <ImgBtn
                    onClick={() => {
                      moveDetail(item);
                    }}
                  >
                    {item.image !== '' && (
                      <img
                        src={
                          item.image.startsWith('https://')
                            ? item.image.split(',')[0].trim()
                            : `https://api.mandarin.weniv.co.kr/${item.image
                                .split(',')[0]
                                .trim()}`
                        }
                        alt='grid 이미지'
                      />
                    )}
                    {item.image.includes(',') && (
                      <IconContainer>
                        <Icon src={Stack} />
                      </IconContainer>
                    )}
                    <ImgInfo>
                      <Likes>
                        <ViewSVG id='icon-heart' size={19} />
                        {item.heartCount}
                      </Likes>
                      <Comments>
                        <ViewSVG id='icon-message-circle' size={19} />
                        {item.commentCount}
                      </Comments>
                    </ImgInfo>
                  </ImgBtn>
                </GridItemList>
              ))}
            </GridItemWrap>
          )}
        </>
      )}
      <div ref={observer} />
      {modal.show && (
        <Modal
          type={modal.type}
          handlerFeedEdit={openFeedEditModal}
          handlerDetailFeed={() => moveDetail(modal.item)}
        />
      )}
      {feedEditModalOpen && (
        <FeedEdit closeModal={closeFeedEditModal} feedId={modal.feedId} />
      )}
    </>
  );
}
