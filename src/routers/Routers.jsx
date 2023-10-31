import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Splash from '../pages/Splash/Splash';
import Welcome from '../pages/Welcome/Welcome';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';
import SignUpSuccess from '../pages/SignUp/SignUpSuccess';
import ProfileSetting from '../pages/ProfileSetting/ProfileSetting';
import Home from '../pages/Home/Home';
import Search from '../pages/Search/Search';
import ChatList from '../pages/Chat/ChatList';
import ErrorPage from '../pages/Error/ErrorPage';
import ChatRoom from '../pages/Chat/ChatRoom';
import MakeFeed from '../pages/Feed/MakeFeed';
import Profile from '../pages/Profile/Profile';
import ProfileEdit from '../pages/Profile/ProfileEdit';
import DetailFeed from '../pages/Feed/DetailFeed';
import FollowerList from '../pages/FollowerList/FollowerList';
import PlaceList from '../pages/Place/PlaceList';
import MakePlace from '../pages/Place/MakePlace';
import Map from '../pages/Place/Map';

export default function Routers() {
  return (
    <Routes basename={process.env.PUBLIC_URL}>
      {/* <Route path='/' element={<Splash />} /> */}
      <Route path={process.env.PUBLIC_URL} element={<Splash />} />
      <Route path='/welcome' element={<Welcome />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup'>
        <Route index element={<SignUp />} />
        <Route path='profile' element={<ProfileSetting />} />
        <Route path='signupsuccess' element={<SignUpSuccess />} />
      </Route>
      <Route path='/home' element={<Home />} />
      <Route path='/search' element={<Search />} />
      <Route path='/chat' element={<ChatList />} />
      <Route path='/chatroom/:accountname' element={<ChatRoom />} />
      <Route path='/error' element={<ErrorPage />} />
      <Route path='/makefeed' element={<MakeFeed />} />
      <Route path='/detailfeed' element={<DetailFeed />} />
      <Route path='/myprofile'>
        <Route index element={<Profile type='my' />} />
        <Route path='edit' element={<ProfileEdit />} />
      </Route>
      <Route path='/profile/:accountname'>
        <Route index element={<Profile type='your' />} />
      </Route>
      <Route
        path='/followerlist'
        element={<FollowerList type='followers' followType='followerList' />}
      />
      <Route
        path='/followinglist'
        element={<FollowerList type='followings' followType='followingList' />}
      />
      <Route path='/placelist' element={<PlaceList />} />
      <Route path='/makeplace' element={<MakePlace />} />
      <Route path='/map' element={<Map />} />
    </Routes>
  );
}
