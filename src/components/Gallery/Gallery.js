import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Image from '../Image';
import './Gallery.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import { v4 as uuidv4 } from 'uuid';

class Gallery extends React.Component {
  static propTypes = {
    tag: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      images: [],
      galleryWidth: this.getGalleryWidth(),
      currentPage: 1,
      hasMore: true
    };
  }

  getGalleryWidth() {
    try {
      return document.body.clientWidth;
    } catch (e) {
      return 1000;
    }
  }
  getImages(tag) {
    const getImagesUrl = `services/rest/?method=flickr.photos.search&api_key=522c1f9009ca3609bcbaf08545f067ad&tags=${tag}&tag_mode=any&&page=${this.state.currentPage}&per_page=100&format=json&nojsoncallback=1`;
    const baseUrl = 'https://api.flickr.com/';
    axios({
      url: getImagesUrl,
      baseURL: baseUrl,
      method: 'GET'
    })
      .then((res) => res.data)
      .then((res) => {
        if (
          res &&
          res.photos &&
          res.photos.photo &&
          res.photos.photo.length > 0
        ) {
          let hasMore = true
          if (res.photos.page === res.photos.pages) {
            hasMore = false;
          }
          this.setState( state => {return { hasMore, images: [ ...state.images, ...res.photos.photo] }});
          console.log('res: ', res);
        }
      });
  }

  componentDidMount() {
    this.getImages(this.props.tag);
    this.setState({
      galleryWidth: document.body.clientWidth
    });
  }

  componentWillReceiveProps(props) {
this.setState({ currentPage: 1, images: [], hasMore: true }, () => {
  this.getImages(props.tag);
});
  }

  removeImg(dto) {
    const { images } = this.state;
    const index = images.indexOf(dto);
    images.splice(index, 1);
    this.setState({
      images
    });
  }

  getNext() {
    this.setState(
      (state) => {return {currentPage: state.currentPage + 1}},
      () => {
      this.getImages(this.props.tag)
    }
    );
  }

  render() {
    return (
      <InfiniteScroll
        dataLength={this.state.images.length} //This is important field to render the next data
        next={() => this.getNext(this.props.tag)}
        hasMore={this.state.hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <h2 style={{ textAlign: 'center' }}>
            <b>Yay! You have seen all the pictures</b>
          </h2>
        }
      >
        <div className="gallery-root">
          {this.state.images.map((dto) => {
            return (
              <Image
                key={uuidv4()}
                dto={dto}
                galleryWidth={this.state.galleryWidth}
                removeImg={(id) => this.removeImg(id)}
              />
            );
          })}
        </div>
      </InfiniteScroll>
    );
  }
}

export default Gallery;
