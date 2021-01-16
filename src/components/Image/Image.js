import React from "react";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import Modal from "react-modal";
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
      ModalIsOpen: false,
      expandedSize: 550
    };
  }

  calcImageSize() {
    const { galleryWidth } = this.props;
    const targetSize = 200;
    const imagesPerRow = Math.round(galleryWidth / targetSize);
    const size = galleryWidth / imagesPerRow;
    const expandedSmallScreen = galleryWidth * 0.8
    const expandedSize = ( galleryWidth > 600 )? 550 : expandedSmallScreen;
    this.setState({
      size,
      expandedSize
    });
  }

  handleRotate() {
    let newDegrees = this.state.currentDegrees + 90;
    if (newDegrees >= 360) {
      newDegrees -= newDegrees;
    }
    this.setState({
      currentDegrees: newDegrees,
    });
  }

  handleExpand() {
    this.setState({
      ModalIsOpen: true,
    });
  }

  closeModal() {
    this.setState({
      ModalIsOpen: false,
    });
  }

  handleDelete() {
    console.log("delete clicked");
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
        <Modal
          isOpen={this.state.ModalIsOpen}
          onRequestClose={() => this.closeModal()}
          style={{
            content: {
              padding: 0,
              margin: "auto",
              width: this.state.expandedSize + "px",
              height: this.state.expandedSize + "px",
            },
          }}
        >
          <div
            className="image-root"
            overlayClassName="expanded"
            style={{
              transform: `rotate(${this.state.currentDegrees}deg)`,
              backgroundImage: `url(${this.urlFromDto(this.props.dto)})`,
              width: "100%",
              height: "100%",
            }}
          >
            <div
              style={{
                transform: `rotate(${360 - this.state.currentDegrees}deg)`,
              }}
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
                onClick={() => this.closeModal()}
                className="image-icon"
                name="compress"
                title="contract"
              />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Image;
