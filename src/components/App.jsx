import { useState } from 'react';
import s from './App';
import Modal from 'components/Modal';
import Searchbar from 'components/Searchbar';
import ImageGallery from './ImageGallery/imageGallery';
import Button from './Button/Button';

import { ReactComponent as SearchIcon } from '../Images/search.svg';
import { ToastContainer } from 'react-toastify';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [activeImgURL, setActiveImgURL] = useState('');
  const [activeImgAlt, setActiveImgAlt] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const onSearchButton = searchQuery => {
    if (searchQuery.trim() === '') {
      toast.error('Enter what you want to find ', {
        position: 'top-right',
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
      return;
    }
    setSearchQuery(searchQuery);
    setPage(1);
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  const onGalleryItemClick = (activeImgURL, activeImgAlt) => {
    setActiveImgURL(activeImgURL);
    setActiveImgAlt(activeImgAlt);
    toggleModal();
  };

  const onLoadMore = event => {
    setPage(page + 1);
  };

  return (
    <div className={s.App}>
      <Searchbar aria-label="Search" onSubmitClick={onSearchButton}>
        <SearchIcon width="20" height="20" />
      </Searchbar>

      <ImageGallery
        searchQuery={searchQuery}
        page={page}
        onGalleryItemClick={onGalleryItemClick}
      >
        <Button onLoadMore={onLoadMore} />
      </ImageGallery>

      {showModal && (
        <Modal
          onClose={toggleModal}
          activeImgURL={activeImgURL}
          activeImgAlt={activeImgAlt}
        ></Modal>
      )}
      <ToastContainer
        closeButton={false}
        position="bottom-right"
        autoClose={3000}
      />
    </div>
  );
}