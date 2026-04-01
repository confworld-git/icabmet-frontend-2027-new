import React, { useState } from "react";
import { Check } from "lucide-react";
import Hero from "../commonhero/common-hero";

const CorporateCards = () => {
  const [open, setOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // success / error message

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    organization: "",
    designation: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
    sponsorshipType: "",
    sponsorshipPrice: "",
  });

  const sponsorshipTiers = [
    {
      title: "Platinum",
      price: "$14,000",
      color: "from-purple-600 to-purple-800",
      borderColor: "border-purple-500",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
      features: [
        "1 VIP can participate in the conference",
        "Complementary registration for 12 Students and 5 Faculties",
        "Stage honor to the Sponsor Party",
        "Full Page ad on the conference proceedings",
        "Brand carried in all the websites and promotional activities",
        "Event called by title sponsor",
        "Global networking opportunities",
        "Media Coverage",
        "3 Feedback video bites featured on YouTube channel",
        "A standee of the sponsor side on the registration desk",
      ],
    },
    {
      title: "Diamond",
      price: "$12,000",
      color: "from-blue-600 to-blue-800",
      borderColor: "border-blue-500",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      features: [
        "1 Session Chair opportunity from the sponsor side",
        "Complementary registration for 10 Students and 3 Faculties",
        "Full Page ad on the conference proceedings",
        "Brand carried in all the websites and promotional activities",
        "Public announcement recognizing the Sponsor",
        "Global networking opportunities ",
        "Logo used on all website activities and campaigns",
        "5 minutes slot for media Coverage",
        "2 Feedback videos featured on the YouTube channel",
        "A standee of the sponsor side on the registration desk",
      ],
    },
    {
      title: "Gold",
      price: "$10,000",
      color: "from-yellow-500 to-yellow-700",
      borderColor: "border-yellow-500",
      buttonColor: "bg-yellow-600 hover:bg-yellow-700",
      features: [
        "Complementary registration for 8 Students and 2 Faculties",
        "Full page ad on conference proceedings",
        "Announcement recognition of the sponsor during valedictory",
        "Logos used in all promotional materials",
        "One anchor/moderator can join from the sponsor side",
        "Global networking opportunities ",
        "A standee of the sponsor side on the registration desk",
      ],
    },
    {
      title: "Silver",
      price: "$7,500",
      color: "from-gray-500 to-gray-700",
      borderColor: "border-gray-500",
      buttonColor: "bg-gray-600 hover:bg-gray-700",
      features: [
        "Complementary registration for 5 Students and 1 Faculty",
        "2 facilitators at the registration desk from the sponsor side",
        "Half page ad on Conference proceedings",
        "Brand carried out in few promotional activities",
        "Global networking opportunities",
        "Print media coverage",
      ],
    },
  ];

  const handleClickOpen = (tier) => {
    setSelectedTier(tier.title);
    setFormData((prev) => ({
      ...prev,
      sponsorshipType: tier.title,
      sponsorshipPrice: tier.price,
    }));
    setMessage("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTier(null);
    setMessage("");
    setFormData({
      fullName: "",
      email: "",
      organization: "",
      designation: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phone: "",
      sponsorshipType: "",
      sponsorshipPrice: "",
    });
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Basic client-side sanity check (required fields)
    const required = ["fullName", "email", "organization", "designation", "address", "city", "state", "zipCode", "country", "phone", "sponsorshipType", "sponsorshipPrice"];
    for (const key of required) {
      if (!formData[key]?.toString().trim()) {
        setMessage(`Please fill ${key}`);
        setLoading(false);
        return;
      }
    }

    try {
      
      const res = await fetch(`${import.meta.env.VITE_API_URL}/sponsor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Sponsor Details saved successfully.");
        // optionally show saved sponsor id or details: data.sponsor
        setTimeout(() => handleClose(), 1200);
      } else {
        setMessage(data.errorMessage || "Failed to submit sponsor form.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setMessage("Network / server error while submitting form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <Hero 
              title="Exhibits and Sponsors" 
              breadcrumbs={[{ label: 'Home', link: '#' }]}
              backgroundImage="/images/commonheroimages/commonhero15.webp"
       />
       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 pb-16 px-4 pt-12">
      <div className="w-full">
        
        
        

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sponsorshipTiers.map((tier) => (
            <div key={tier.title} className={`relative bg-white rounded-2xl shadow-xl border-2 ${tier.borderColor} hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full`}>
              <div className={`bg-gradient-to-r ${tier.color} p-8 text-white text-left`}>
                <div className="inline-block rounded-xl border-2 border-white/30 px-4 py-2 mb-4 bg-white/10 backdrop-blur-sm">
                  <h3 className="text-xs font-semibold uppercase tracking-widest opacity-90">Sponsorship</h3>
                </div>
                <h2 className="text-3xl font-bold mb-3">{tier.title}</h2>
                <div className="text-4xl font-bold">{tier.price}</div>
              </div>

              <div className="p-8 flex-grow">
                <ul className="space-y-4">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-emerald-500 mr-4 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 leading-relaxed font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 pt-0 mt-auto">
                <button
                  className={`w-full ${tier.buttonColor} cursor-pointer text-white font-bold py-4 px-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-1 text-sm uppercase tracking-wide`}
                  onClick={() => handleClickOpen(tier)}
                >
                  Choose {tier.title}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {open && (
          <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 pt-20 px-4">
            <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full p-6 relative">
              <button onClick={handleClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">✖</button>

              <h2 className="text-2xl font-bold text-teal-600 mb-4 text-center">
                Sponsor Registration — {formData.sponsorshipType} ({formData.sponsorshipPrice})
              </h2>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required className="border rounded-lg p-3 w-full" />
                <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required className="border rounded-lg p-3 w-full" />

                <input name="organization" value={formData.organization} onChange={handleChange} placeholder="Organization" required className="border rounded-lg p-3 w-full" />
                <input name="designation" value={formData.designation} onChange={handleChange} placeholder="Designation" required className="border rounded-lg p-3 w-full" />

                <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" required className="border rounded-lg p-3 w-full md:col-span-2" />

                <input name="city" value={formData.city} onChange={handleChange} placeholder="City" required className="border rounded-lg p-3 w-full" />
                <input name="state" value={formData.state} onChange={handleChange} placeholder="State" required className="border rounded-lg p-3 w-full" />

                <input name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="Zip Code" required className="border rounded-lg p-3 w-full" />
                <input name="country" value={formData.country} onChange={handleChange} placeholder="Country" required className="border rounded-lg p-3 w-full" />

                <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Mobile Number (+country code)" required className="border rounded-lg p-3 w-full md:col-span-2" />

                {/* Hidden/read-only fields for tier & price (makes it explicit) */}
                <input name="sponsorshipType" value={formData.sponsorshipType} readOnly className="hidden" />
                <input name="sponsorshipPrice" value={formData.sponsorshipPrice} readOnly className="hidden" />

                <div className="md:col-span-2 flex justify-end gap-4 mt-2">
                  <button type="button" onClick={handleClose} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
                  <button type="submit" disabled={loading} className="px-6 py-3 rounded bg-teal-600 hover:bg-teal-700 text-white font-bold">
                    {loading ? "Submitting..." : "Submit Sponsorship"}
                  </button>
                </div>
              </form>

              {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
    </section>
    
  );
};

export default CorporateCards;


