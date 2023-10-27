import styled from 'styled-components';
import { ButtonStyle } from '../common/Button/Button';

const ButtonWrap = styled.div`
  padding: 0 22px;
  display: flex;
`;

const SortButton = styled(ButtonStyle)`
  width: 140px;
  height: 34px;
  border: 1px solid var(--DBDBDB, #dbdbdb);
  margin: 15px 0 15px auto;
  color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #ff644b;
    color: #fff;
    transition: 0.2s;
  }
`;

const PlaceWrap = styled.ul`
  padding: 0 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const PlaceItem = styled.li`
  width: 165px;
  height: 190px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
    /* box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px; */
    /* rgba(60, 64, 67, 0.15) 0px 2px 6px 2px; */
    transition: 0.2s;
  }
`;

const PlaceImg = styled.img`
  display: block;
  width: 100%;
  height: 130px;
  border-bottom: 1px solid var(--DBDBDB, #dbdbdb);
  border-radius: 8px 8px 0px 0px;
  object-fit: cover;
  box-sizing: border-box;
`;

const PlaceInfo = styled.div`
  width: 100%;
  height: 58px;
  padding: 13px;
  box-sizing: border-box;
`;

const PlaceName = styled.p`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 5px;
`;

const StarWrap = styled.div`
  display: flex;
  align-items: center;
`;

const Rate = styled.p`
  font-size: 12px;
  margin: 1px 0 0 2px;
  color: #ffc700;
`;

const Star = styled.img`
  width: 14px;
  height: 14px;
`;

export {
  PlaceWrap,
  ButtonWrap,
  PlaceItem,
  SortButton,
  PlaceImg,
  PlaceInfo,
  PlaceName,
  StarWrap,
  Star,
  Rate,
};