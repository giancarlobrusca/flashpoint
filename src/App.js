import React from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
//import domtoimage from "dom-to-image";

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 1.6) / 20,
  1,
];

const trans = (x, y, s) =>
  `perspective(300px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

export default function App() {
  const [coverImgSrc, setCoverImgSrc] = React.useState(
    "https://www.wolflair.com/wp-content/uploads/2017/01/placeholder.jpg"
  );

  const [cardProps, setCardProps] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 1, tension: 170, friction: 30 },
  }));

  const [songName, setSongName] = React.useState("");
  const [artist, setArtist] = React.useState("");
  // const [picture, setPicture] = React.useState();
  const flashpoint = React.useRef();

  const settingSongName = (event) => {
    setSongName(event.target.value);
  };

  const settingArtist = (event) => {
    setArtist(event.target.value);
  };

  const handleCoverPictureChange = (e) => {
    const ImgURL = URL.createObjectURL(e.target.files[0]);
    setCoverImgSrc(ImgURL);
  };

  // const exportFlashpoint = () => {
  //   const node = flashpoint.current;

  //   domtoimage
  //     .toPng(node, { quality: 0.1 })
  //     .then((dataUrl) => {
  //       console.log(dataUrl);
  //       var img = new Image();
  //       img.src = dataUrl;
  //       document.getElementById("result").appendChild(img);
  //     })
  //     .catch(function (error) {
  //       console.error("oops, something went wrong!", error);
  //     });
  // };

  return (
    <div style={{ display: "flex" }}>
      <div className="customization-drawer">
        <h1 className="title">¡Personalizá tu Flashpoint!</h1>
        <input
          className="textfield"
          name="songname"
          type="text"
          value={songName}
          onChange={settingSongName}
          placeholder="Nombre de la canción"
        />
        <input
          className="textfield"
          name="songname"
          type="text"
          value={artist}
          onChange={settingArtist}
          placeholder="Artista"
        />
        <label
          className="img-input"
          htmlFor="cover-upload"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img
            style={{ width: "100px", height: "130px" }}
            src={coverImgSrc}
            alt="imgIcon"
          />
          Elegí tu imagen
        </label>
        <input
          type="file"
          id="cover-upload"
          onChange={handleCoverPictureChange}
          style={{ display: "none" }}
        />
        {/* <button onClick={exportFlashpoint}>Exportá</button> */}
        <div id="result"></div>
      </div>

      <div className="preview" ref={flashpoint}>
        <animated.div
          className="card"
          onMouseMove={({ clientX: x, clientY: y }) =>
            setCardProps({ xys: calc(x, y) })
          }
          onMouseLeave={() => setCardProps({ xys: [0, 0, 1] })}
          style={{ transform: cardProps.xys.interpolate(trans) }}
        >
          <AlbumCover imgUrl={coverImgSrc} />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              style={{ width: "20%" }}
              src="imgs/spotilogo.png"
              alt="SpotifyLogo"
            />
            <img
              style={{ width: "80%" }}
              src="imgs/spotifyqr.png"
              alt="spotiQR"
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="song-title">{songName}</div>

            <img
              className="like-icon"
              src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/259/white-heart_1f90d.png"
              alt="like"
            />
          </div>
          <div className="artist">{artist}</div>
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              className="play-icon"
              src="https://icon-library.com/images/play-icon-png-transparent/play-icon-png-transparent-4.jpg"
              alt="play"
            />
          </div>
        </animated.div>
      </div>
      <Footer>
        Made with ❤ by -
        <Link href="https://www.instagram.com/gianb__/"> Giancarlo Brusca</Link>
      </Footer>
    </div>
  );
}

const AlbumCover = styled.div`
  width: 230px;
  height: 1500px;
  background-image: url(${(props) => props.imgUrl});
  background-position: center center;
  background-size: cover;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  position: absolute;
  width: 30%;
  height: 40px;
  bottom: 0;
  right: 0;
  z-index: 1;
`;

const Link = styled.a`
  color: white;
  text-decoration: none;
  font-weight: bold;
  transition: color ease-out 0.2s;

  &:hover {
    color: violet;
  }
`;
