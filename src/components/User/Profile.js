import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase";
import {
  collection,
  getDocs,
  where,
  query,
  getDoc,
  doc,
} from "firebase/firestore";
import { TextField } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import EditIcon from '@mui/icons-material/Edit';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import UserGuidePreview from "./UserGuidePreviews";

const Profile = () => {
  // data fetching
  const [user, setUser] = useState({});
  const [uid, setUid] = useState("");
  const [profile, setProfile] = useState({});
  //guides and favorites lists
  const [guides, setGuides] = useState([]);
  const [favorites, setFavorites] = useState([]);
  //toggles for opening and closing guides and favorites lists
  const [guidesOpen, setGuidesOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const navigate = useNavigate();

  // Get User from firebase Auth
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      }
    });
    getUser();
    getGuides();
    getProfile();
  }, [uid]);

  useEffect(() => {
    getFavorites();
  }, [profile]);

  const getUser = () => {
    const myDoc = async () => {
      const docRef = collection(db, "users");
      const q = query(docRef, where("uid", "==", `${uid}`));
      const docSnap = await getDocs(q);
      docSnap.forEach((doc) => {
        setUser(doc.data());
      });
    };
    myDoc();
  };
  const getGuides = () => {
    const myGuides = async () => {
      const guidesArr = [];
      const guideRef = collection(db, "guides");
      const q = query(guideRef, where("userId", "==", uid));
      const qS = await getDocs(q);
      qS.forEach((doc) => {
        guidesArr.push(doc.data());
      });
      setGuides(guidesArr);
    };
    myGuides();
  };

  const getFavorites = () => {
    const myFavorites = async () => {
      const favoritesArr = [];
      let favorites = profile.favorites;
      favorites.forEach(async (favorite) => {
        const guideRef = doc(db, "guides", favorite);
        const gS = await getDoc(guideRef);
        return gS.exists() ? favoritesArr.push(gS.data()) : null;
      });
      setFavorites(favoritesArr);
    };
    myFavorites();
  };

  const getProfile = () => {
    const myProfile = async () => {
      const profileRef = collection(db, "profiles");
      const q = query(profileRef, where("userId", "==", uid));
      const qS = await getDocs(q);
      qS.forEach((doc) => {
        setProfile(doc.data());
      });
    };
    myProfile();
  };
  const guideProps = { guides: guides, list: profile.guides };
  const favProps = { guides: favorites, list: profile.favorites };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        width: "50%",
        ml: "auto",
        mr: "auto",
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          text: "center",
          background: "#2f2f2f",
          p: 1,
          pl: 2,
          pr: 2,
          mr: "auto",
          ml: "auto",
          mb: 5,
          width: "50%",
          minHeight: "10vh",
          textOverflow: "ellipsis",
          border: 1.25,
          borderColor: "#353540",
          flexGrow: 1,
        }}
      >
        <Typography
          variant="h3"
          sx={{ pt: 2, pb: 3, color: "white", textAlign: "center" }}
        >
          Profile
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Typography sx={{ mt: 0.75, mb: 0.5, pr: 2, color: "white" }}>
            Username:
          </Typography>
          <TextField
            sx={{
              pb: 1,
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
            }}
            disabled="true"
            size="small"
            variant="outlined"
            label={user.username}
          />
        </Box>

        <Box sx={{ display: "flex" }}>
          <Typography sx={{ mt: 1, mb: 0.75, pr: 6.25, color: "white" }}>
            Email:
          </Typography>
          <TextField
            sx={{
              pb: 1,
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
            }}
            disabled="true"
            size="small"
            variant="outlined"
            label={user.email}
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={() => navigate("/edit-profile")}>
          <EditIcon sx={{ color: "#468ef3" }}/>
        </Button>
        </Box>
      </Card>
      <Box
        sx={{
          display: "flex",
          flowDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ mr: 0.5, width: "100%" }}>
          <Typography
            variant="h3"
            sx={{ color: "white", ml: 2, my: 1, fontSize: "2em" }}
          >
            My Guides
          </Typography>
          {!guidesOpen ? (
            <>
              <Button
                sx={{ borderRadius: 1 }}
                variant="contained"
                onClick={() => {
                  setGuidesOpen(!guidesOpen);
                }}
              >
                See Guides
              </Button>
            </>
          ) : (
            <>
              <Button
                sx={{ borderRadius: 1 }}
                variant="contained"
                onClick={() => {
                  setGuidesOpen(!guidesOpen);
                }}
              >
                Close Guides
              </Button>
              <UserGuidePreview props={guideProps} />
            </>
          )}
        </Box>
        <Box sx={{ ml: 0.5, width: "100%" }}>
          <Typography
            variant="h3"
            sx={{ color: "white", ml: 2, my: 1, fontSize: "2em" }}
          >
            My Favorites
          </Typography>
          {!favoritesOpen ? (
            <>
              {profile.favorites ? (
                <Button
                  sx={{ borderRadius: 1 }}
                  variant="contained"
                  onClick={() => {
                    setFavoritesOpen(!favoritesOpen);
                  }}
                >
                  See Favorites
                </Button>
              ) : null}
            </>
          ) : (
            <>
              <Button
                sx={{ borderRadius: 1 }}
                variant="contained"
                onClick={() => {
                  setFavoritesOpen(!favoritesOpen);
                }}
              >
                Close Favorites
              </Button>
              <UserGuidePreview props={favProps} />
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
