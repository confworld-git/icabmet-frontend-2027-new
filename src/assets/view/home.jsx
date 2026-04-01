import { PureComponent, useState } from "react";

import HeroSection from "../components/home/heroSection";
import Sdg from "../components/home/sgd";
import Welcome from "../components/home/welcome";
import PurposeOfConference from "../components/home/purposeOfTheConference";
import KeyHighlights from "../components/home/keyHighlights";
import ObjectiveConference from "../components/home/objectiveOfTheConference";
import SessionAndPapers from "../components/home/sessionTracksAndPapers";
import DeadLine from "../components/common/deadLine";
import WhyJoin from "../components/home/whyJoinUs";
import Proceedings from "../components/home/proceedingsPublications";
import Journals from "../components/home/Journals";
import LogoMarquee from "../components/home/logomarquee";
import AcademicPartner from "../components/home/academicpartner";
import CardCarousel from "../components/home/cardCarousel";
// import RegistrationSteps from "../components/RegistrationSteps.jsx";
// import { Helmet } from "react-helmet";

export default function HomePage() {
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  // const isOpenSidebar = () => {
  //   setSidebarOpen(!sidebarOpen);
  //   document.documentElement.classList.toggle("overflow-hidden");
  // };
  return (
    <div className="">
      {/* <Helmet>
        <title>
          International Conference 2026 | Medical & Biomedical Online
        </title>
        <meta
          name="description"
          content="ICLSMHA 2026 is a premier international conference on medical and biomedical research. Attend online or in person and connect with global experts."
        />
        <meta
          name="keywords"
          content="international conference 2026, medical conference online, international biomedical conference, academic conferences 2026, international conference online"
        />
        <meta name="google-site-verification" content="QbRx1ZRJYxMm-6PKuZrRRAtJrTpkgkNQi8ih0tUvI34" />
        <link rel="canonical" href="https://iclsmha.cerada.in/" />
        <meta name="robots" content="index, follow" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Event",
                "@id": "https://iclsmha.cerada.in/#event",
                name: "International Conference on Life Sciences and Multidisciplinary Healthcare Approaches (ICLSMHA-2026)",
                alternateName: "ICLSMHA-2026",
                url: "https://iclsmha.cerada.in/",
                description:
                  "Explore international research conferences 2026, academic and medical conferences online. Join global experts advancing healthcare and innovation.",
                startDate: "2026-05-14T13:00:00+08:00",
                endDate: "2026-05-15T13:00:00+08:00",
                duration: "P2D",
                eventStatus: "https://schema.org/EventScheduled",
                eventAttendanceMode:
                  "https://schema.org/OfflineEventAttendanceMode",
                inLanguage: "en",
                keywords: [
                  "life sciences",
                  "healthcare",
                  "medical conference",
                  "research",
                  "multidisciplinary",
                ],
                location: {
                  "@type": "Place",
                  name: "Manila Conference Center",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "TBD",
                    addressLocality: "Manila",
                    addressRegion: "Metro Manila",
                    addressCountry: "PH",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: 14.5995,
                    longitude: 120.9842,
                  },
                },
                offers: {
                  "@type": "Offer",
                  name: "Early Bird Registration",
                  description: "Registration starts from $99 USD",
                  price: "99.00",
                  priceCurrency: "USD",
                  availability: "https://schema.org/InStock",
                  url: "https://iclsmha.cerada.in/registration-fees",
                  validFrom: "2025-08-28T00:00:00+08:00",
                  validThrough: "2026-05-13T23:59:59+08:00",
                },
                organizer: {
                  "@type": "Organization",
                  name: "ConfWorld",
                  url: "https://confworld.org/",
                  sameAs: ["https://confworld.org/"],
                  contactPoint: {
                    "@type": "ContactPoint",
                    telephone: "+1-XXX-XXX-XXXX",
                    contactType: "customer service",
                    email: "info@confworld.org",
                  },
                },
                about: [
                  {
                    "@type": "Thing",
                    name: "Life Sciences",
                  },
                  {
                    "@type": "Thing",
                    name: "Healthcare",
                  },
                  {
                    "@type": "Thing",
                    name: "Medical Research",
                  },
                ],
                audience: {
                  "@type": "Audience",
                  audienceType:
                    "Healthcare Professionals, Researchers, Academics",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "@id": "https://confworld.org/#organization",
                name: "ConfWorld",
                url: "https://confworld.org/",
                description:
                  "Leading organizer of international academic and research conferences",
                foundingDate: "2020",
                knowsAbout: [
                  "Conference Organization",
                  "Academic Events",
                  "Research Symposiums",
                ],
              },
            ]),
          }}
        />
      </Helmet> */}

      <HeroSection />

      <LogoMarquee />
      {/* <AcademicPartner/> */}
      <Welcome />
      <CardCarousel/>
      {/* <PurposeOfConference /> */}
      <KeyHighlights />
      {/* <ObjectiveConference /> */}
      <SessionAndPapers />
      <DeadLine />
      <WhyJoin />
      {/* <RegistrationSteps /> */}
      <Proceedings />
      <Journals />
    </div>
  );
}
