import React from "react";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import "./Image.scss";

class Image extends React.Component {
  static propTypes = {
    dto: PropTypes.object,
    galleryWidth: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.calcImageSize = this.calcImageSize.bind(this);
    this.state = {
      size: 200,
      currentDegrees: 0,
      btnDegrees: 360
    };
    this.rotateImg = this.rotateImg.bind(this);
  }

  calcImageSize() {
    const { galleryWidth } = this.props;
    const targetSize = 200;
    const imagesPerRow = Math.round(galleryWidth / targetSize);
    const size = galleryWidth / imagesPerRow;
    this.setState({
      size,
    });
  }

  handleRotate() {
    let newDegrees = this.state.currentDegrees + 90;
    if (newDegrees >= 360) {
      newDegrees -= newDegrees;
    }
    this.setState({
      currentDegrees: newDegrees,
      btnDegrees: 360 - newDegrees,
    });
  }

  handleDelete() {
    console.log("rotate clicked");
  }

  handleExpand() {
    console.log("rotate clicked");
  }

  componentDidMount() {
    this.calcImageSize();
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
          width: this.state.size + "px",
          height: this.state.size + "px",
        }}
      >
        <div style={{ transform: `rotate(${this.state.btnDegrees}deg)` }}>
          <FontAwesome
            onClick={() => this.handleRotate()}
            className="image-icon"
            name="sync-alt"
            title="rotate"
          />
          <FontAwesome className="image-icon" name="trash-alt" title="delete" />
          <FontAwesome className="image-icon" name="expand" title="expand" />
        </div>
      </div>
    );
  }
}

export default Image;
