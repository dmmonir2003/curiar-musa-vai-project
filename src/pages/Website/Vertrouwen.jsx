import React from "react";
import WebsiteLayout from "../../Layouts/Website";
import Faqs from "../../Components/Faqs";

const Vertrouwen = () => {
  return (
    <WebsiteLayout>
      <div className="container_custom">
        <div class="mt-[60px]">
          <main className="pt-8 lg:pt-16 lg:pb-14 bg-white antialiased">
            <div className="flex justify-between px-4 mx-auto">
              <article className="mx-auto w-full  format format-sm sm:format-base lg:format-lg text-[14px] format-blue dark:format-invert blog_details">
                <header className="mb-4 lg:mb-14 not-format">
                  <h1 className="mb-4 text-3xl text-center font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl">
                    Vertrouwen en veiligheid
                  </h1>
                </header>
                <h2 className="text-xl font-bold mb-4">
                    Persoonlijk en vertrouwelijk contact
                </h2>
                <p className="lead">
                  Koerier is een platform voor het transport van meubels en andere voornamelijk grote spullen voor particulieren en MKB. Koerier maakt het transport van spullen persoonlijk en makkelijk. In tegenstelling tot een postbezorger die een paar keer wel of niet aanbelt, zoekt een koerier persoonlijk contact. Nadat er een deal is gemaakt, ontvangen de koerier, de opdrachtgever en de andere partij (ophaaladres of afleveradres) elkaars telefoonnummer. Zo kan iedereen elkaar op de hoogte houden voor en tijdens het transport.
                </p>

                <h2 className="text-xl font-bold mb-4">
                    Verzekering
                </h2>
                <p className="lead">
                  Mocht er dan toch iets mis gaan, dan helpen wij natuurlijk graag. Spullen die via Koerier worden vervoerd zijn tijdens het transport standaard tot €500 verzekerd. Schade die ontstaat wanneer de koerier de spullen tilt of helpt bij het tillen van de spullen binnen het huis of gebouw bij het ophaal- of afleveradres wordt niet gedekt door deze verzekering. Ook schade aan glas, steen, organismen, printers of computers of schade tijdens transporten die niet binnen onze garantie vallen (groter dan 400x180x160cm of zwaarder dan 100kg of die met apparatuur moeten worden in- en uitgeladen) wordt niet verzekerd. In geval van schade, zullen wij je vragen drie of meer foto’s van de beschadigde spullen te sturen en foto’s van voor de schade te sturen. 


                </p>
               
                
                
                
              </article>
            </div>
          </main>
        
        </div>
      </div>

    </WebsiteLayout>
  );
};

export default Vertrouwen;
