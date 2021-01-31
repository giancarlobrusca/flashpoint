import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

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
  const [picture, setPicture] = React.useState();

  const settingSongName = (event) => {
    setSongName(event.target.value);
  };

  const settingArtist = (event) => {
    setArtist(event.target.value);
  };

  const handleCoverPictureChange = (e) => {
    setCoverImgSrc(e.target.files[0].name);
  };

  return (
    <div style={{ display: "flex" }}>
      <CustomizationDrawer>
        <Title>¡Personalizá tu Flashpoint!</Title>
        <Input
          name="songname"
          type="text"
          value={songName}
          onChange={settingSongName}
          placeholder="Nombre de la canción"
        />
        <Input
          name="songname"
          type="text"
          value={artist}
          onChange={settingArtist}
          placeholder="Artista"
        />
        <ImgInput
          for="cover-upload"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img
            style={{ width: "100px", height: "100px" }}
            src={coverImgSrc}
            alt="imgIcon"
          />
          Elegí tu imagen
        </ImgInput>
        <input
          type="file"
          id="cover-upload"
          onChange={handleCoverPictureChange}
          style={{ display: "none" }}
        />
      </CustomizationDrawer>
      <Preview>
        <animated.div
          className="card"
          onMouseMove={({ clientX: x, clientY: y }) =>
            setCardProps({ xys: calc(x, y) })
          }
          onMouseLeave={() => setCardProps({ xys: [0, 0, 1] })}
          style={{ transform: cardProps.xys.interpolate(trans) }}
        >
          <AlbumCover src={coverImgSrc} alt="albumcover" />
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
            <SpotifyQR
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
            <SongTitle>{songName}</SongTitle>

            <LikeIcon
              src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/259/white-heart_1f90d.png"
              alt="like"
            />
          </div>
          <Artist>{artist}</Artist>
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PlayIcon
              src="https://icon-library.com/images/play-icon-png-transparent/play-icon-png-transparent-4.jpg"
              alt="play"
            />
          </div>
        </animated.div>
      </Preview>
    </div>
  );
}

const CustomizationDrawer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  top: 0;
  left: 0;
  gap: 20px;
  width: 400px;
  height: 100vh;
  background: linear-gradient(
    90deg,
    rgba(222, 157, 99, 1) 0%,
    rgba(164, 102, 61, 1) 100%
  );
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 1);
  z-index: 1;
`;

const Title = styled.h1`
  color: white;
  font-size: 1.3em;
  text-align: center;
`;

const Input = styled.input`
  border-radius: 10px;
  padding: 10px;
  border: none;
  transition: box-shadow ease-out 0.2s;

  &:focus {
    outline: 0;
    box-shadow: 0 0 5px white;
  }
`;

const ImgInput = styled.label`
  cursor: pointer;
  color: #888;
  font-size: 0.9em;
  border-radius: 10px;
  padding: 10px;
  border: none;
  background-color: white;

  &:hover {
    box-shadow: 0 0 5px white;
  }
`;

const Preview = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle, #de9d63 0%, #a4663d 100%);
`;

const AlbumCover = styled.img`
  width: 230px;
`;

const SpotifyQR = styled.img`
  width: 100%;
`;

const SongTitle = styled.div`
  color: white;
  font-weight: bold;
  font-size: 1.2em;
`;

const LikeIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const Artist = styled.div`
  color: white;
  font-weight: bold;
  align-self: flex-start;
  font-size: 0.8em;
`;

const PlayIcon = styled.img`
  width: 50px;
  height: 50px;
`;
