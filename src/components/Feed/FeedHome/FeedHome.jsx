import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
// import { useRecoilState } from 'recoil';
import FeedItem from '../FeedItem/FeedItem';
import { feed } from '../../../api/feed';
import Loading from '../../Loading/Loading';
import NoFeedHome from './NoFeedHome';
// import { modalState } from '../../../recoil/modalAtom';
// import Modal from '../Modal/Modal/Modal';

const List = styled.ul`
  background-color: white;
  padding: 57px 24px 69px 24px;
`;

export default function PostHome() {
  // const [modal, setModal] = useRecoilState(modalState);
  const [loading, setLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [myFeed, setMyFeed] = useState([]);
  const [page, setPage] = useState(0);
  const observer = useRef();

  // localStorage 임시 ID/PW 저장
  localStorage.setItem(
    'token',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OWE0NmFjYjJjYjIwNTY2M2ZkOGM4ZSIsImV4cCI6MTcwMzI5MzYzNSwiaWF0IjoxNjk4MTA5NjM1fQ.IeIrtAf9c3yisCOq5eP22Fbus_iaCCVVt7UGZUqVU7M',
  );

  const token = localStorage.getItem('token');

  const getFeed = async (options) => {
    const res = await feed(options);
    if (options.test === 1) setMyFeed(res.data.posts);
    return res.data.posts;
  };

  const loadFeed = async (options) => {
    const posts = await getFeed(options);
    setMyFeed((prev) => [...prev, ...posts]);
    setSkip((prev) => prev + posts.length);
    setLoading(false);
  };
  useEffect(() => {
    const onIntersect = (entries) => {
      const target = entries[0];
      if (target.isIntersecting) setPage((p) => p + 1);
    };
    const io = new IntersectionObserver(onIntersect, { threshold: 0.5 });

    if (observer?.current) {
      io.observe(observer.current);
    }
    return () => io && io.disconnect();
  }, [observer, loading]);

  useEffect(() => {
    loadFeed({ token, limit: 10, skip });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // const modalOpen = (id) => {
  //   setModal({
  //     show: true,
  //     postId: id,
  //   });
  // };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {loading ? (
        <Loading />
      ) : myFeed.length > 1 ? (
        <main>
          <List>
            {myFeed.map((item) => (
              <li key={item.id}>
                <FeedItem
                  // modalOpen={modalOpen}
                  otherInfo={item}
                  getFeed={getFeed}
                  commentCnt={item.commentCount}
                  skip={skip}
                />
              </li>
            ))}
          </List>
          <div ref={observer} />
          {/* {modal.show && <Modal type='report' />} */}
        </main>
      ) : (
        <NoFeedHome />
      )}
    </>
  );
}
