import "./App.css";
import React, { useState, useEffect } from "react"; // Import useState and useEffect
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Leaderboard from "./components/Leaderboard";
import SSS from "./components/SSS";
import Team from "./components/Team";
import GallerySection from "./components/GallerySection";
import Footer from "./components/Footer";
import Divider from "./components/Divider";
import Events from "./components/Events";

function App() {
  const [allEvents, setAllEvents] = useState([]);
  const [nextUpcomingEventForHero, setNextUpcomingEventForHero] = useState({
    title: "",
    targetDate: null,
  });
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState(null);

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        setEventsLoading(true);
        const response = await fetch(
          "https://api.yildizskylab.com/api/events/getAllByTenant?tenant=AGC"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.success && result.data) {
          setAllEvents(result.data);

          // Determine next upcoming event for Hero
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
            setNextUpcomingEventForHero({
              title: nextEvent.title,
              targetDate: new Date(nextEvent.date.split(' ')[0].split('-').reverse().join('-') + 'T' + nextEvent.date.split(' ')[1]).getTime(),
            });
          } else {
             setNextUpcomingEventForHero({ title: "No upcoming events scheduled.", targetDate: null });
          }
          setEventsError(null);
        } else {
          setEventsError(result.message || "Failed to fetch event data.");
          setNextUpcomingEventForHero({ title: "Could not load event data.", targetDate: null });
        }
      } catch (e) {
        setEventsError(e.message);
        setNextUpcomingEventForHero({ title: "Error loading events.", targetDate: null });
        console.error("Error fetching events in App.jsx:", e);
      } finally {
        setEventsLoading(false);
      }
    };

    fetchEventsData();
  }, []);

  return (
    <div className="App">
      <Header />
      <Hero
        nextEventNameProp={nextUpcomingEventForHero.title}
        targetDateProp={nextUpcomingEventForHero.targetDate}
        loadingCountdownProp={eventsLoading} // Pass loading state for initial display
      />
      <About />

      <Divider className="relative bottom-4 lg:bottom-15" />

      <Leaderboard />

      <Divider className="relative -bottom-10" />
      <Events
        allEventsData={allEvents}
        loading={eventsLoading}
        error={eventsError}
      />

      <Divider className="relative -bottom-10" />

      <SSS />

      <Divider className="relative bottom-10" />

      <Team />
      <GallerySection />

      <Footer />
    </div>
  );
}

export default App;
