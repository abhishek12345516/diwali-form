import React, { useEffect, useState } from "react";
// App.js me
import FormPage from "./components/FormPage";
import WishPage from "./components/WishPage";

function App() {
  const [wishData, setWishData] = useState(null);
  const [showWish, setShowWish] = useState(false);

  // agar link ke through data aaye to decode karo
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = params.get("data");
    if (data) {
      const decoded = JSON.parse(decodeURIComponent(data));
      setWishData(decoded);
      setShowWish(true);
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
