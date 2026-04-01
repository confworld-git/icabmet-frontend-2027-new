// App.jsx - Corrected and Optimized
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout";

// Pages
import HomePage from "./assets/view/home";
import AboutIcabmet from "./assets/view/about/aboutIcabmet"
import AboutOrganizer from "./assets/view/about/aboutOrganizer";
import SessionTracksPaper from "./assets/view/sessionTracksPaper/sessionTtracksCallForPaper";
import SubmissionGuideline from "./assets/view/submissionGuidelines/submissionGuidelines";
import Publication from "./assets/view/publication/publication";
import AbstractFullPaperSubmission from "./assets/view/submissionGuidelines/abstractFullPaperSubmissionPage";
import EssentialDownload from "./assets/view/essentialDownload/essentialDownloadPage";
import RegistrationFee from "./assets/view/registration/RegistrationFee";
import AvailablePayments from "./assets/view/registration/AvailablePayments";
import Success from "./assets/components/Success/Success";
import OCMFormPage from "./assets/view/about/ocm-form-page";
import RegistrationInstructions from "./assets/view/registration/RegistrationInstructions";
import TermsandConditions from "./assets/view/registration/TermsandConditions";
import FAQ from "./assets/view/faq/faq";
import Venue from "./assets/view/venue/Venue";
import Contactus from "./assets/view/contact-us/Contact-us";
import Speakers from "./assets/view/speakers/Speakers";
import Sponsors from './assets/view/sponsors/Sponsors'
import OrganizingCommitteeMembers from "./assets/view/speakers/OrganizingCommitteeMembers";
import Login from "./assets/view/login/Login";
import Protected from "./assets/view/protected/Protected";
import CertificateGenerator from "./assets/view/certificate/Certificategenerator";

// {/* dashboard */}
import DashboardLayout from "./assets/view/dashboard/Dashboard_Layout/DashboardLayout";
import Dashboard from "./assets/view/dashboard/Dashboard";
import DRegistration from "./assets/view/dashboard/registration/Registration";
import DSpeakers from "./assets/view/dashboard/speakers/Speakers";
import DSubmission from "./assets/view/dashboard/submission/Submission";
import DCommitteeMember from "./assets/view/dashboard/Committee_Member/CommitteeMember";
import DContact from "./assets/view/dashboard/contact/Contact";
import DDownload from "./assets/view/dashboard/download/Download";
import DEnquiry from "./assets/view/dashboard/enquiries/Enquiries";
import CouponManagement from "./assets/view/dashboard/couponManagement";
// import {Helmet} from 'react-helmet'


// (Optional future pages - placeholders)
// import Login from "./assets/view/auth/Login";
// import Dashboard from "./assets/view/dashboard/Dashboard";
// import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
    {/* <Helmet>
      <title>International Research Conferences 2026 | Global Events</title>
      <meta name="description" content="Explore international research conferences 2026, academic and medical conferences online. Join global experts advancing healthcare and innovation." />
      <meta name="keywords" content="international conference, international conference 2026, medical conference online, international conference online, research conferences 2026, academic conferences 2026" />
      <link 
          rel="canonical" 
          href="https://iclsmha.cerada.in/" 
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="ICLSMHA 2026 - International Conference on Life Sciences" />
        <meta property="og:description" content="Join ICLSMHA 2026 in Manila or online. A premier platform for global healthcare, medical & life sciences research." />
        <meta property="og:url" content="https://iclsmha.cerada.in/" />
        <meta property="og:site_name" content="ICLSMHA 2026" />
        <meta property="og:locale" content="en_US" />

    </Helmet> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Homepage */}
          <Route index element={<HomePage />} />

          {/* About Pages */}
          <Route path="about-icabmet" element={<AboutIcabmet />} />
          <Route path="about-organizer" element={<AboutOrganizer />} />
          <Route path="speakers" element={<Speakers/>} />
          <Route
            path="organizing-committee-member"
            element={<OrganizingCommitteeMembers/>}
          />
          <Route
            path="organizing-committee-member-form"
            element={<OCMFormPage />}
          />
          <Route
            path="certificate"
            element={<CertificateGenerator/>}
          />

          {/* Session Tracks */}
          <Route
            path="session-tracks-call-for-papers"
            element={<SessionTracksPaper />}
          />
          <Route path="essential-download" element={<EssentialDownload />} />

          {/* Paper Submission */}
          <Route
            path="submission-guidelines"
            element={<SubmissionGuideline />}
          />
          
          <Route
            path="abstract-full-paper-submission"
            element={<AbstractFullPaperSubmission />}
          />
          <Route path="publication" element={<Publication />} />

          {/* Registration */}
          <Route path="registration-fees" element={<RegistrationFee />} />
          <Route path="available-payments" element={<AvailablePayments />} />
          <Route
            path="registration-instruction"
            element={<RegistrationInstructions />}
          />
          <Route path="terms-and-conditions" element={<TermsandConditions />} />
          <Route path="payment-details-success" element={<Success />} />

          {/* Other Pages */}
          <Route path="sponsors" element={<Sponsors/>} />
          <Route path="faq" element={<FAQ />} />
          <Route path="venue" element={<Venue />} />
          <Route path="contact-us" element={<Contactus />} />

          <Route
            path="*"
            element={
              <div className="p-4 text-center text-red-600 text-xl">
                404 - Page not found
              </div>
            }
          />
        </Route>
        {/* Dashboard */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Protected />}>
          <Route path="/Dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="Registration" element={<DRegistration />} />
            <Route path="Speakers" element={<DSpeakers />} />
            <Route path="Submission" element={<DSubmission />} />
            <Route path="CommitteeMember" element={<DCommitteeMember />} />
            <Route path="Contact" element={<DContact />} />
            <Route path="Downloads" element={<DDownload />} />
            <Route path="Enquiries" element={<DEnquiry />} />
            <Route path="CouponManagement" element={<CouponManagement />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
