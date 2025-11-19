import React from "react";
import WebsiteLayout from "../../Layouts/Website";
import Faqs from "../../Components/Faqs";

const Prices = () => {
  return (
    <WebsiteLayout>
      <div className="container_custom">
        <div class="mt-[100px]">
          <div class="row mb-7">
            <div class="col-12 section-space--b--50">
              <h2 class="font-bold text-2xl md:text-5xl">Altijd voordelig gebracht </h2>
              <p class="pt-4">
                Geen verborgen kosten. Inclusief brandstofkosten en BTW.
              </p>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white rounded-xl shadow-lg py-0">
              <div class="relative flex justify-between items-center">
                <div class="transport-example--content px-4">
                  <div class="transport-example--header font-bold">
                    Tweezitsbank
                  </div>
                  <div class="transport-example--text">200x80x90cm</div>
                  <div class="transport-example--text">
                    Amsterdam &gt; Utrecht (52km.)
                  </div>
                </div>
                <div
                  class="transport-example--image--wrapper"
                //   style="background-color:#338ffc"
                >
                  <img
                    class="transport-example--image ls-is-cached lazyloaded"
                    data-src="https://www.brenger.nl/nl/wp-content/uploads/2023/12/product-couch-1.jpg"
                    src="https://www.brenger.nl/nl/wp-content/uploads/2023/12/product-couch-1.jpg"
                  />
                  <div class="transport-example--price text--bold">€91,-</div>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl shadow-lg py-0">
              <div class="relative flex justify-between items-center">
                <div class="transport-example--content px-4">
                  <div class="transport-example--header font-bold">
                    Wasmachine
                  </div>
                  <div class="transport-example--text">60x60x85cm</div>
                  <div class="transport-example--text">
                    Amsterdam &gt; Amsterdam (15km.)
                  </div>
                </div>
                <div
                  class="transport-example--image--wrapper"
                //   style="background-color:#338ffc"
                >
                  <img
                    class="transport-example--image ls-is-cached lazyloaded"
                    data-src="https://www.brenger.nl/nl/wp-content/uploads/2023/12/product-washmachine-1.jpg"
                    src="https://www.brenger.nl/nl/wp-content/uploads/2023/12/product-washmachine-1.jpg"
                  />
                  <div class="transport-example--price text--bold">€57,-</div>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl shadow-lg py-0">
              <div class="relative flex justify-between items-center">
                <div class="transport-example--content px-4">
                  <div class="transport-example--header font-bold">
                    Awesome surfboard
                  </div>
                  <div class="transport-example--text">250x60x24cm</div>
                  <div class="transport-example--text">
                    Breda &gt; Maastricht (147km.)
                  </div>
                </div>
                <div
                  class="transport-example--image--wrapper"
                //   style="background-color:#338ffc"
                >
                  <img
                    class="transport-example--image ls-is-cached lazyloaded"
                    data-src="https://www.brenger.nl/nl/wp-content/uploads/2023/12/product-surfboard.jpg"
                    src="https://www.brenger.nl/nl/wp-content/uploads/2023/12/product-surfboard.jpg"
                  />
                  <div class="transport-example--price text--bold">€92,-</div>
                </div>
              </div>
            </div>

            <div class="bg-white rounded-xl shadow-lg py-0">
              <div class="relative flex justify-between items-center">
                <div class="transport-example--content px-4">
                  <div class="transport-example--header font-bold">
                    Kledingkast
                  </div>
                  <div class="transport-example--text">200x50x100cm</div>
                  <div class="transport-example--text">
                    Breda &gt; Tilburg (30km.)
                  </div>
                </div>
                <div
                  class="transport-example--image--wrapper"
                //   style="background-color:#338ffc"
                >
                  <img
                    class="transport-example--image ls-is-cached lazyloaded"
                    data-src="https://www.brenger.nl/nl/wp-content/uploads/2023/12/product-closet.png"
                    src="https://www.brenger.nl/nl/wp-content/uploads/2023/12/product-closet.png"
                  />
                  <div class="transport-example--price text--bold">€72,-</div>
                </div>
              </div>
            </div>
           
          </div>
          <div class="section-space--b--25 flex gap-4 items-center mt-8">
            <svg
            //   style="display: inline-block; vertical-align: sub; margin-right: 5px;"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <g
                fill="none"
                fill-rule="evenodd"
                stroke="#0073FA"
                stroke-width="1.6"
                transform="translate(1 1)"
              >
                <circle cx="8" cy="8" r="8"></circle>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8 12.174V6.609M8 4.522v-.696"
                ></path>
              </g>
            </svg>
            Kies zelf een ophaal- en aflevermoment, en vul de verdere informatie
            in en je ziet direct de totaalprijs.{" "}
          </div>
         
        </div>
      </div>

      <Faqs />
    </WebsiteLayout>
  );
};

export default Prices;
