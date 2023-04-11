import { useEffect, useState } from "react";
import { SelectedCampaign } from "../interfaces/selected-campaign";


const useCampaignAssign = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<SelectedCampaign | undefined>();

  useEffect(() => {
    if (selectedCampaign) {
      selectedCampaign.coupons.forEach(coupon => {
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