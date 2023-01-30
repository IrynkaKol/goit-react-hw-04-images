import { useState, useEffect } from 'react';
import { AppStyled } from './App.styled';
import Notiflix from 'notiflix';
import { Searchbar } from '../Searchbar/Searchbar';
import { fetchImages } from 'service/fetchImages';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';

export function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalImgs, setTotalImgs] = useState(0);
  //const [error, setError] = useState(null);

  useEffect(() => {
    if (
      (prevState => prevState.query !== query) ||
      (prevState => prevState.page !== page)
    ) {
      fetchImages(query, page)
        .then(resp => {
          setImages(prevState =>
            prevState.images.page === 1 ? [...resp.hits] : [...images, ...resp.hits]
          );
          setTotalImgs(resp.totalHits);
        })
        .catch(error => {
          console.log(error);
          return Notiflix.Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.'
            
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [query, page, images]);

 

  const handleSubmit = query => {
    setQuery(query);
    setIsLoading(true);
    setPage(1);
  };
  const handleLoadMore = () => {
    setIsLoading(prevState => prevState(true));
    setPage(prevState => prevState.page + 1);
  };
  const renderButtonOrLoader = () => {
    return isLoading ? (
      <Loader />
    ) : (
      images.length !== 0 && images.length < totalImgs && (
        <Button onClick={handleLoadMore} />
      )
    );
  };

  return (
    <AppStyled>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} />
      {renderButtonOrLoader()}
    </AppStyled>
  );
}
/*
export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    totalImgs: 0,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      fetchImages(query, page)
        .then(resp => {
          this.setState(({ images }) => ({
            images: page === 1 ? [...resp.hits] : [...images, ...resp.hits],
            totalImgs: resp.totalHits,
          }));
        })
        .catch(error => {
          console.log(error);
          return Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1, isLoading: true }));
  };

  handleSubmit = query => {
    this.setState({ query, isLoading: true, page: 1 });
    
    
  };


  
  renderButtonOrLoader = () => {
    return this.state.isLoading ? (
      <Loader />
    ) : (
      this.state.images.length !== 0 &&
        this.state.images.length < this.state.totalImgs && (
          <Button onClick={this.handleLoadMore} />
        )
    );
  };

  render() {
    return (
      <AppStyled>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={this.state.images} />
        {this.renderButtonOrLoader()}
      </AppStyled>
    );
  }
}*/
