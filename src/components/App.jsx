import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PixabayApi from './PixabayApi';

import Modal from './Modal';
import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import Loader from "./Loader";
import Button from "./Button";
import { Container } from "./App.styled";



export class App extends Component  {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    showModal: false,
    currentImageUrl: null,
    currentImageDescription: null,
    showLoadMoreBtn: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.query !== prevState.query ||
      this.state.page !== prevState.page
    ) {
       this.setState({ isLoading: true });
       this.fetchApi(this.state.query, this.state.page);
    }
  }

  async fetchApi({ query }, page) {
  try {
    const api = await PixabayApi(query, page);
    const total = api.totalHits;
    const images = api.hits;
    const pictures = total - 12 * this.state.page;
    if (query.trim() === '') {
      return toast.error(`Nothing found`, {
        autoClose: 1000,
      });
    }
    if (images.length === 0) {
      this.setState({ showLoadMoreBtn: false });
      toast.error(`Nothing found`, {
        autoClose: 1000,
      });
      return;
    } else {
      this.setState(prevState => ({
        images: [...prevState.images, ...images],
      }));
    }
    if (images.length > 0 && this.state.page === 1) {
      toast.info(`Found ${api.total} images`, {
        autoClose: 1500,
      });
    }
    pictures > 0
      ? this.setState({ showLoadMoreBtn: true })
      : this.setState({ showLoadMoreBtn: false });
  } catch (error) {
    toast.error('Enter your request', { autoClose: 1500 });
  } finally {
    this.setState({ isLoading: false });
  }
};
  
  onSubmit = FormData => {
  const { query } = FormData;
  this.setState({ query: query, page: 1, images: [] });
  };
  
   toggleModal = (currentImageUrl, currentImageDescription) => {
   this.setState(({ showModal }) => ({
     showModal: !showModal,
     currentImageUrl: currentImageUrl,
     currentImageDescription: currentImageDescription,
   }));
  };

  onNextFetch = () => {
  this.setState(({ page }) => ({ page: page + 1 }));
  
};
  
 getSearchRequest = query => {
   this.setState({ query, page: 1, images: [] });
 }; 

  render() {
    const { showModal } = this.state; 
  return (
    <Container>
      <ToastContainer />
      {showModal && (
        <Modal
          onClose={this.toggleModal}
          src={this.state.currentImageUrl}
          alt={this.state.currentImageDescription}
        />
      )}
      <Searchbar onSubmit={this.getSearchRequest} />
      
      {this.state.images && (
        <ImageGallery
        images={this.state.images}
        openModal={this.toggleModal}
        />
      )}

      {this.state.isLoading && <Loader />}
      {this.state.showLoadMoreBtn && <Button loadMore={this.onNextFetch} />}
    </Container>
  );
}
}
