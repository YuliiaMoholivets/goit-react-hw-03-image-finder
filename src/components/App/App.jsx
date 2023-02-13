import { Component } from 'react';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import { Container, ErrorMessage } from './App.styled';
import fetchImages from '../../servises/images-api';

export default class App extends Component {
  state = {
    images: [],
    searchWord: '',
    pageNumber: 1,
    totalImages: 0,
    status: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const { pageNumber, searchWord } = this.state;
    const prevWord = prevState.searchWord;
    const nextWord = searchWord;
    const prevPage = prevState.pageNumber;
    const nextPage = pageNumber;

    if (prevWord !== nextWord || prevPage !== nextPage) {
      this.setState({ status: 'LOADING' });
      const newImage = fetchImages(nextWord, pageNumber);
      newImage.then(({ totalImages, images }) => {
        if (totalImages === 0) {
          this.setState({ status: 'ERROR' });
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...newData],
            status: 'OK',
            totalImages,
          }))
        
            .catch(() => {
              this.setState({ status: 'ERROR' });
       
            });
        }
      },
    

   
        formSubmitHandler = ({ keyWord }) => {
          const { searchWord } = this.state;
          if (searchWord !== keyWord) {
            this.setState({ searchWord: keyWord, pageNumber: 1, images: [] });
          }
        },

        handleIncrement = () => {
          this.setState(prevState => ({ pageNumber: prevState.pageNumber + 1 }));
        },

 
        render(){
          const { status, searchWord, images, pageNumber, totalImages } = this.state;
          const lastPage = this.lastPageDef();

          return(
            <Container>
      <Searchbar onSubmit={this.formSubmitHandler} />
              { images.length > 0 && <ImageGallery data={images} onClose={this.toggleModal} /> }
              { status === 'ERROR' && (
          <ErrorMessage>No images for keyword "{searchWord}"</ErrorMessage>
        )}
    { status === 'LOADING' && <Loader /> }
    {
      status === 'OK' && images.length > totalImages && (
        <Button
          text={'Load more'}
          type="button"
          onClick={this.handleIncrement}
        />
      )
    }
    {
      pageNumber === lastPage && totalImages > 0 && (
        <ErrorMessage>You've reached the end of search results.</ErrorMessage>
      )
    }
            </Container >
          )
  };
}

