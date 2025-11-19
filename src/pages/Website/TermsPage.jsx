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

const TermsPage = () => {
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
          <section class="theme--white section-space--y--25 mt-[120px]">
            <h2 className="font-bold text-4xl mb-8">General Terms and Conditions for Client</h2>
            <div class="container markdown">
              <p>
                These General Terms and Conditions (the Client Terms and
                Conditions) apply to every use of the website www.brenger.nl
                (the Website), and any subdomains, by Users acting in the
                capacity of Client. The Client Terms and Conditions also apply
                to all the services that are offered by us to Users acting in
                the capacity of Client. The Website is a platform for sending
                and transporting goods to and from private individuals and SMEs.
                The Website connects people who want to send something with
                people who want to transport something, offers insurance for the
                transport against damage and theft (up to €500,-), facilitates
                and guarantees payment, and verifies users to increase the
                reliability of the platform (the Service). Brenger B.V.
                (Brenger) can change the Client Terms and Conditions at any
                time. By using the Website, you agree that the latest version of
                the Client Terms and Conditions will always apply. Brenger must
                accept agreements that deviate from the Client Terms and
                Conditions in writing before they become valid.
              </p>

              <p>
                <strong>Article 1 – General</strong>
              </p>

              <p>
                The Client Terms and Conditions apply to persons who use the
                Website to place orders for the transportation of goods
                (Clients). Clients are also generally referred to as ‘Users’.
              </p>

              <p>
                At your request, Brenger will send you the Client Terms and
                Conditions without charge. The Client Terms and Conditions are
                also available on www.brenger.nl.
              </p>

              <p>
                If any part of the Client Terms and Conditions is void or
                voidable, this will not affect the validity of the remainder of
                the Client Terms and Conditions. The void or voided part will be
                replaced by a provision that aligns as far as possible with the
                content of the provision that is void.
              </p>

              <p>
                <br />
                <strong>Article 2 – Rules for using the Website</strong>
              </p>

              <p>
                You may not use the Website in such a way that you violate Dutch
                or other applicable legislation or regulations. You may not
                distribute the following through the Website: – Pornographic
                films, images or other media with erotic content; – Texts or
                images that are offensive, racist, discriminatory or
                inflammatory; – Unsolicited advertising (spam); – Incorrect or
                misleading information; or – Viruses, malware, spyware or other
                software intended to cause damage to computers belonging to us
                or to other users. You may not create an account under someone
                else’s name or in any other way pretend to be someone else. You
                must keep the personal data obtained from other users
                confidential. In addition, you must not misuse this data. You
                may not approach any other users for purposes (commercial and
                otherwise) other than those for which the Website is intended.
                You may not place orders on the Website to send money, illegal
                goods such as weapons, drugs, etc., or dangerous, specific
                and/or perishable goods. Full responsibility and liability under
                all applicable legislation with respect to the transport of such
                goods lies with the Client. A person who arranges for such goods
                to be transported is at risk of being subject to criminal
                prosecution or other legal measures. Any fines or other damages
                arising from illegal, dangerous, specific and/or perishable
                goods for which the Client has arranged transport will be
                recovered from the Client. All communication prior to the
                execution of the Order should be conducted through the Website.
                It is therefore not permitted to exchange contact details (e.g.
                telephone numbers and e-mail addresses) through the message
                system. Orders with a collection or delivery address outside the
                Schengen Area countries will be removed from the Website. If you
                suspect a User of misusing the Website, you have an obligation
                to report this to Brenger.
              </p>

              <p>
                <strong>Article 3 – The platform</strong>
              </p>

              <p>
                The purpose of the Website is to provide a platform on which a
                transporter (the Carrier) and a client (the Client) can come
                into contact. The Carrier is prepared to transport movable goods
                (the Product) for the Client and the Client wishes to have
                movable goods transported and instructs the Carrier to do so.
                This creates a contract between the Carrier and the Client.
                Brenger and the Carrier expressly do not intend to enter into an
                employment contract within the meaning of Sections 610 et seq.
                and 690 et seq. of Book 7 of the Dutch Civil Code. Brenger and
                the Carrier explicitly wish to prevent the applicability of the
                fictitious employment relationship. Brenger is not a party to
                the contract between Carrier and Client. Brenger merely provides
                the platform and facilitates the contact between Carrier and
                Client. Brenger is not responsible for the agreements or
                fulfilment of the agreements between the Carrier and the Client.
                If a conflict arises between the Carrier and the Client, they
                themselves must resolve that conflict. Although under no
                obligation to do so, Brenger is prepared to act as mediator and
                is happy to help resolve a conflict.
              </p>

              <p>
                <strong>
                  Article 4 – The contract between Carrier and Client
                </strong>
              </p>

              <p>
                Client and Carrier conclude a contract for the transport of
                goods within the meaning of Section 20 et seq. of Book 8 of the
                Dutch Civil Code (the ‘Transport Contract’). Brenger is not a
                party to the Transport Contract concluded between Carrier and
                Client. Brenger merely provides the platform and facilitates the
                contact between the Carrier and the Client, so that they can
                enter into a Transport Contract. The Carrier decides whether to
                enter into the Transport Contract with the Client. Brenger
                provides the written records and processing of the Transport
                Contract between Carrier and Client. On behalf of the Carrier,
                Brenger handles the invoicing of the Client by the Carrier, in
                the name and for the account of the Carrier. Brenger is not
                responsible for the agreements or fulfilment of the agreements
                between the Carrier and the Client. If a conflict arises between
                the Carrier and the Client, they themselves must resolve that
                conflict. Although under no obligation to do so, Brenger is
                prepared to act as mediator and is happy to help resolve a
                conflict.
              </p>

              <p>
                <strong>Article 5 – The Order, guarantee and payment</strong>
              </p>

              <p>
                The Order placed by the Client with the Carrier is concluded as
                soon as the Client has paid in advance through the Website and
                the Carrier has indicated that he or she wishes to carry out the
                Order that has been placed. Orders within the Netherlands and
                Flanders are guaranteed to be executed within 3 working days.
                Should there be no courier able to transport the Order on his or
                her route, we will carry out the Order ourselves in order to
                offer this guarantee.
              </p>

              <p>
                Some transports are&nbsp;not guaranteed.&nbsp;These transport
                requests cannot be paid for in advance and are not covered by
                our&nbsp;damage insurance:
              </p>

              <ul class="wp-block-list">
                <li>
                  The transport contains one or more items larger than
                  400x180x160 cm;
                </li>

                <li>The total volume of the transport is greater than 5 m³;</li>

                <li>The total weight of the item(s) is more than 200 kg;</li>

                <li>The transport is to a waste station;</li>

                <li>It involves food;</li>

                <li>It involves a trailer or piano;</li>

                <li>It involves an organism (plants/animals);</li>

                <li>
                  The transport is outside the standard transport area: the
                  Netherlands (excluding the Wadden Islands), Belgium, and
                  Germany.
                </li>
              </ul>

              <p>
                Following payment, the Client will receive a confirmation of
                payment by e-mail.
              </p>

              <p>
                After the Client has paid, an e-mail is sent to the Carrier to
                say that his or her offer has been accepted. The Carrier then
                collects the Product at the agreed date and the agreed time.
                Once the Product has been delivered by the Carrier and receipt
                has been confirmed by the Client (or has been tacitly accepted
                24 hours after confirmation of delivery by the Carrier), the
                Carrier will be paid.
              </p>

              <p>
                If the Carrier accepts the Order, he or she thereby accepts full
                responsibility for the proper execution of the Order.
              </p>

              <p>
                The Carrier organises his or her work independently and is
                completely independent in carrying out the Order. The Carrier
                will execute the Order at his or her discretion and without
                supervision or management by Brenger and/or the Client. The
                Client and/or Brenger can make suggestions and give instructions
                with respect to the result of the Order.
              </p>

              <p>
                The Client accepts that all Orders concluded through the Website
                are subject to the transport agreement, as offered by Brenger to
                the Client when the Client accepts an offer from a Carrier (the
                Transport Contract). The Client has to accept this Transport
                Contract before the Carrier can be accepted.
              </p>

              <p>
                Brenger and the Client explicitly agree that the Carrier can
                also carry out orders for other Clients.
              </p>

              <p>
                The Client is responsible for providing correct and complete
                information regarding the Order.
              </p>

              <p>
                The price of the Order shall be paid through Mollie Payments
                B.V., which collects payments on behalf of the Carrier.
              </p>

              <p>
                Payment to the Carrier is made as set out in these Client Terms
                and Conditions, after deduction of the fee to Brenger.
              </p>

              <p>
                The prices for the Service are listed on the Website. The Client
                pays Brenger 13% of the total price of the Service. The Carrier
                pays Brenger 8.7% of the total price paid by the Client.
              </p>

              <p>
                Brenger can change the prices of the Service without prior
                notice. The applicable price is the price as given on the
                Website. No rights can be derived from previous prices.
              </p>

              <p>All prices for the Service on the Website include VAT.</p>

              <p>
                <br />
                <strong>Article 6 – The Client and payment</strong>
              </p>

              <p>
                If the situation for collection differs from that indicated by
                the Client in the Order placed, and is not by the front door on
                the ground floor, the Carrier has the right not to take the
                Product. If the Carrier does not collect the Product for this
                reason, the Carrier will receive half of the agreed payment
                (excluding the fee for Brenger) as a call-out fee. The Client
                will be refunded the other half of the agreed payment (excluding
                the fee for Brenger). The Carrier should telephone Brenger
                before leaving the collection location.
              </p>

              <p>
                The Client is responsible for ensuring that the contact person
                for the collection address is present at the collection address
                between the agreed collection time and 15 minutes thereafter. If
                the contact person for the collection address is not at the
                collection address between the agreed collection time and 15
                minutes thereafter, the Carrier has the right not to take the
                Product, after telephoning Brenger. However, the Carrier is
                obliged to telephone the contact person for the collection
                address at least twice if no one is there. In this case, the
                Carrier will receive half of the agreed payment (excluding the
                fee for Brenger) as a call-out fee. The Client will be refunded
                the other half of the agreed payment (excluding the fee for
                Brenger).
              </p>

              <p>
                If the Carrier has a reasonable suspicion that the Product
                consists of one or more illegal goods, such as weapons, drugs,
                etc., and/or goods that may pose a danger to persons or
                property, then the Carrier has the right not to take the
                Product. The Carrier makes this decision at his or her
                discretion, without supervision or management by Brenger. In
                such a case, the Carrier can contact Brenger for a non-binding
                consultation.
              </p>

              <p>
                If the contact person for the delivery address or the Client
                does not confirm within 24 hours after the agreed delivery time
                that the Product has arrived, Brenger will assume that the
                Product has been delivered and the Carrier will be paid.
              </p>

              <p>
                Once the Product has been delivered by the Carrier and receipt
                has been confirmed by the Client (or has been tacitly accepted
                24 hours after confirmation of delivery by the Carrier), the
                Carrier will be paid within 5 working days.
              </p>

              <p>
                If the contact person for the delivery address or the Client
                states within 24 hours after confirmation of delivery by the
                Carrier that the Product has not been delivered, Brenger will
                investigate whether this is actually the case. If it is actually
                the case, no payment will be transferred to the Carrier.
              </p>

              <p>
                The Client may cancel the Order up to 60 hours before the agreed
                collection time. In this case, the Carrier will not receive any
                payment. The Client will be refunded the full amount, excluding
                the fee for Brenger.
              </p>

              <p>
                In the event of the Client cancelling within 24-60 hours before
                the agreed collection time, the Carrier is entitled to half of
                the agreed payment. The Client will be refunded the other half
                of the payment, excluding the fee for Brenger. In the event of
                the Client cancelling within 24 hours before the agreed
                collection time, the Carrier is entitled to 75% of the agreed
                payment. The Client will be refunded 25% of the payment,
                excluding the fee for Brenger.
              </p>

              <p>
                If the Carrier cancels the Order, the Client will be refunded
                the full amount. Brenger will then help the Client to find a new
                Carrier, if desired.
              </p>

              <p>
                If the Carrier indicates within 24-48 hours or longer before the
                agreed collection time that he or she can no longer execute the
                Order and cannot arrange another collection time with the
                Client, the Carrier must pay €25 in compensation to the Client
                through Brenger. The Client can use this compensation to find
                another Carrier for the Order, if desired. If the Carrier
                indicates within 24 hours before the agreed collection time or
                later that he or she can no longer execute the Order and cannot
                arrange another collection time with the Client, the Carrier
                must pay €50 in compensation to the Client through Brenger. The
                Client can use this compensation to find another Carrier for the
                Order, if desired.
              </p>

              <p>
                <strong>Article 7 – Availability of the Website</strong>
              </p>

              <p>
                Brenger does its utmost to ensure that the Website is available.
                Brenger does not guarantee that the Website will work
                faultlessly and will always be available. Brenger is therefore
                not liable for damage suffered if the Website does not work or
                does not work securely.
              </p>

              <p>
                <strong>Article 8 – User account</strong>
              </p>

              <p>
                You must protect your account login details from others and keep
                your password strictly confidential. Brenger assumes that
                everything that happens on or with your account is done by you
                or under your supervision. If you think or know that your
                account is being abused, you should report it as soon as
                possible to Brenger. Brenger will do everything it can to help
                you stop any abuse. You can delete your account at any time
                without charge.
              </p>

              <p>
                <strong>Article 9 – Prices</strong>
              </p>

              <p>
                If you need to pay for part of the Service, Brenger will state
                this clearly on the Website. All prices for the Service include
                VAT. Users can earn discounts by sharing Brenger with friends
                and family. When others use their personal discount code, the
                user receives a credit for a future Order. If the discount code
                is entered on a website for sharing discount codes, the balance
                accrued will be invalidated and deleted from the account.
              </p>

              <p>
                <strong>Article 10 – Exclusion</strong>
              </p>

              <p>
                If Brenger considers that you have violated the law or these
                Client Terms and Conditions, Brenger can exclude you wholly or
                partially from the Service. Brenger can also exclude you wholly
                or partially from the Service if you fail to pay on time or at
                all.
              </p>

              <p>Brenger can exclude you from the Service by, for example:</p>

              <p>• Deleting your account;</p>

              <p>• Blocking you from parts of the Service.</p>

              <p>
                <strong>Article 11 – Liability</strong>
              </p>

              <p>
                Brenger is not liable for any direct or indirect damage you may
                suffer from using our Website or Service. For example, Brenger
                is not liable for:
              </p>

              <p>
                Damage suffered by the User due to incorrect information on the
                Website;
              </p>

              <p>
                The conclusion and execution of contracts between the Carrier
                and the Client through the Website;
              </p>

              <p>
                The proper functioning of links and hyperlinks on the Website;
              </p>

              <p>
                Situations in which the User’s mobile device is stolen and a
                third party subsequently uses the Website or Service by means of
                the User’s mobile device;
              </p>

              <p>
                Any damage or change to the User’s device as a consequence of
                using the Website or Service; and
              </p>

              <p>
                Brenger’s failure to comply with the obligations in these Client
                Terms and Conditions if the failure is due to events beyond
                Brenger’s reasonable control.
              </p>

              <p>
                Brenger has no influence on the information that Users post on
                the Website or the information exchanged between Users. Brenger
                is not liable for this information. Brenger is also not liable
                for incomplete or incorrect information as a result of incorrect
                transmission of this information.
              </p>

              <p>
                Brenger will not actively monitor the information that Users can
                post on the Website. Brenger can delete information from the
                Website following notification, if that information is illegal,
                conflicts with these Client Terms and Conditions or is in any
                other way inappropriate.
                <a href="https://www.brenger.nl/en-nl/notice-and-take-down-procedure-brenger">
                  {" "}
                  Click here to see our notice-and-take-down policy
                </a>
                .
              </p>

              <p>
                <strong>Article 12 – Confidentiality</strong>
              </p>

              <p>
                Brenger is obliged to keep all your confidential information
                strictly confidential. Brenger understands ‘confidential
                information’ to be all information that you have indicated as
                confidential or of which the confidentiality arises from the
                nature of the information.
              </p>

              <p>
                <strong>Article 13 – Privacy</strong>
              </p>

              <p>
                Brenger respects your privacy and complies with the new European
                legislation, the General Data Protection Regulation. If you use
                our Website and our Service, we will collect specific personal
                data from you. In our privacy policy, you can see what personal
                data we collect and what we use it for. You can find our privacy
                policy here:{" "}
                <a href="https://brenger.nl/nl/privacypolicy">
                  https://brenger.nl/en-nl/privacypolicy
                </a>
                .
              </p>

              <p>
                <strong>Article 14 – Conflict resolution</strong>
              </p>

              <p>
                Brenger is not obliged to assist in the event of conflicts
                between Carrier and Client. However, Brenger will, of course,
                try to help in resolving such conflicts.
              </p>

              <p>
                <strong>Article 15 – Disputes</strong>
              </p>

              <p>
                If a dispute arises between you and Brenger, Dutch law applies.
                In that case, the District Court of Amsterdam is competent to
                rule on the dispute.
              </p>
            </div>
          </section>
        </div>
      </AosWrapper>
    </WebsiteLayout>
  );
};

export default TermsPage;
