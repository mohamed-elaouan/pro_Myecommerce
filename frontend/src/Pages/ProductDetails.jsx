import {
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import DetailsThumb from "Component/DetailsThumb";
import { useGetOneproductsByNameQuery } from "Redux/Products";
import React, { useState } from "react";
import {  useParams } from "react-router-dom";
import "./Details.css";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Add, Remove, ShoppingCart } from "@mui/icons-material";
import { decreaseQte, increaseQte, AddToCart } from "Redux/CardSlice";

const ProductDetails = () => {
  const { SelectedProduct, SelectedProductID } = useSelector(
    // @ts-ignore
    (state) => state.cartShop
  );
  // @ts-ignore
  useSelector((state) => state.cartShop);
  const dispatch = useDispatch();
  const QteProd = (idQ) => {
    const QteR = SelectedProduct.find((item) => {
      return item.id === idQ;
    });
    return QteR.Qte;
  };
  let Id = useParams();
  const theme = useTheme();
  const { data, error, isLoading } = useGetOneproductsByNameQuery(Id.ProdId);

  const [index, setindex] = useState(0);
  const myRef = useRef(null);
  const handleTab = (index) => {
    setindex(index);
    const images = myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };

  if (data) {
    return (
      <div className="app">
        <div className="details">
          <div className="big-img">
            <img src={data.imageLink[index]} alt="" />
          </div>

          <div className="box">
            <div className="row">
              <h2 style={{ width: "fit-content" }}>{data.productName}</h2>
              <span style={{ width: "fit-content" }}>${data.price}</span>
            </div>
            {/* <Colors colors={item.colors} /> */}

            <p>{data.description}</p>

            <DetailsThumb
              images={data.imageLink}
              tab={handleTab}
              myRef={myRef}
            />
            {SelectedProductID && SelectedProductID.includes(data.id) ? (
              <Stack direction={"row"} alignItems={"center"}>
                <IconButton
                  onClick={() => {
                    dispatch(decreaseQte(data));
                  }}
                >
                  <Remove sx={{ color: theme.palette.primary.main }} />
                </IconButton>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.getContrastText(
                      theme.palette.primary.main
                    ),
                    bgcolor: theme.palette.primary.main,
                    height: "fit-content",
                    borderRadius: "50%",
                    width: "25px",
                    pl: 1,
                    mx: 1,
                  }}
                >
                  {/* Methoede1 */}
                  {/* {SelectedProduct.map((j) => {
                        if (item.id === j.id) {
                          return j.Qte;
                        }
                      })} */}
                  {/* Methode2 */}
                  {QteProd(data.id)}
                </Typography>
                <IconButton
                  onClick={() => {
                    dispatch(increaseQte(data));
                  }}
                >
                  <Add sx={{ color: theme.palette.primary.main }} />
                </IconButton>
              </Stack>
            ) : (
              <Button
                sx={{
                  textTransform: "capitalize",
                  p: 1,
                  lineHeight: "1.1",
                }}
                variant="contained"
                onClick={() => {
                  dispatch(
                    AddToCart({
                      ...data,
                      Qte: 1,
                    })
                  );
                }}
              >
                <ShoppingCart /> Add To Cart
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <Stack
        sx={{
          width: "100%",
          mt: 2,
          justifyContent: "center",
          px: 1,
          height: "80vh",
          alignItems: "center",
        }}
        direction={"row"}
        flexWrap={"wrap"}
      >
        <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
          <CircularProgress
            color="secondary"
            sx={{ width: "120px", height: "120px" }}
          />
        </Stack>
      </Stack>
    );
  }
  if (error) {
    return (
      <Stack
        sx={{
          width: "100%",
          mt: 2,
          justifyContent: "center",
          px: 1,
          height: "80vh",
          alignItems: "center",
        }}
        direction={"row"}
        flexWrap={"wrap"}
      >
        <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
          <Typography variant="h2" color="inherit">
            Error
          </Typography>
        </Stack>
      </Stack>
    );
  }
};

export default ProductDetails;

//Methode 1
// import { useTheme } from "@emotion/react";
// import { ShoppingCart } from "@mui/icons-material";
// import {
//   Box,
//   CardMedia,
//   ImageList,
//   ImageListItem,
//   Paper,
//   Stack,
//   Typography,
//   IconButton,
//   Button,
//   CircularProgress,
// } from "@mui/material";
// import { useParams } from "react-router-dom";
// import { useGetproductsByNameQuery } from "Redux/Products";
// const itemData = [
//   {
//     img: "https://images.pexels.com/photos/3130394/pexels-photo-3130394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     title: "Breakfast",
//   },
//   {
//     img: "https://images.pexels.com/photos/1484808/pexels-photo-1484808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     title: "Burger",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
//     title: "Camera",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
//     title: "Coffee",
//   },
//   {
//     img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
//     title: "Coffee",
//   },
// ];
// const ProductDetails = () => {
//   const theme = useTheme();
//   const { data, error, isLoading } = useGetproductsByNameQuery("");
//   //id from Product
//   let Id = useParams();
//   const Arr = data.find((item) => {
//     return Number(item.id) === Number(Id.ProdId);
//   });
//   console.log(Arr);
//   if (data) {
//     return (
//       <Stack sx={{ width: "100%", alignItems: "center" }}>
//         <Paper
//           sx={{
//             width: "75%",
//             height: "fit-content",
//             display: "flex",
//             justifyContent: "space-between",
//             py: 5,
//             px: 2,
//             mt: 7,
//             boxShadow: `0 0 0 #9e4673, 0 0 10px ${theme.palette.getContrastText(
//               theme.palette.primary.contrastText
//             )}, 0 0 0 ${theme.palette.getContrastText(
//               theme.palette.primary.contrastText
//             )}`,
//           }}
//         >
//           <CardMedia
//             component="img"
//             height="fit-content"
//             sx={{
//               width: "300px !important",
//               height: "fit-content",
//               borderRadius: "7px",
//             }}
//             image={Arr.imageLink}
//             alt="green iguana"
//           />
//           <Box  ml={3} >
//             <Stack
//               direction={"row"}
//               alignItems={"center"}
//               justifyContent={"space-between"}
//             >
//               <Typography variant="h4" sx={{textTransform:"uppercase"}} color="inherit">
//                 {Arr.productName}
//               </Typography>
//               <Typography variant="h6" color="error">
//                 ${Arr.price}
//               </Typography>
//             </Stack>
//             <Box width={"100%"}>
//               <Typography variant="body1" color="inherit" my={2}>
//                 {" "}
//                 UI/UX designing, html css tutorials
//               </Typography>
//               <Typography variant="body1" color="inherit" my={1}>
//                 {Arr.description}
//               </Typography>
//               <ImageList sx={{ width: "100%", height: "fit-content",my:3 }} cols={5}>
//                 {itemData.map((item) => (
//                   <ImageListItem key={item.img}>
//                     <img
//                       src={`${item.img}?w=100&h=fit-content&fit=crop&auto=format`}
//                       style={{ borderRadius: "7px" }}
//                       srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
//                       alt={item.title}
//                       loading="lazy"
//                     />
//                   </ImageListItem>
//                 ))}
//               </ImageList>
//               <Button sx={{my:1}} variant="contained">
//                 <ShoppingCart /> Add To Cart
//               </Button>
//             </Box>
//           </Box>
//         </Paper>
//       </Stack>
//     );
//   }
//   if (isLoading) {
//     return (
//       <Stack
//         sx={{
//           width: "100%",
//           mt: 2,
//           justifyContent: "center",
//           px: 1,
//           height: "80vh",
//           alignItems: "center",
//         }}
//         direction={"row"}
//         flexWrap={"wrap"}
//       >
//         <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
//           <CircularProgress
//             color="secondary"
//             sx={{ width: "120px", height: "120px" }}
//           />
//         </Stack>
//       </Stack>
//     );
//   }
//   if (error) {
//     return (
//       <Stack
//         sx={{
//           width: "100%",
//           mt: 2,
//           justifyContent: "center",
//           px: 1,
//           height: "80vh",
//           alignItems: "center",
//         }}
//         direction={"row"}
//         flexWrap={"wrap"}
//       >
//         <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
//           <Typography variant="h2" color="inherit">
//             Error
//           </Typography>
//         </Stack>
//       </Stack>
//     );
//   }
// };

// export default ProductDetails;
