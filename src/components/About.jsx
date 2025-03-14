import React from "react";

function About() {
  return (
    <div className="flex flex-col md:flex-col lg:flex-row items-center  py-6 px-6 lg:px-32 lg:pb-60 bg-[#2269A9]">
      <img
        src="assets/about/about_image.png"
        alt="About Us"
        className="w-full md:w-full lg:w-1/2 h-auto rounded-lg"
      />
      <div className="mt-10 lg:ml-10 flex flex-col items-center md:items-center lg:items-start max-w-screen-md mx-auto">
        <p className="text-lg text-white mb-4">
          Horem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
          elit sed risus. Maecenas eget condimentum velit, sit amet feugiat
          lectus. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra, per inceptos himenaeos.
        </p>
        <button className="bg-[#FBFBFF] text-black py-2 px-8 rounded">
          Başvur
        </button>
      </div>
    </div>
  );
}

export default About;
