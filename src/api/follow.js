import axios from 'axios';
import { BASE_URL } from './baseUrl';

export const followApi = async (accountname, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/profile/${accountname}/follow`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      },
    );
    return res;
  } catch (err) {
    console.error('API 응답에 실패하였습니다.', err);
  }
};

export const unfollowApi = async (accountname, token) => {
  try {
    const res = await axios.delete(
      `${BASE_URL}/profile/${accountname}/unfollow`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json',
        },
      },
    );
    return res;
  } catch (err) {
    console.error('API 응답에 실패하였습니다.', err);
  }
};
