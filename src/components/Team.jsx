import React, { useState, useRef, useEffect } from "react";

const Team = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const sliderRef = useRef(null);

  const teamMembers = [
    {
      id: 1,
      name: "Ad Soyad",
      role: "Görev",
      description: "Görev Açıklaması",
      image: "assets/image1.jpeg",
    },
    {
      id: 2,
      name: "Ad Soyad",
      role: "Görev",
      description: "Görev Açıklaması",
      image: "assets/image1.jpeg",
    },
    {
      id: 3,
      name: "Ad Soyad",
      role: "Görev",
      description: "Görev Açıklaması",
      image: "assets/image1.jpeg",
    },
    {
      id: 4,
      name: "Ad Soyad",
      role: "Görev",
      description: "Görev Açıklaması",
      image: "assets/image1.jpeg",
    },
    {
      id: 5,
      name: "Ad Soyad",
      role: "Görev",
      description: "Görev Açıklaması",
      image: "assets/image1.jpeg",
    },
  ];

  const totalSlides = teamMembers.length;
  const slidesToShow = 4;
  const maxIndex = totalSlides - slidesToShow;

  const scrollToIndex = (index) => {
    if (sliderRef.current) {
      setIsScrolling(true);
      const scrollWidth = sliderRef.current.scrollWidth;
      const itemWidth = scrollWidth / totalSlides;
      sliderRef.current.scrollTo({
        left: itemWidth * index,
        behavior: "smooth",
      });
      setTimeout(() => setIsScrolling(false), 500);
    }
  };

  const handleScroll = () => {
    if (sliderRef.current && !isScrolling) {
      const scrollPosition = sliderRef.current.scrollLeft;
      const scrollWidth = sliderRef.current.scrollWidth;
      const itemWidth = scrollWidth / totalSlides;
      const newIndex = Math.round(scrollPosition / itemWidth);
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", handleScroll);
      return () => {
        slider.removeEventListener("scroll", handleScroll);
      };
    }
  }, [currentIndex, isScrolling]);

  const goToPrevious = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = Math.min(maxIndex, currentIndex + 1);
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  return (
    <div className="bg-[#0e2a44] py-12 px-4">
      {/* Logo */}
      <div className="mb-4 mr-auto ml-24">
        <img
          src="/assets/team/team_sticker.png"
          alt="SSS"
          className="w-auto h-56"
        />
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          {/* Slider Container */}
          <div
            ref={sliderRef}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-8 pb-8"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {teamMembers.map((member) => (
              <div key={member.id} className="flex-shrink-0 w-64 snap-start">
                <div className=" overflow-hidden">
                  <div
                    className="relative w-full"
                    style={{ paddingBottom: "133.33%" }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="absolute top-0 left-0 w-full h-full object-cover object-center border-white border-6"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-xl font-bold text-white">
                      {member.name}
                    </h3>
                    <p className="text-white">{member.role}</p>
                    <p className="text-white text-sm mt-1">
                      {member.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Horizontal Scrollbar */}
        <div className="max-w-2xl mx-auto mt-8 relative h-2">
          {/* Background track - clickable for jumping to position */}
          <div
            className="absolute w-full h-full bg-gray-600/30 rounded-full cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickPosition = (e.clientX - rect.left) / rect.width;
              const newIndex = Math.min(
                maxIndex,
                Math.max(0, Math.round(clickPosition * maxIndex))
              );
              setCurrentIndex(newIndex);
              scrollToIndex(newIndex);
            }}
          ></div>

          {/* Thumb/handle - draggable */}
          <div
            className="absolute h-full bg-white rounded-full transition-all duration-300 cursor-grab active:cursor-grabbing"
            style={{
              width: `${(100 / totalSlides) * slidesToShow}%`,
              left: `${
                (currentIndex / maxIndex) *
                (100 - (100 / totalSlides) * slidesToShow)
              }%`,
            }}
            onMouseDown={(startEvent) => {
              startEvent.preventDefault();
              const thumbEl = startEvent.currentTarget;
              const trackEl = thumbEl.parentElement;
              const trackRect = trackEl.getBoundingClientRect();
              const trackWidth = trackRect.width;

              // Calculate the draggable range
              const maxLeft = trackWidth - thumbEl.offsetWidth;

              // Calculate offset within the thumb where user clicked
              const initialX = startEvent.clientX;
              const thumbLeft = thumbEl.offsetLeft;
              const offsetX = initialX - thumbLeft - trackRect.left;

              const handleMouseMove = (moveEvent) => {
                const x = moveEvent.clientX - trackRect.left - offsetX;
                const thumbPosition = Math.max(0, Math.min(maxLeft, x));
                const percentage = thumbPosition / maxLeft;
                const newIndex = Math.round(percentage * maxIndex);

                if (newIndex !== currentIndex) {
                  setCurrentIndex(newIndex);
                  scrollToIndex(newIndex);
                }
              };

              const handleMouseUp = () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
              };

              document.addEventListener("mousemove", handleMouseMove);
              document.addEventListener("mouseup", handleMouseUp);
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Team;
