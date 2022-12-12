import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface CouponCardProps {
  coupon: any;
}

const CouponCard: React.FC<CouponCardProps> = (props) => {
  const {
    couponId,
    campaignName,
    campaignCategory,
    coupon_code,
    coupon_ad_set,
    coupon_countries,
    coupon_network,
    coupon_source,
  } = props.coupon;

  return (
    <Card sx={{ width: 200, minHeight: 250, textAlign: "center", margin: 2 }}>
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          {campaignName}
        </Typography>
        <Typography variant="h5" component="div">
          {coupon_code}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {campaignCategory}
        </Typography>
        <Box component="h4" sx={{ background: "#E27976", color: "#fff" }}>
          {coupon_ad_set}
        </Box>
        <Typography variant="body1" sx={{ m: 1 }}>
          {coupon_countries &&
            coupon_countries.map((country: string) => (
              <span key={country}>{country}, </span>
            ))}
        </Typography>
      </CardContent>
      <CardActions className="flex items-center justify-between">
        <Button size="small">More</Button>
        <Typography component="span" variant="body2">
          {`${coupon_network}|${coupon_source}`}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default CouponCard;
