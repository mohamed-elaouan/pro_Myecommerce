import { useTheme } from "@emotion/react";
import { Add, Delete, Remove } from "@mui/icons-material";
import {
  Box,
  Paper,
  Stack,
  Button,
  Typography,
  IconButton,
  CardMedia,
  Divider,
} from "@mui/material";
import { DeleteProduct, decreaseQte, increaseQte } from "Redux/CardSlice";
import { useSelector, useDispatch } from "react-redux";

// const productCart = [
//   {
//     img: "https://images.pexels.com/photos/1482414/pexels-photo-1482414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     prix: "99",
//   },
//   {
//     img: "https://images.pexels.com/photos/1484808/pexels-photo-1484808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     prix: "129",
//   },
//   {
//     img: "https://images.pexels.com/photos/2560894/pexels-photo-2560894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     prix: "89",
//   },
//   {
//     img: "https://images.pexels.com/photos/6311652/pexels-photo-6311652.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     prix: "119",
//   },
// ];
const Cart = () => {
  const theme = useTheme();
  const { SelectedProduct } = useSelector(
    // @ts-ignore
    (state) => state.cartShop
  );
  const dispatch = useDispatch();
  let Total = 0;
  
  return (
    <Stack
      component="article"
      sx={{ mt: 4, width: "100%" }}
      alignItems={"center"}
    >
      {SelectedProduct.map((item) => {
        Total += Number(item.price) * Number(item.Qte);
        return (
          <Paper
            elevation={3}
            key={item.id}
            sx={{
              width: { xs: "85%", sm: "450px", md: "600px" },
              mb: 2,
              bgcolor: "whitesmoke",
            }}
          >
            <Stack
              p="4px"
              direction={"row"}
              sx={{ justifyContent: "space-around", alignItems: "center" }}
            >
              <Button
                variant="text"
                sx={{ display: { xs: "none", md: "block" } }}
                size="medium"
                color="error"
                onClick={() => {
                  dispatch(DeleteProduct(item));
                }}
              >
                delete
              </Button>
              <IconButton
                sx={{ display: { xs: "flex", md: "none" }, fontSize: 31 }}
                onClick={() => {
                  dispatch(DeleteProduct(item));
                }}
              >
                <Delete color="error" />
              </IconButton>

              <Typography
                variant="body1"
                sx={{ fontSize: { xs: "17px", md: "20px" } }}
                color="initial"
              >
                ${Number(item.price) * Number(item.Qte)}
              </Typography>

              <Stack direction={"row"} alignItems={"center"}>
                <IconButton
                  sx={{ "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" } }}
                  onClick={() => {
                    dispatch(decreaseQte(item));
                  }}
                >
                  <Remove sx={{ color: theme.palette.PaperCart.main }} />
                </IconButton>
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.getContrastText(
                      theme.palette.primary.light
                    ),
                    bgcolor: theme.palette.PaperCart.main,
                    height: "fit-content",
                    borderRadius: "50%",
                    width: "25px",
                    pl: 1,
                    mx: 1,
                  }}
                >
                  {item.Qte}
                  {/* {item.Qte === 0 && dispatch(DeleteProduct(item))} */}
                </Typography>
                <IconButton
                  sx={{ "&:hover": { bgcolor: "rgba(0, 0, 0, 0.04)" } }}
                  onClick={() => {
                    dispatch(increaseQte(item));
                  }}
                >
                  <Add sx={{ color: theme.palette.PaperCart.main }} />
                </IconButton>
              </Stack>

              <Typography
                variant="h6"
                color="initial"
                sx={{ fontSize: { xs: "17px", md: "25px" } }}
              >
                T-Shirt
              </Typography>
              <CardMedia
                component="img"
                height="fit-content"
                sx={{ width: "80px !important" }}
                image={item.imageLink[0]}
                alt="green iguana"
              />
            </Stack>
          </Paper>
        );
      })}
      <Paper elevation={3} sx={{ width: "250px", mb: 2 }}>
        <Stack>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", my: 1.5 }}
            color="inherit"
          >
            Cart Summary
          </Typography>
          <Divider />
          <Stack direction={"row"} mx={1} my={1.2}>
            <Typography variant="body1" color="inherit">
              Subtotal
            </Typography>
            <Box flexGrow={1} />
            <Typography variant="body1" color="inherit">
              ${Total}
            </Typography>
          </Stack>
          <Button variant="contained">Checkout</Button>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default Cart;
