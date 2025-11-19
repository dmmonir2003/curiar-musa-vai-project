import React from "react";
import WebsiteLayout from "../../Layouts/Website";
import Faqs from "../../Components/Faqs";

const OverKoerier = () => {
  return (
    <WebsiteLayout>
      <div className="container_custom">
        <div class="mt-[100px]">
          <h1 className="font-bold text-5xl">Over Brenger</h1>
          <p>
            <div class="container markdown mt-6 text-md">
              <p className="mb-3">
                Brenger werd in 2016 opgericht door Wisse Koedam (31) en Derk
                van der Have (31) met als doel het veranderen van de
                inefficiënte manier van grote spullen vervoeren. Ons
                transportplatform richt zich op consumenten zoals jij en ik,
                maar ook op zakelijke klanten zoals kleine meubelzaken en grote
                retailers. Consumenten die bijvoorbeeld een bank, fiets of kast
                van A naar B willen vervoeren of bedrijven die geen ruimte
                hebben voor een eigen bezorgdienst en duurzaamheid een
                belangrijk aspect vinden. Via Brenger wordt elk transport
                geregeld door een koerier die toch al die kant op rijdt. Dit
                maakt de (ver)koop van tweedehands producten makkelijker én
                duurzamer. Dankzij onze technologie wordt voor elke rit de meest
                efficiënte route berekend en betaalt de klant een betere prijs.
              </p>

              <p className="mb-3">
                Zo draagt Brenger er met alle koeriers en klanten ook aan bij
                dat transport van (tweedehands) meubelen makkelijker is en
                verlagen we ook nog eens de onnodige CO₂-uitstoot, en verdient
                een koerier extra geld op een rit die hij toch al ging maken.
                Sinds de oprichting hebben we meer dan{" "}
                <strong>3.187 ton CO₂</strong> weten te besparen door het
                voorkomen van <strong>14.885.871 onnodige kilometers</strong>.
              </p>

              <h3 class="wp-block-heading mb-4 text-xl font-bold">
                <strong>Onze missie</strong>
              </h3>

              <p>
                Onze missie is om&nbsp;
                <strong>
                  elk busje, dat toch al onderweg is, zoveel mogelijk te vullen
                </strong>
                . Want daar wordt iedereen blij van: de koerier, het milieu en
                jouw portemonnee. Win-win-win!
              </p>

              <h3 class="wp-block-heading mb-4 text-xl font-bold mt-4">
                <strong>Ons team</strong>
              </h3>

              <p className="mb-3">
                Onze ambitie is Brenger dé oplossing maken voor het versturen
                van grote spullen in Nederland en in de rest van Europa. Vanuit
                ons kantoor in Amsterdam werken we eraan om onze website te
                verbeteren en te zorgen dat het platform zo goed mogelijk
                aansluit op de wensen van onze klanten.
              </p>


              <figure class="wp-block-image size-large">
                <img
                  loading="lazy"
                  decoding="async"
                  width="2560"
                  height="1707"
                  src="https://next.brenger.nl/nl/wp-content/uploads/2023/12/teambrenger_q4_brenger_2022_9845-1--scaled.jpg"
                  alt=""
                  class="wp-image-966"
                  srcset="https://www.brenger.nl/nl/wp-content/uploads/2023/12/teambrenger_q4_brenger_2022_9845-1--scaled.jpg 2560w, https://www.brenger.nl/nl/wp-content/uploads/2023/12/teambrenger_q4_brenger_2022_9845-1--300x200.jpg 300w, https://www.brenger.nl/nl/wp-content/uploads/2023/12/teambrenger_q4_brenger_2022_9845-1--1024x683.jpg 1024w, https://www.brenger.nl/nl/wp-content/uploads/2023/12/teambrenger_q4_brenger_2022_9845-1--768x512.jpg 768w, https://www.brenger.nl/nl/wp-content/uploads/2023/12/teambrenger_q4_brenger_2022_9845-1--1536x1024.jpg 1536w, https://www.brenger.nl/nl/wp-content/uploads/2023/12/teambrenger_q4_brenger_2022_9845-1--2048x1365.jpg 2048w"
                  sizes="auto, (max-width: 2560px) 100vw, 2560px"
                />
              </figure>
            </div>
          </p>
        </div>
      </div>

      <Faqs />
    </WebsiteLayout>
  );
};

export default OverKoerier;
