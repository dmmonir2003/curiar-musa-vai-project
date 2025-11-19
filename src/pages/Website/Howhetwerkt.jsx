import React from "react";
import WebsiteLayout from "../../Layouts/Website";
import Faqs from "../../Components/Faqs";

const Howhetwerkt = () => {
  return (
    <WebsiteLayout>
      <div className="bg-[var(--primary-color)] text-white py-10 mt-[100px]">
        <div className="container_custom">
          <h1 className="font-bold text-5xl">
            Bank, fiets of kast die niet in je auto past?
          </h1>
          <p className="mt-4 text-[18px]">
            Regel het transport van grote spullen in 3 stappen.
          </p>
        </div>
      </div>

      <div className="container_custom">
        <div className="grid grid-cols-1md:grid-cols-2 gap-8 md:p-10 mt-10 md:mt-0 items-center">
          <div className="">
            <div className="">
              <h4
                className="font-bold text-xl mb-4"
                id="h-1-bekijk-de-prijs-en-boek"
              >
                1. Bekijk de prijs en boek
              </h4>

              <p>
                Vul op de homepage de ophaal- en afleverplaats in, de afmetingen
                van het voorwerp in en bekijk de prijs. Kies de eventuele extra
                services, zoals een sjouwhulp, etage service of een bus met
                laadklep. Betaal je transport.
              </p>
            </div>
          </div>
          <div className="col col-image col-12 col-md-6 section-space--y order-2 md:order-none">
            <div className="split-content--image">
              <img
                data-src="https://www.brenger.nl/nl/wp-content/uploads/2023/12/stap-1_b2c.svg"
                class=" lazyloaded"
                src="https://www.brenger.nl/nl/wp-content/uploads/2023/12/stap-1_b2c.svg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* STEP 2 */}
      <div className="container_custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:p-10 mt-10 md:mt-0 items-center">
          <div className="">
            <div className="">
              <h4
                className="font-bold text-xl mb-4"
                id="h-1-bekijk-de-prijs-en-boek"
              >
                2. Wij houden je op de hoogte
              </h4>

              <p>
                Nadat je hebt geboekt, gaan we zoeken naar een geschikte koerier
                voor jouw transport. Zodra er een koerier is gekoppeld, ontvang
                je de avond vóór de dag van het transport het exacte tijdvak en
                de contactgegevens van de koerier. Op die manier kunnen jullie
                gemakkelijk met elkaar communiceren en verloopt het transport
                soepel en efficiënt.
              </p>
            </div>
          </div>
          <div className="col col-image col-12 col-md-6 section-space--y order-2 md:order-none">
            <div className="split-content--image">
              <img
                data-src="https://www.brenger.nl/nl/wp-content/uploads/2023/12/how-it-works-1200x600-1-.svg"
                class=" lazyloaded"
                src="https://www.brenger.nl/nl/wp-content/uploads/2023/12/how-it-works-1200x600-1-.svg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* STEP 3 */}
      <div className="container_custom">
        <div className="grid  grid-cols-1 md:grid-cols-2 gap-8 md:p-10 mt-10 md:mt-0 items-center">
          <div className="">
            <div className="">
              <h4
                className="font-bold text-xl mb-4"
                id="h-1-bekijk-de-prijs-en-boek"
              >
                3. De koerier komt in actie
              </h4>

              <p>
                De koerier haalt de spullen op en levert ze binnen het
                afgesproken tijdvak af. Via de trackingpagina kun je het
                transport volgen. Bij eventuele vertraging zal de koerier
                zijn/haar best doen om je hiervan op de hoogte te stellen. Zodra
                de spullen zijn afgeleverd, vragen we je om de ontvangst te
                bevestigen en wordt de koerier uitbetaald. Tot slot kun je de
                koerier en de geleverde service beoordelen.
              </p>
            </div>
          </div>
          <div className="col col-image col-12 col-md-6 section-space--y order-2 md:order-none">
            <div className="split-content--image">
              <img
                data-src="https://www.brenger.nl/nl/wp-content/uploads/2023/12/how-it-works-1200x600-2-.svg"
                class=" lazyloaded"
                src="https://www.brenger.nl/nl/wp-content/uploads/2023/12/how-it-works-1200x600-2-.svg"
              />
            </div>
          </div>
        </div>
      </div>


      <Faqs />
    </WebsiteLayout>
  );
};

export default Howhetwerkt;
