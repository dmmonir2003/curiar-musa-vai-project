import React, { useState } from "react";
import WebsiteLayout from "../../Layouts/Website";
import { useNavigate } from "react-router-dom";

const DailyRoutes = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  
  return (
    <WebsiteLayout>
      
    </WebsiteLayout>
  );
};

export default DailyRoutes;
