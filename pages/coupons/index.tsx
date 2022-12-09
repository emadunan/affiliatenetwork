import { FC, useEffect } from "react";


const Coupons: FC = () => {
  useEffect(() => {
    fetch("/api/campaigns").then(response => {
      if (!response.ok) return console.log(response);
      return response.json();
    }).then(data => console.log(data)
    )
  }, []);
  return (
    <div>
      
    </div>
  );
}

export default Coupons;