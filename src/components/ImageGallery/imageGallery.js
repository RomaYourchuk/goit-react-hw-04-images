import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import { fetchQuery } from '../API/API';
import ImageGalleryItem from 'components/ImageGalleryItem';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { ThreeDots } from 'react-loader-spinner';

const Status = {
  IDLE: 'idle',
  RESOLVED: 'resolved',
  PENDING: 'pending',
  REJECTED: 'rejected',
};

function ImageGallery({ searchQuery, page, onGalleryItemClick, children }) {
  const [data, setData] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  const [isNextPage, setIsNextPage] = useState(false);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    setStatus(Status.PENDING);
    fetchQuery(searchQuery, page)
      .then(searchedData => {
        const newData = searchedData.hits;
        const newTotalHits = searchedData.totalHits;

        if (newData.length === 0) {
          setStatus(Status.REJECTED);
          return Promise.reject(
            new Error(`Nothing found on the topic ${searchQuery}`)
          );
        }

        setData(prevData => [...prevData, ...newData]);
        setTotalHits(newTotalHits);
        setStatus(Status.RESOLVED);
      })

      .catch(error => setError(error));
  }, [page, searchQuery]);

  useEffect(() => {
    setData([]);
    return;
  }, [searchQuery]);

  useEffect(() => {
    const limit = 12;
    const totalPage = Math.ceil(totalHits / limit);

    if (totalPage > page) {
      setIsNextPage(true);
    } else {
      setIsNextPage(false);
    }
  }, [totalHits, page]);

  return (
    <>
      {status === Status.PENDING && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ThreeDots height="100" width="100" color="red" ariaLabel="loading" />
        </div>
      )}
      <ul className={s.ImageGallery}>
        {data.map(galleryItem => {
          return (
            <ImageGalleryItem
              galleryItem={galleryItem}
              onGalleryItemClick={onGalleryItemClick}
              key={galleryItem.id}
            />
          );
        })}
      </ul>

      {status === Status.RESOLVED && isNextPage && (
        <div className={s.ButtonContainer}>{children}</div>
      )}

      {status === Status.REJECTED && <h1>{error.message}</h1>}
    </>
  );
}

ImageGallery.prototype = {
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

export default ImageGallery;