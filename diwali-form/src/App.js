import React, { useEffect, useState } from "react";
import FormPage from "./components/FormPage";
import WishPage from "./components/WishPage";

function App() {
  const [wishData, setWishData] = useState(null);
  const [showWish, setShowWish] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = params.get("data");

    if (data) {
      try {
        const decoded = JSON.parse(decodeURIComponent(data));
        setWishData(decoded);
        setShowWish(true);
      } catch (e) {
        console.error("Invalid data in URL");
      }
    }
  }, []);

  const handleGenerate = (data) => {
    setWishData(data);
  };

  return (
    <>
      {!showWish ? (
        <FormPage onGenerate={handleGenerate} />
      ) : (
        <WishPage data={wishData} />
      )}
    </>
  );
}

export default App;
