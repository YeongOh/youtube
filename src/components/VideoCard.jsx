import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'timeago.js';

export default function VideoCard({ video, type }) {
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;
  const navigate = useNavigate();
  const videoId = video.id;
  const timeAgo = format(publishedAt, 'en_US');
  const isList = type === 'list';

  // { path: '/videos/watch/:videoId', element: <VideoDetail /> },

  const handleClickForVideo = () => {
    navigate(`/videos/watch/${videoId}`, { state: { video } });
  };

  return (
    <li className={isList ? 'flex gap-1 m-2' : ''}>
      <img
        onClick={handleClickForVideo}
        className={isList ? 'w-60 mr-2' : 'w-full'}
        src={thumbnails.medium.url}
        alt={title}
      />
      <div>
        <p
          onClick={handleClickForVideo}
          className='font-semibold my-2 line-clamp-2'
        >
          {title}
        </p>
        <p className='text-sm opacity-80'>{channelTitle}</p>
        <p className='text-sm opacity-80'>{timeAgo}</p>
      </div>
    </li>
  );
}
