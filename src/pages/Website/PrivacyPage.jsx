import React, { useState } from "react";
import WebsiteLayout from "../../Layouts/Website";
import { SlLocationPin } from "react-icons/sl";
import TOPBAR from "./../../assets/bar_right.png";
import BOTTOM from "./../../assets/bottom.png";
import BUSS from "./../../assets/buss.png";

import Img1 from "./../../assets/1.png";
import Img2 from "./../../assets/2.png";
import Img3 from "./../../assets/3.png";
import Img4 from "./../../assets/4.png";

import OP1 from "./../../assets/op1.svg";
import OP2 from "./../../assets/op2.svg";
import OP3 from "./../../assets/op3.svg";
import Delivery from "./../../assets/delivery.svg";
import ANIMATION from "./../../assets/animation.gif";
import { LuCircleArrowDown, LuCircleArrowUp } from "react-icons/lu";
import AosWrapper from "../../Layouts/AOS";

import Slider from "./Slider";
import { useNavigate } from "react-router-dom";

const PrivacyPage = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const onsubmit = (e) => {
    e.preventDefault();
    const value = {
      from,
      to,
    };
    localStorage.setItem("location", JSON.stringify(value));
    navigate("/request/form/step/1");
  };
  return (
    <WebsiteLayout>
      <AosWrapper>
        <div className="container_custom terms_data">
        <h2 className="font-bold text-4xl mb-8">Privacy policy</h2>
          <div class="container markdown">
            <p>
              We protect your personal data well. Brenger B.V. (
              <strong>Brenger</strong>) respects your privacy and personal life
              but Brenger sometimes needs your personal information. In this
              statement you can read how we store, protect and process your
              data. This privacy statement applies to our website www.brenger.nl
              (the <strong>Website</strong>) and the services we offer (the{" "}
              <strong>Services</strong>).
            </p>

            <p>
              <strong>Personal data</strong>
            </p>

            <p>
              In the relevant privacy legislation (from 28 May 2018: the General
              Data Protection Regulation, also known as AVG or GDPR) a piece of
              data is considered “<strong>personal data</strong>” when it
              “contains information or pieces of information, with which a
              person can be directly or indirectly identified”. Since this
              definition is very broad, it covers many types of information. For
              example, the European Court has ruled that even dynamic IP
              addresses can be considered as personal data under certain
              circumstances.
            </p>

            <p>
              Some data processed through our services qualify as personal data.
            </p>

            <p>
              <strong>Data security</strong>
            </p>

            <p>
              We are committed to protecting your personal information from
              loss, destruction, use, alteration or disclosure of your personal
              information by unauthorized persons. We do this, for example, with
              Secure Socket Layer (SSL). This means that those who have nothing
              to do with your data cannot access it. We also limit the access to
              personal data by employees to the minimum necessary. Employees
              only have access to personal data on a need-to-know basis.
            </p>

            <p>
              <strong>Minors</strong>
            </p>

            <p>
              We do not offer our Services and Website to anyone under the age
              of 18.
            </p>

            <p>
              <strong>
                What personal data do we process and for what purposes?
              </strong>
            </p>

            <p>
              Your personal data may be stored at various times, such as when
              you visit our Website, create a personal account on our Website,
              use our services or contact us. We may process the following
              personal data:
            </p>

            <ul class="wp-block-list">
              <li>Name and address details</li>

              <li>Contact details (email address and telephone number)</li>
            </ul>

            <p>
              When you carry out assignments as a courier for Brenger and you
              install our app (Brenger for Couriers), we ask you to share your
              location from the app, even if the app is still active in the
              background. We do this to share your location with the customer of
              the transport you (the courier) are carrying out. We will share
              your location from 1 hour before you indicate you wish to collect
              the goods until you have marked the goods as delivered (or up to 2
              hours after the end of the period in which you would have
              delivered the goods, if you do not mark them as delivered ).
              <br />
              We collect your location data and app activities for geographic
              and activity analyses. This ensures that we can make improvements
              to coordinate the number of transport requests and active
              couriers, we can inform you about potentially interesting
              assignments in your area and we can realize other app
              improvements.
            </p>

            <p>
              We store and process your personal data to provide, improve and
              protect our services and to manage your personal account.
              Sometimes we will use your personal information to send you
              important information, such as a change in our terms and
              conditions or privacy statement.
            </p>

            <p>
              <strong>Feedback and Surveys</strong>
              <br />
              Occasionally, we use your contact information to send you surveys
              or requests for feedback regarding your experiences with our
              services. This helps us improve our offerings. You can opt out of
              receiving such requests at any time by following the instructions
              in the respective communication or by contacting us directly.
            </p>

            <p>
              <strong>Why are we allowed to process your personal data?</strong>
            </p>

            <p>
              We are allowed to process personal data because you have given us
              your unambiguous consent when registering on our Website and
              entering the data into your account. We may also process certain
              personal data to be able to perform our Services. We share the
              client’s details with the courier who will carry out that
              transport and we share the courier’s details with the customer for
              whom the courier will carry out the transport.
            </p>

            <p>
              <strong>Do we share your personal data with others?</strong>
            </p>

            <p>
              We use external services that process certain personal data on our
              behalf (Processors). These Processors only process the personal
              data according to our instructions and never for their own
              purposes. We have a data processing agreement
              (bewerkersovereenkomst) in place with all our Processors, in which
              they promise to properly protect the data.
            </p>

            <p>For example, we use the following processors:</p>

            <ul class="wp-block-list">
              <li>Mailchimp (to send notification emails and newsletters)</li>

              <li>Redash (for internal data analysis)</li>

              <li>Google Big Query (for internal data analysis)</li>

              <li>Pipedrive (for internal data analysis)</li>

              <li>
                Aircall (we link telephone numbers to Aircall so that we can see
                via Aircall which customer is calling us)
              </li>

              <li>
                Freshdesk (we link phone numbers to Freshdesk so that we can see
                through Freshdesk which customer is calling us)
              </li>

              <li>AWS (this is our hosting company)</li>

              <li>Sentry (to keep us informed of errors on the website)</li>

              <li>
                We use Microsoft Clarity and Hotjar to improve our understanding
                of user behavior and to optimize our website. Data is collected
                using cookies and other technologies, including device type,
                browser information, and geographic location. Hotjar and
                Microsoft store this information in a pseudonymized user profile
                and are contractually prohibited from selling this data. For
                more information on how this data is used, please refer to the
                privacy statements of Microsoft and Hotjar.
              </li>

              <li>Fountain (for admitting new couriers to our platform)</li>

              <li>
                Supplied (for personal verification and turnover reporting
                according to European DAC-7 legislation)
              </li>

              <li>
                CreAim (for submitting turnover reports to the Dutch, Belgian
                and German tax authorities).
              </li>
            </ul>

            <p>
              We also use pixels on our Website. These pixels are only enabled
              once you agree to our cookie terms or click beyond the landing
              page. These pixels ensure that we can show you targeted
              advertisements on other websites. The data about your surfing and
              clicking behaviour that we collect is also shared with the
              providers of the pixels. These are:
            </p>

            <ul class="wp-block-list">
              <li>
                Facebook (we have their pixel on our website so that we can
                target audiences similar to our website visitors on Facebook
                with advertisements)
              </li>

              <li>
                Google (we have their pixel on our website so that we can target
                audiences similar to our website visitors on Google with
                advertisements)
              </li>

              <li>
                Microsoft (we have their pixel on our website so that we can
                target audiences similar to our website visitors on Bing with
                advertisements)
              </li>

              <li>
                Pinterest (we have their pixel on our website so that we can
                target audiences similar to our website visitors on Pinterest
                with ads)
              </li>

              <li>
                Billy Grace (we utilize Billy Grace for enhanced analytics and
                targeting to further understand user interactions and optimize
                marketing strategies on our platform).
              </li>
            </ul>

            <p>
              <strong>Transfer outside the EU</strong>
            </p>

            <p>
              We may transfer personal data to parties outside the European
              Union if one of our Processors is located outside the EU. The
              personal data will only be transferred to countries and/or parties
              that offer an adequate level of protection that meets European
              standards. Among other things, we will check whether an
              organization outside the EU is on the Privacy Shield List and
              whether the protection level of the third country has been
              approved by the European Commission.
            </p>

            <p>
              The transfer of data outside the EU will always take place in
              accordance with the relevant privacy legislation (such as Article
              76 paragraph 1 of the Personal Data Protection Act – replaced by
              Chapter 5 of the GDPR on 25 May 2018).
            </p>

            <p>
              <strong>Retention periods</strong>
            </p>

            <p>
              We delete your personal data as soon as it is no longer necessary
              for the purposes for which we collected them. This means that we
              will keep the personal data for as long as you have an account
              with us. After that, we will delete your personal data after one
              month. We will send an email to inactive users after one year with
              the option to cancel the account.
            </p>

            <p>
              We will only keep personal data longer than mentioned here if we
              are legally obliged to do so.
            </p>

            <p>
              <strong>Links</strong>
            </p>

            <p>
              Our Website may contain links to other websites. We are not
              responsible for the content or privacy protection of these
              websites. Therefore, we advise you to always read the privacy
              statement of the relevant website.
            </p>

            <p>
              <strong>Cookies</strong>
            </p>

            <p>
              A cookie is a small text file that is sent to the browser via a
              site’s server. The browser then saves the file on your device.
              Your device will receive a unique number, with which our site will
              recognise the device later.
            </p>

            <p>
              We may use cookies to improve your experience on our Website.
              Cookies also ensure, among other things, that the Website is fast,
              that you can visit our Website safely and that we can detect
              errors on our Website.
            </p>

            <p>
              You can always delete or disable cookies yourself via the browser
              settings. You will then no longer receive cookies while browsing
              our site. But please note: our site does not work as well without
              cookies.
            </p>

            <p>
              You can read more about the cookies we use in our cookie
              statement:{" "}
              <a href="https://www.brenger.nl/en-nl/cookies">
                Cookie conditions Brenger
              </a>
            </p>

            <p>
              <strong>Your rights as a data subject</strong>
            </p>

            <p>
              As described in the relevant privacy legislation, you have the
              right to:
            </p>

            <ul class="wp-block-list">
              <li>Request us to correct or update your information;</li>

              <li>
                Request us to remove your data from our database, without giving
                reasons;
              </li>

              <li>
                Request us to provide a copy of any personal data we have
                processed about you. We can also forward this copy to another
                data controller at your request;
              </li>

              <li>
                To withdraw your consent to the processing of your data. This
                does not affect the validity of the processing before the moment
                you withdraw your consent;
              </li>

              <li>Object to the processing of your data with us;</li>

              <li>
                Submit a complaint to the Dutch Data Protection Authority if you
                believe that we are processing your data unlawfully.
              </li>
            </ul>

            <p>
              You can also view, change or delete your personal data yourself by
              logging in to your account.
            </p>

            <p>
              <strong>Changes to this privacy statement</strong>
            </p>

            <p>
              Brenger can adjust this privacy statement. We will notify users
              who have registered with us with their email address of any
              changes. If you are not registered as a user, we recommend that
              you consult this statement regularly.
            </p>

            <p>
              <strong>Questions?</strong>
            </p>

            <p>
              If you have any questions or comments about our privacy statement,
              you can contact us using the details below.
            </p>

            <p>
              <strong>Koerier Platform B.V.</strong>
            </p>

            <p>Vossiusstraat 3, 1071 AB Amsterdam</p>

            <p>info@koerierplatform.nl</p>

            <p>www.koerierplatform.nl</p>
          </div>
        </div>
      </AosWrapper>
    </WebsiteLayout>
  );
};

export default PrivacyPage;
