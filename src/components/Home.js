// React imports
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// firebase imports
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  limit,
} from "firebase/firestore";

// Mui component imports
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

// custom component imports
import GuidePreview from "./GuidePreview";
import SearchPreview from "./SearchPreview";
import logo from "../data/logo.svg";

export const Home = () => {
  const navigate = useNavigate();

  // getting data
  const [latestGuides, setLatestGuides] = useState([]);
  const [latestGuideIds, setLatestGuideIds] = useState([]);

  // search states
  const [searchTerm, setSearchTerm] = useState("");
  const [searchGuides, setSearchGuides] = useState([]);
  const [searchGuideIds, setSearchGuideIds] = useState([]);

  useEffect(() => {
    getLatestFiveGuides();
  }, []);

  // data queries
  const getSearchGuide = () => {
    const getSearch = async () => {
      const guidesArr = [];
      const guideIds = [];
      const q = query(
        collection(db, "guides"),
        where("search", "array-contains", searchTerm),
        where("isPublished", "==", true),
        limit(10)
      );

      const docSnap = await getDocs(q);
      docSnap.forEach((doc) => {
        guidesArr.push(doc.data());
        guideIds.push(doc.id);
      });
      setSearchGuides(guidesArr);
      setSearchGuideIds(guideIds);
    };
    if (searchTerm === "allguides") {
      getAllGuides();
    } else {
      getSearch();
    }
  };
  const getAllGuides = async () => {
    const guidesArr = [];
    const guideIds = [];
    const q = query(collection(db, "guides"), where("isPublished", "==", true));
    const docSnap = await getDocs(q);
    docSnap.forEach((doc) => {
      guidesArr.push(doc.data());
      guideIds.push(doc.id);
    });
    setSearchGuides(guidesArr);
    setSearchGuideIds(guideIds);
  };
  const getLatestFiveGuides = () => {
    const getGuides = async () => {
      const guidesArr = [];
      const guideIds = [];
      const q = query(
        collection(db, "guides"),
        where("isPublished", "==", true),
        orderBy("createdAt", "desc"),
        limit(5)
      );
      const qS = await getDocs(q);
      qS.forEach((doc) => {
        guidesArr.push(doc.data());
        guideIds.push(doc.id);
      });
      setLatestGuides(guidesArr);
      setLatestGuideIds(guideIds);
    };
    getGuides();
  };

  // event handling
  const handleSearchClick = () => {
    getSearchGuide();
  };
  const handleAllGuideClick = () => {
    try {
      setSearchTerm("allguides");
      getAllGuides();
    } catch (error) {
      console.log(error);
    }
  };
  const handleNewGuideClick = () => {
    navigate(`/guide/add`);
  };

  const guideProps = { latestGuides, latestGuideIds };
  const searchProps = { searchGuides, searchGuideIds };

  /*** styles  start ***/
  const outerDiv = {
    mt: 3,
    display: "flex",
    flexDirection: "column",
  };
  const dotGuide = {
    textAlign: "center",
    color: "#cccccc",
    mb: 3,
  };
  const outerBox = {
    display: "flex",
    justifyContent: "center",
  };
  const outerCard = {
    borderRadius: 1,
    bgcolor: "#2f2f2f",
    width: "80%",
    border: 1.25,
    borderColor: "#353540",
  };
  const outerCardContent = {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  };
  const descriptionTypography = {
    width: "80%",
    color: "#cccccc",
    textAlign: "center",
  };
  // const popTagsBox = {
  //   mt: 1.5,
  //   display: "flex",
  //   justifyContent: "center",
  // };
  // const popTagsMapBox = {
  //   typography: "paragraph",
  //   padding: 1,
  //   mx: 1.5,
  //   borderRadius: 1,
  //   background: "#2f2f2f",
  //   color: "#cccccc",
  //   textAlign: "center",
  //   fontSize: "1.25em",
  //   "&:hover": { cursor: "pointer", borderColor: "#468ef3" },
  //   border: 1.25,
  //   borderColor: "#353540",
  // };
  const newGuideOuterBox = {
    mt: 4,
    display: "flex",
    justifyContent: "center",
  };
  const newGuideInnerBox = {
    textAlign: "center",
    borderRadius: 25,
    my: 1.5,
    width: "33%",
    py: 1.5,
    typography: "h4",
    border: 2,
    borderColor: "#2f2f2f",
    background: "transparent",
    color: "#eeeeee",
    "&:hover": { cursor: "pointer", borderColor: "#468ef3" },
  };
  const outerBoxLatestGuides = {
    ml: "auto",
    mr: "auto",
    width: "66%",
  };
  const latestGuidesTypography = {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    color: "#cccccc",
    my: 1.5,
    ml: "auto",
    mr: "auto",
  };
  const editTextField = {
    pt: 2,
    pb: 1,
    width: 400,
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
        borderRadius: 3,
        mt: 0.5,
        mb: 0.5,
      },
      "& adornedEnd": {
        pr: 0,
      },
    },
  };
  const searchBox = {
    pt: 3,
    pb: 3,
    display: "flex",
    flexDirection: "column",
  };
  const searchButtons = {
    ml: 3,
    mt: 1,
    py: 0.5,
    borderRadius: 10,
    color: "#468ef3",
    width: "130px",
    border: 2,
    borderColor: "#102040",
  };

  return (
    <Box id="home" style={outerDiv}>
      {/* <Typography variant="h3" sx={dotGuide}>
        {`<dotGuide />`}
      </Typography> */}
      <img
        src={logo}
        style={{
          marginTop: "1em",
          marginBottom: "3em",
          marginLeft: "auto",
          marginRight: "auto",
          width: "35%",
        }}
        className="App-logo"
        alt="dot guide logo"
      />
      <Box sx={outerBox}>
        <Card sx={outerCard}>
          <CardContent sx={outerCardContent}>
            <Typography sx={descriptionTypography}>
              Welcome! dotGuide is a developer tool for standardizing code
              structure, storing reference code, and creating educational guides
              in an easy-to-follow format. Whether you are an organization
              looking to streamline your developer's best coding practices, or a
              new developer looking to learn, dotGuide has something for
              everyone! Feel free to poke around, or if you're ready, click the
              button below to get started creating your very own guide!
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box sx={newGuideOuterBox}>
        <Box sx={newGuideInnerBox} onClick={() => handleNewGuideClick()}>
          New Guide
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={searchBox}>
          <TextField
            sx={editTextField}
            size="small"
            placeholder="Search for Guides"
            variant="outlined"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Button onClick={handleAllGuideClick} sx={searchButtons}>
              ALL GUIDES
            </Button>
            <Button onClick={handleSearchClick} sx={searchButtons}>
              SEARCH
            </Button>
          </Box>
        </Box>
      </Box>
      <Box>
        {searchGuides.length ? (
          <Box>
            <Typography variant="h6" sx={latestGuidesTypography}>
              {searchTerm === "allguides"
                ? "All Guides"
                : `Guides Containing: ${searchTerm}`}
            </Typography>
            <Box sx={outerBoxLatestGuides}>
              {searchGuides.length ? (
                <SearchPreview props={searchProps} />
              ) : (
                <GuidePreview props={guideProps} />
              )}
            </Box>
          </Box>
        ) : (
          <Box>
            <Typography variant="h6" sx={latestGuidesTypography}>
              Latest Guides
            </Typography>
            <Box sx={outerBoxLatestGuides}>
              {latestGuides.length ? <GuidePreview props={guideProps} /> : null}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;
