import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

const trans = (x, y, s) =>
  `perspective(300px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

export default function App() {
  const [coverImgSrc, setCoverImgSrc] = React.useState(
    "https://www.wolflair.com/wp-content/uploads/2017/01/placeholder.jpg"
  );

  const calc = (x, y) => [
    -(y - window.innerHeight / 2) / 20,
    (x - window.innerWidth / (open ? 1.6 : 2)) / 20,
    1,
  ];

  const [cardProps, setCardProps] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 1, tension: 170, friction: 30 },
  }));

  const [songName, setSongName] = React.useState("");
  const [artist, setArtist] = React.useState("");

  const [open, setOpen] = React.useState(true);

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

    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("upload_preset", "ml_default");

    fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
  };

  return (
    <div style={{ display: "flex" }}>
      <CustomizationDrawer open={open}>
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
            style={{ width: "100px", height: "130px", objectFit: "cover" }}
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
      </CustomizationDrawer>

      <DrawerHandleButton open={open} onClick={() => setOpen(!open)}>
        {open ? (
          <img height="20" src="imgs/arrow-left.png" alt="arrow-left" />
        ) : (
          <img height="20" src="imgs/arrow-right.png" alt="arrow-right" />
        )}
      </DrawerHandleButton>

      <Preview ref={flashpoint} open={open}>
        <animated.div
          className="card"
          onMouseMove={({ clientX: x, clientY: y }) =>
            setCardProps({ xys: calc(x, y) })
          }
          onMouseLeave={() => setCardProps({ xys: [0, 0, 1] })}
          style={{ transform: cardProps.xys.interpolate(trans) }}
        >
          <AlbumCover src={coverImgSrc} alt="album-cover" />
          <img
            style={{ width: "100%", marginTop: "10px" }}
            src="imgs/spotifylogoandqr.png"
            alt="spotify-logo-qr"
          />

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <SongTitle>{songName}</SongTitle>

            <img className="like-icon" src="imgs/like.png" alt="like" />
          </div>
          <div className="artist">{artist}</div>
          <img
            style={{ width: "100%", marginTop: "10px" }}
            src="imgs/playerbar.png"
            alt="player-bar"
          />
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <PlayerButtons
              className="play-icon"
              src="imgs/playerbuttons.png"
              alt="player-buttons"
            />
          </div>
        </animated.div>
      </Preview>
      <a
        href="https://www.instagram.com/flashpointv/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "absolute",
            top: "10px",
            right: "20px",
            fontWeight: "bold",
            fontSize: "2em",
            color: "white",
          }}
        >
          <img height="40" src="imgs/ig-logo.png" alt="ig-logo" />
          Flashpoint
        </div>
      </a>
      <Footer>
        Made with{" "}
        <span role="img" aria-label="coffee">
          ☕
        </span>{" "}
        by -
        <Link
          href="https://www.instagram.com/gianb__/"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          Giancarlo Brusca
        </Link>{" "}
        -{" "}
        <span role="img" aria-label="me">
          🤵🏽
        </span>
      </Footer>
    </div>
  );
}

// Flying Button
const DrawerHandleButton = styled.button`
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: ${(props) => (props.open ? "400px" : 0)};
  transition: left ease-out 0.5s, box-shadow ease-out 0.2s;

  display: flex;
  justify-content: center;
  align-items: center;

  color: white;
  font-size: 1.1em;
  font-weight: bold;
  padding: 5px;
  border: none;
  border-radius: 0 5px 5px 0;
  background-color: transparent;
  z-index: 1;

  &:hover {
    box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: 0;
  }
`;

// Left Drawer
const CustomizationDrawer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: ${(props) => (props.open ? 0 : "-400px")};
  gap: 20px;
  width: 400px;
  height: 100vh;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 1);
  z-index: 1;
  overflow: auto;
  background-color: white;
  transition: left ease-out 0.5s;
`;

// Preview
const Preview = styled.div`
  position: absolute;
  width: ${(props) => (props.open ? `calc(100vw - 400px)` : `100vw`)};
  height: 100vh;

  left: ${(props) => (props.open ? "400px" : 0)};

  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle, #de9d63 0%, #a4663d 100%);
  transition: left ease-out 0.5s, width ease-out 0.5s;
`;

// const AlbumCover = styled.div`
//   width: 230px;
//   height: 1500px;
//   background-image: url(${(props) => props.imgUrl});
//   background-position: center center;
//   background-size: cover;
// `;

const AlbumCover = styled.img`
  width: 230px;
  height: 1500px;
  object-fit: cover;
`;

const SongTitle = styled.div`
  color: white;
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 5px;
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
  transition: box-shadow ease-out 0.2s;

  &:hover {
    box-shadow: inset 0 0 20px #de9d63;
  }
`;

const PlayerButtons = styled.img`
  width: 100%;
`;
