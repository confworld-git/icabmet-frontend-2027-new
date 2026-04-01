import { FaSearch, FaSun, FaChartBar, FaBullseye } from "react-icons/fa";

const registration_steps = [
  {
    title: "choose your preferred admittance category.",
    image: "/images/choose-your-preferred-admittance-category.svg",
  },
  {
    title: "enter your details  in the form.",
    image: "/images/enter-your-details-in-the-form.svg",
  },
  {
    title: "proceed to payment gateway.",
    image: "/images/proceed-to-payment-gateway.svg",
  },
  {
    title: "get an official conference invitation letter.",
    image: "/images/get-an-official-conference-invitation-letter.svg",
  },
];
const steps = [
  {
    icon: <FaSearch size={30} />,
    desc: "choose your preferred admittance category.",
    color: "blue-600",
  },
  {
    icon: <FaSun size={30} />,
    desc: "enter your details  in the form.",
    color: "blue-600",
  },
  {
    icon: <FaChartBar size={30} />,
    desc: "proceed to payment gateway.",
    color: "blue-600",
  },
  {
    icon: <FaBullseye size={30} />,
    desc: "get an official conference invitation letter.",
    color: "blue-600",
  },
];

export default function RegisterSteps() {
  return (
    <div className="flex justify-center bg-gray-50">
      <div className="container my-10">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-gradient">
          Registration Steps
        </h2>
        <div className="flex flex-wrap justify-center text-center items-center gap-6 p-6 ">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative w-64 h-38 bg-white rounded-xl shadow-md p-6 border-2 border-dashed border-gray-300 "
            >
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-6 h-6 rounded-sm bg-white border-t-4 border-r-4 border-blue-600 "></div>

              {/* Icon */}
              <div className={`text-${step.color} mb-2 flex justify-center`}>
                {step.icon}
              </div>

              {/* Title */}
              <h3 className={`text-${step.color} font-semibold mb-2`}>
                0{index + 1} STEP
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600">{step.desc}</p>

              {/* Arrow (only for cards before last) */}
              {index !== steps.length - 1 && (
                <div className="absolute right-[-20px] top-1/2 transform -translate-y-1/2">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[10px] border-l-blue-600"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
