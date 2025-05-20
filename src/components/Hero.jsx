import React, { useState, useEffect } from "react";

const initialCountdownItems = [
  { label: "Days", value: "00" },
  { label: "Hours", value: "00" },
  { label: "Minutes", value: "00" },
  { label: "Seconds", value: "00" },
];

function Hero() {
  const [countdownItems, setCountdownItems] = useState(initialCountdownItems);
  const [nextEventName, setNextEventName] = useState("");
  const [loadingCountdown, setLoadingCountdown] = useState(true);

  useEffect(() => {
    const fetchEventsAndSetCountdown = async () => {
      try {
        const response = await fetch(
          "https://api.yildizskylab.com/api/events/getAllByTenant?tenant=AGC" // Changed to https
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.success && result.data && result.data.length > 0) {
          const now = new Date();
          const upcomingActiveEvents = result.data
            .filter(event => {
              const eventDate = new Date(event.date.split(' ')[0].split('-').reverse().join('-') + 'T' + event.date.split(' ')[1]);
              return event.isActive && eventDate > now;
            })
            .sort((a, b) => {
              const dateA = new Date(a.date.split(' ')[0].split('-').reverse().join('-') + 'T' + a.date.split(' ')[1]);
              const dateB = new Date(b.date.split(' ')[0].split('-').reverse().join('-') + 'T' + b.date.split(' ')[1]);
              return dateA - dateB; // Sort ascending (soonest first)
            });

          if (upcomingActiveEvents.length > 0) {
            const nextEvent = upcomingActiveEvents[0];
            setNextEventName(nextEvent.title);
            const targetDate = new Date(nextEvent.date.split(' ')[0].split('-').reverse().join('-') + 'T' + nextEvent.date.split(' ')[1]).getTime();

            const interval = setInterval(() => {
              const nowMillis = new Date().getTime();
              const distance = targetDate - nowMillis;

              if (distance < 0) {
                clearInterval(interval);
                setCountdownItems(initialCountdownItems); // Reset or show "Event Started"
                setNextEventName("The event has started!");
                return;
              }

              const days = Math.floor(distance / (1000 * 60 * 60 * 24));
              const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
              const seconds = Math.floor((distance % (1000 * 60)) / 1000);

              setCountdownItems([
                { label: "Days", value: String(days).padStart(2, '0') },
                { label: "Hours", value: String(hours).padStart(2, '0') },
                { label: "Minutes", value: String(minutes).padStart(2, '0') },
                { label: "Seconds", value: String(seconds).padStart(2, '0') },
              ]);
            }, 1000);
            setLoadingCountdown(false);
            return () => clearInterval(interval);
          } else {
            setNextEventName("No upcoming events scheduled.");
            setLoadingCountdown(false);
          }
        } else {
          setNextEventName("Could not load event data.");
          setLoadingCountdown(false);
        }
      } catch (e) {
        console.error("Error fetching events for countdown:", e);
        setNextEventName("Error loading events.");
        setCountdownItems(initialCountdownItems);
        setLoadingCountdown(false);
      }
    };

    fetchEventsAndSetCountdown();
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center py-10"
      style={{
        backgroundImage: "url('/assets/hero/background.webp')",
      }}
    >
      <div className="mb-8">
        <img src="/assets/hero/hero_sticker.png" alt="Logo" className="h-60 sm:h-80" />
      </div>
      <div className="text-center mb-6 max-w-screen-md mx-auto px-4">
        <p className="text-xl sm:text-2xl text-white">
          Algoritma ve programlama tutkunlarını bir araya getiren bu heyecan verici yarışmada sen de yerini al! Yeteneklerini sergile, sınırlarını zorla ve büyük ödülleri kazanma şansını yakala.
        </p>
      </div>

      {/* Countdown Section Title */}
      {!loadingCountdown && nextEventName && (
        <div className="text-center mb-4">
          <p className="text-lg sm:text-xl text-yellow-400 font-semibold animate-pulse">
            {nextEventName.includes("No upcoming") || nextEventName.includes("Error") || nextEventName.includes("started") ? "" : "Next Event:"} {nextEventName}
          </p>
        </div>
      )}
       {loadingCountdown && (
        <div className="text-center mb-4">
          <p className="text-lg sm:text-xl text-gray-300">Loading countdown...</p>
        </div>
      )}


      {/* Countdown Timer */}
      <div className="flex flex-wrap justify-center space-x-0">
        {countdownItems.map((item, index) => (
          <div
            key={index}
            className={`text-center p-3 sm:p-4 md:p-6 border-2 sm:border-4 border-white bg-gradient-to-r from-[#0A2033] to-[#071522] 
                w-1/4 max-w-[100px] sm:max-w-[120px]
                ${index === 0 ? "rounded-l-lg border-r-0" : ""} 
                ${
                  index === countdownItems.length - 1
                    ? "rounded-r-lg border-l-0"
                    : ""
                }
                ${(index > 0 && index < countdownItems.length -1) ? "border-l-0 border-r-0" : ""}
                `}
          >
            <span className="block text-2xl sm:text-3xl md:text-4xl font-bold text-white">{item.value}</span>
            <span className="block text-xs sm:text-sm text-gray-300">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hero;
