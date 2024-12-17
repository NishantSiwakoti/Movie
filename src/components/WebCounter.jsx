import React, { useEffect } from "react";

const WebCounter = () => {
  useEffect(() => {
    // Dynamically load the script
    const script = document.createElement("script");
    script.src = "https://www.counter12.com/ad.js?id=9dzbyY30c0B1W093";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#111827",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100px", // Adjust height as needed
      }}
    >
      <a href="https://www.counter12.com">
        <img
          src="https://www.counter12.com/img-9dzbyY30c0B1W093-91.gif"
          border="0"
          alt="web counter free"
        />
      </a>
    </div>
  );
};

export default WebCounter;
