import { useState } from "react";

export default function SSS() {
  const [openItem, setOpenItem] = useState(2); // Third item open by default

  const faqItems = [
    {
      id: 0,
      question: "Lorem ipsum dolor sit amet",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra.",
    },
    {
      id: 1,
      question: "Lorem ipsum dolor sit amet",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra.",
    },
    {
      id: 2,
      question: "Lorem ipsum dolor sit amet",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra.",
    },
    {
      id: 3,
      question: "Lorem ipsum dolor sit amet",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra.",
    },
  ];

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className="bg-[#2269A9] flex flex-col items-center py-48 pb-56">
      {/* Logo */}
      <div className="mb-4 mr-auto ml-24">
        <img
          src="/assets/sss/sss_sticker.png"
          alt="SSS"
          className="w-auto h-56"
        />
      </div>

      {/* FAQ Accordion */}
      <div className="w-full px-48 overflow-hidden">
        {faqItems.map((item, index) => (
          <div key={item.id} className={`overflow-hidden shadow-md`}>
            <div
              className={`flex justify-between items-center p-5 cursor-pointer ${
                item.id % 2 === 0
                  ? "bg-[#DDEBF8] text-[#071522]"
                  : "bg-[#0E2A44] text-white"
              } ${index === 0 ? "rounded-t-lg" : ""} 
              ${
                index === faqItems.length - 1 && openItem !== item.id
                  ? "rounded-b-lg"
                  : ""
              }`}
              onClick={() => toggleItem(item.id)}
            >
              <h3 className="text-lg font-semibold">{item.question}</h3>
              <span className="text-2xl">
                {openItem === item.id ? "−" : "+"}
              </span>
            </div>
            {openItem === item.id && (
              <div
                className={`p-5 ${
                  item.id % 2 === 0
                    ? "bg-[#DDEBF8] text-[#071522]"
                    : "bg-[#0E2A44] text-white"
                } ${index === faqItems.length - 1 && "rounded-b-lg"}`}
              >
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
