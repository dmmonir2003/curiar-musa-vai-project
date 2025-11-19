import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Login,
  Signup,
  ForgotPassword,
  OTPCode,
  ResetPassword,
} from "./pages/Auth";
import {
  DashboardUser,
  MyRequests,
  UpdateProfile,
  CustomerSupport,
  Chat,
  NewJobs,
  MyShipments,
  More,
  Reviews,
  NewJobsOld,
  DailyRoutes,
} from "./pages/User";
import {
  LandingPage,
  Step1,
  Step2,
  Step3,
  Step4,
  Step5,
  Step6,
  TermsPage,
  PrivacyPage,
  ContactUs,
  CourierSignup,
  Howhetwerkt,
  Prices,
  OverKoerier,
  Blog,
  BlogDetail,
  Categories,
  Duurzaamheid,
  Vertrouwen,
  Wordbrenger,
} from "./pages/Website";
import VerifyEmail from "./pages/Verify-Email";
import CourierLogin from "./pages/Auth/CourierLogin";
import PaymentSuccess from "./Components/PaymentSuccess";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login/user" element={<Login />} />
      <Route path="/login/courier" element={<CourierLogin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/otp" element={<OTPCode />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email/:token" element={<VerifyEmail />} />
      <Route path="/dashboard" element={<DashboardUser />} />
      <Route path="/my-requests" element={<MyRequests />} />
      <Route path="/jobs" element={<NewJobs />} />
      //TODO: working now as accept-job and showing jobs
      <Route path="/jobs-old" element={<NewJobsOld />} />
      <Route path="/update-profile" element={<UpdateProfile />} />
      <Route path="/customer-support" element={<CustomerSupport />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/my-shipments" element={<MyShipments />} />
      <Route path="/more" element={<More />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/daily-routes" element={<DailyRoutes />} />
      <Route path="/request/form/step/1" element={<Step1 />} />
      <Route path="/request/form/step/2" element={<Step2 />} />
      <Route path="/request/form/step/3" element={<Step3 />} />
      <Route path="/request/form/step/4" element={<Step4 />} />
      <Route path="/request/form/step/5" element={<Step5 />} />
      <Route path="/request/form/step/6" element={<Step6 />} />
      <Route path="/privacy-policy" element={<PrivacyPage />} />
      <Route path="/general-terms" element={<TermsPage />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/courier-signup" element={<CourierSignup />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/hoe-het-werkt" element={<Howhetwerkt />} />
      <Route path="/prijzen" element={<Prices />} />
      <Route path="/over-koerier" element={<OverKoerier />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog-detail/:id" element={<BlogDetail />} />
      <Route path="/categories/:slug" element={<Categories />} />
      <Route path="/duurzaamheid" element={<Duurzaamheid />} />
      <Route path="/vertrouwen-en-veiligheid" element={<Vertrouwen />} />
      <Route path="/wordbrenger" element={<Wordbrenger />} />
      {/* <Route path="/blog-detail" element={<BlogDetail />} /> */}
      {/* <Route path="/blog-detail" element={<BlogDetail />} /> */}
      {/* <Route path="/blog-detail" element={<BlogDetail />} /> */}
      {/* <Route path="/blog-detail" element={<BlogDetail />} /> */}
      {/*  <Route path='/chat' element={<ProtectedRoute><Chat /></ProtectedRoute>} />
       <Route path='/profile/:slug' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
       <Route path='/my/games' element={<ProtectedRoute><Games /></ProtectedRoute>} />
       <Route path='/game/:slug' element={<GameDetails />} />
       <Route path='/verify-email/:token' element={<VerifyEmail />} /> */}
    </Routes>
  );
};

export default App;
