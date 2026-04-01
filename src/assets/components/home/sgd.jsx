export default function Sdg() {
  const logo = [
    {
      image: "/images/logo/cerada-logo.webp",
      alt: "cerada-logo",
    },
    {
      image: "/images/logo/scopus-logo.webp",
      alt: "scopus-logo",
    },
    
  ];
  const sdgList = [
    {
      image: "/images/sdg/no-poverty.webp",
      alt: "no-poverty",
    },
    
    {
      image: "/images/sdg/zero-hunger.webp",
      alt: "zero-hunger",
    },
    {
      image: "/images/sdg/good-health-and-well-being.webp",
      alt: "good-health-and-well-being",
    },
    {
      image: "/images/sdg/quality-education.webp",
      alt: "quality-education",
    },
    {
      image: "/images/sdg/gender-equality.webp",
      alt: "gender-equality",
    },
    {
      image: "/images/sdg/affordable-energy.webp",
      alt: "clean-water-and-sanitation",
    },
    {
      image: "/images/sdg/decent-work-and-economic-growth.webp",
      alt: "decent-work-and-economic-growth",
    },
    {
      image: "/images/sdg/industry-innovation.webp",
      alt: "industry-innovation-and-infrastructure",
    },
    // {
    //   image: "/images/sdg/reduced-inequalities.webp",
    //   alt: "reduced-inequalities",
    // },
    {
      image: "/images/sdg/sustainable-cities-and-communities.webp",
      alt: "sustainable-cities-and-communities",
    },
    {
      image: "/images/sdg/responsible-consumption-and-production.webp",
      alt: "responsible-consumption-and-production",
    },
    // {
    //   image: "/images/sdg/climate-action.webp",
    //   alt: "climate-action",
    // },
    {
      image: "/images/sdg/partnerships-goals.webp",
      alt: "partnerships-goals",
    },
    
  ];
  return (
    <div className="bg-transparent py-1">
      <div className="text-center md:text-center md:px-10 font-semibold text-rose-500">
        <p>#CERADA Supports SDGs</p>
      </div>
      <div className="flex gap-2 md:px-2 md:gap-y-1 items-center flex-wrap justify-center md:justify-start  ">
        {logo.map(({ image, alt }, index) => (
          <img key={index} src={image} alt={alt} width={100} height={100} className="bg-white p-1" />
        ))}
        {sdgList.map(({ image, alt }, index) => (
          <img key={index} src={image} alt={alt} width={70} height={80} />
        ))}
      </div>
      
    </div>
  );
}