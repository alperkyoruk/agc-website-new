import React from "react";

function Hero() {
  const countdownItems = [
    { label: "Days", value: "00" },
    { label: "Hours", value: "00" },
    { label: "Minutes", value: "00" },
    { label: "Seconds", value: "00" },
  ];

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/assets/hero/background.webp')",
      }}
    >
      <div className="mb-8">
        <img src="/assets/hero/hero_sticker.png" alt="Logo" className="h-80" />
      </div>
      <div className="text-center mb-8 max-w-screen-md mx-auto">
        <p className="text-2xl text-white">
          Morem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis.
        </p>
      </div>
      <div className="flex space-x-">
        {countdownItems.map((item, index) => (
          <div
            key={index}
            className={`text-center p-6 border-4 border-white bg-gradient-to-r from-[#0A2033] to-[#071522] 
                ${index === 0 ? "rounded-l-lg border-r-0" : ""} 
                ${
                  index === countdownItems.length - 1
                    ? "rounded-r-lg border-l-0"
                    : ""
                }
                ${index === 1 ? "border-r-0" : ""}`}
          >
            <span className="block text-4xl font-bold">{item.value}</span>
            <span className="block text-sm text-white">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hero;
