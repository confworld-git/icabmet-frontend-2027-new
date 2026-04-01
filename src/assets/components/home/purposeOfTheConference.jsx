export default function PurposeOfConference() {
  const purposeList = [
    {
      heading: "foster collaboration",
      description:
        "across diverse fields such as biotechnology, medicine, public health, environmental science and allied health disciplines.",
      image: "/images/purpose/pic1-collaboration.png",
    },
    {
      heading: "promote knowledge exchange",
      description:
        "by showcasing cutting-edge research, emerging technologies and best practices in healthcare and life sciences.",
      image: "/images/purpose/pic1-knowledge.png",
    },
    {
      heading: "encourage translational research ",
      description:
        "that bridges the gap between scientific discovery and clinical or community application.",
      image: "/images/purpose/pic1-growth.png",
    },
    {
      heading: "support sustainable health strategies",
      description:
        "that contribute to global wellbeing, resilience and equity.",
      image: "/images/purpose/pic1-support.png",
    },
  ];
  return (
    <div className="flex justify-center items-center ">
      <div className="container">
        <h2 className="text-center text-2xl md:text-3xl text-cyan-600 font-bold p-5 md:p-10">
          Purpose of the Conference
        </h2>
        <p className="text-center mx-10 md:mx-40">
          The purpose of the International Conference on Life Sciences and
          Multidisciplinary Healthcare Approaches (ICLSMHA-2026) is to provide a
          global platform for researchers, educators, healthcare professionals
          and industry leaders to come together and explore innovative,
          cross-disciplinary solutions to today’s most pressing health and life
          science challenges.
        </p>
        {/* <p>This conference seeks to:</p> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-5">
  {purposeList.map(({ heading, description, image }, index) => (
    <div 
      key={index} 
      className="border-t-4 border-l-0 md:border-t-0 md:border-l-4 border-cyan-600 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
    >
      <div className="flex flex-col md:flex-row h-full">
        {/* Image Section */}
        <div className="w-full md:w-2/5 bg-gray-50 flex items-center justify-center p-4">
          <img 
            src={image} 
            alt={heading} 
            className="w-full h-auto object-contain max-h-48 md:max-h-full" 
          />
        </div>
        
        {/* Text Section */}
        <div className="w-full md:w-3/5 bg-cyan-600 opacity-80 text-white p-6 flex items-center">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-3 capitalize">
              {heading}
            </h3>
            <p className="text-blue-100 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
      </div>
    </div>
  );
}
