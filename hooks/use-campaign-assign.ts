import { useEffect, useState } from "react";

const useCampaignAssign = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<any | undefined>();

  useEffect(() => {
    if (selectedCampaign) {
      selectedCampaign.coupons.forEach((coupon: any) => {
        if (!coupon.checked) {
          coupon.checked = false;
        }

        if (!coupon.percent) {
          coupon.percent = 0;
        }
      });
    }
  }, [selectedCampaign]);

  return { selectedCampaign, setSelectedCampaign }
}

export default useCampaignAssign;