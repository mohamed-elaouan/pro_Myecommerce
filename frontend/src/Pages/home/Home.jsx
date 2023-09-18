import {
  Typography,
  Stack,
  Box,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useGetproductsByNameQuery } from "../../Redux/Products";
import { useSelector, useDispatch } from "react-redux";
import { Add, Remove } from "@mui/icons-material";
import { decreaseQte, increaseQte, AddToCart } from "Redux/CardSlice";
import { useNavigate } from "react-router-dom";
//Run Backend : node --watch index.js
const Home = () => {
  const theme = useTheme();
  const { data, error, isLoading } = useGetproductsByNameQuery("");

  const { SelectedProduct, SelectedProductID } = useSelector(
    // @ts-ignore
    (state) => state.cartShop
  );
  // @ts-ignore
  useSelector((state) => state.cartShop);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const QteProd = (idQ) => {
    const QteR = SelectedProduct.find((item) => {
      return item.id === idQ;
    });
    return QteR.Qte;
  };
  if (data) {
    return (
      <Stack
        sx={{
          width: "100%",
          mt: 2,
          justifyContent: "center",
          px: 1,
        }}
        direction={"row"}
        flexWrap={"wrap"}
      >
        {data.map((item, index) => {
          return (
            <Card
              sx={{
                maxWidth: 277,
                mx: 1,
                mb: "18px !important",
                transition: "0.2s",
                "&:hover": { transform: "rotate(0.5deg)", scale: "1.01" },
              }}
              key={item.id}
            >
              <CardActionArea
                onClick={() => {
                  navigate(`ProductDetail/${item.id}`);
                }}
              >
                <CardMedia
                  component="img"
                  height="340"
                  image={item.imageLink[0]}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography variant="h5" color="inherit">
                    {" "}
                    {item.productName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                {SelectedProductID && SelectedProductID.includes(item.id) ? (
                  <Stack direction={"row"} alignItems={"center"}>
                    <IconButton
                      onClick={() => {
                        dispatch(decreaseQte(item));
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
                      {QteProd(item.id)}
                    </Typography>
                    <IconButton
                      onClick={() => {
                        dispatch(increaseQte(item));
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
                          ...item,
                          Qte: 1,
                        })
                      );
                    }}
                  >
                    Add To Cart
                  </Button>
                )}

                <Box flexGrow={1} />
                <Typography variant="body1" color={theme.palette.error.light}>
                  ${item.price}
                </Typography>
              </CardActions>
            </Card>
          );
        })}
      </Stack>
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

export default Home;
