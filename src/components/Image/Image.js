import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import './Image.scss';
import ExpandedImage from '../ExpandedImage/ExpandedImage';

class Image extends React.Component {
  static propTypes = {
    dto: PropTypes.object,
    galleryWidth: PropTypes.number,
    removeImg: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.calcImageSize = this.calcImageSize.bind(this);
    this.state = {
      size: 200,
      currentDegrees: 0,
      ModalIsOpen: false,
      blendColor: 'transparent',
      expandedSize: 550,
      shape: '0',
      border: 'none'
    };
  }

  calcImageSize() {
    let { galleryWidth } = this.props;
    const targetSize = 200;
    const imagesPerRow = Math.round(galleryWidth / targetSize);
    const size = galleryWidth / imagesPerRow;
    const expandedSmallScreen = galleryWidth * 0.8;
    const expandedSize = galleryWidth > 600 ? 550 : expandedSmallScreen;
    this.setState({
      size,
      expandedSize
    });
  }

  componentDidMount() {
    this.calcImageSize();
  }

  handleRotate() {
    let newDegrees = this.state.currentDegrees + 90;
    if (newDegrees >= 360) {
      newDegrees -= newDegrees;
    }
    this.setState({
      currentDegrees: newDegrees
    });
  }

  handleExpand() {
    this.setState({
      ModalIsOpen: true
    });
  }

  closeModal() {
    this.setState({
      ModalIsOpen: false
    });
  }

  handleDelete() {
    this.props.removeImg(this.props.dto);
  }

  blendBackground() {
    let current = this.state.blendColor;

    if (current === 'transparent') {
      this.setState({
        blendColor: 'red'
      });
    } else if (current === 'red') {
      this.setState({
        blendColor: 'blue'
      });
    } else if (current === 'blue') {
      this.setState({
        blendColor: 'green'
      });
    } else if (current === 'green') {
      this.setState({
        blendColor: 'orange'
      });
    } else if (current === 'orange') {
      this.setState({
        blendColor: 'transparent'
      });
    }
  }

  changeShape() {
    if (this.state.shape === '0') {
      this.setState({
        shape: '100%'
      });
    } else {
      this.setState({
        shape: '0'
      });
    }
  }

  addBorder() {
      if (this.state.border === 'none') {
        this.setState({
          border: '5px solid black'
        });
      } else {
        this.setState({
          border: 'none'
        });
      }
  }

  urlFromDto(dto) {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  }

  render() {
    return (
      <div
        className="image-root"
        style={{
          transform: `rotate(${this.state.currentDegrees}deg)`,
          backgroundImage: `url(${this.urlFromDto(this.props.dto)})`,
          width: this.state.size + 'px',
          height: this.state.size + 'px',
          backgroundColor: this.state.blendColor,
          backgroundBlendMode: 'screen',
          borderRadius: this.state.shape,
          border: this.state.border
        }}
      >
        <div
          style={{ transform: `rotate(${360 - this.state.currentDegrees}deg)` }}
        >
          <FontAwesome
            onClick={() => this.handleRotate()}
            className="image-icon"
            name="sync-alt"
            title="rotate"
          />
          <FontAwesome
            onClick={() => this.handleDelete()}
            className="image-icon"
            name="trash-alt"
            title="delete"
          />
          <FontAwesome
            onClick={() => this.handleExpand()}
            className="image-icon"
            name="expand"
            title="expand"
          />
        </div>
        <ExpandedImage
          ModalIsOpen={this.state.ModalIsOpen}
          closeModal={() => this.closeModal()}
          expandedSize={this.state.expandedSize}
          shape={this.state.shape}
          currentDegrees={this.state.currentDegrees}
          urlFromDto={(dto) => this.urlFromDto(dto)}
          dto={this.props.dto}
          blendColor={this.state.blendColor}
          handleRotate={() => this.handleRotate()}
          handleDelete={() => this.handleDelete()}
          blendBackground={() => this.blendBackground()}
          changeShape={() => this.changeShape()}
          border={this.state.border}
          addBorder={() => this.addBorder() }
        ></ExpandedImage>
      </div>
    );
  }
}

export default Image;
