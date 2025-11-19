import React, { useEffect, useState } from "react";
import WebsiteLayout from "../../Layouts/Website";
import Faqs from "../../Components/Faqs";
import { useLocation } from "react-router-dom";

const dataMap = {
  bankstelle: {
    name: "Laat je bank vervoeren",
    p1: "Een hoekbank, tweezitsbank, sofa of slaapbank. Noem maar op en je krijgt het met Koerier binnen mum van tijd in huis. Via ons platform vinden wij een koerier die ruimte over heeft in zijn bus, en maar al te graag jouw bank ophaalt en daarna ergens anders weer aflevert. Morgen of over 7 dagen, het gebeurt op de door jou gekozen datum. Wil je gebruik maken van extra services, zoals sjouwhulp of heb je een laadklep nodig? Geen probleem, het is allemaal mogelijk.",
    p2: "Binnen 3 minuten geregeld. Voordelig, makkelijk en duurzaam! Dat is transport via Koerier.",
    image:
      "https://www.brenger.nl/nl/wp-content/uploads/2023/12/product-couch.jpg",
  },
  bedden: {
    name: "Laat je bed vervoeren",
    p1: "Nieuw stapelbed voor je kinderen? Of toch een fijne boxspring voor jezelf? Haal je nieuwe of tweedehands spullen makkelijk in huis met transport geregeld door Brenger. Plaats via ons platform een transportverzoek en wij vinden gegarandeerd een koerier die jouw bed met veel plezier van A naar B brengt. Of je nou in Vlaanderen of in Nederland woont. Met een paar klikken op de knop is het geregeld, zonder zelf de deur uit te hoeven. Brenger neemt alle zorgen van transport weg, zodat jij rustig kunt slapen in je nieuwe bed.",
    p2: "Zo makkelijk is het regelen van transport nog nooit geweest! Brenger, altijd goed gebracht.",
    image:
      "https://www.brenger.nl/nl/wp-content/uploads/2023/12/photo-1608501615091-6634f493b826-683x1024.jpeg",
  },
  kasten: {
    name: "Laat je kast vervoeren",
    p1: "Wil jij kasten of andere grote spullen laten vervoeren? Dan ben je bij Brenger aan het juiste adres! Via ons platform vind jij een koerier die jouw kast van A naar B brengt zonder dat jij iets hoeft te doen. Je plaatst jouw transport op ons platform, kiest de tijdvakken waarin de kast kan worden opgehaald en afgeleverd, en betaalt jouw transport op ons platform. Vervolgens ontvang jij in een e-mail welke koerier jouw kast gaat brengen en in welk door jou gekozen tijdvak de kast wordt opgehaald en afgeleverd.",
    p2: "Zo heb jij het voordeligste transport voor je kast, wordt de wereld wat duurzamer en verdient de koerier meer op zijn rit!",
    image:
      "https://www.brenger.nl/nl/wp-content/uploads/2023/12/photo-1530411554903-7e745b9f1f6d-683x1024.jpeg",
  },
  meubels: {
    name: "Laat je meubels bezorgen",
    p1: "Wil je je meubels vervoeren maar weet je niet hoe of wanneer je dat moet doen? Een busje huren kost erg veel tijd en geld. Of je nu een bank, tafel of kast wil vervoeren: bespaar jezelf tijd, moeite en geld door te kiezen voor Brenger. Voor al jouw onhandig te vervoeren grote of zware items matchen wij een koerier die de meubels komt ophalen en bezorgen op dag dat jou dat uitkomt. Bij Brenger kunnen alleen professionele koeriers zich aanmelden. Iedere koerier wordt beoordeeld zodat jij zeker weet dat jouw bank, tafel of kast goed en veilig naar de afleverlocatie wordt gebracht!",
    p2: "Zo boek jij super snel een transport voor je meubels, zonder dat je er zelf veel moeite voor hoeft te doen!",
    image:
      "https://www.brenger.nl/nl/wp-content/uploads/2023/12/nathan-fertig-fbxuxp57em0-unsplash-1024x683.jpg",
  },
  stoelen: {
    name: "Laat je stoelen vervoeren",
    p1: "Je gekochte stoel past net niet in je auto. Daarnaast moet het worden opgehaald aan de andere kant van het land. Om er nou meteen een busje voor te huren. Dat kost heel veel tijd en bovendien ook heel veel geld. Gelukkig komt Brenger met de oplossing. Wij vinden voor jou een koerier met ruimte in zijn bus, die de route die jouw stoel moet afleggen toch al rijdt. Bekijk binnen 3 minuten je prijs, boek je transport en voor je het weet staat jouw nieuwe aankoop te pronken in je keuken, woonkamer of slaapkamer.",
    p2: "Zo heb jij het voordeligste transport voor je stoel, wordt de wereld wat duurzamer en verdient de koerier meer op zijn rit!",
    image:
      "https://www.brenger.nl/nl/wp-content/uploads/2023/12/koeriers-service-brenger-1024x683.jpg",
  },
  tafels: {
    name: "Laat je tafel vervoeren",
    p1: "Mooi pareltje gescoord op Marktplaats? Of een nieuwe tafel laten maken door een unieke meubelmaker? Het is een hele klus om zo’n groot meubelstuk makkelijk in huis te krijgen. Als je al een auto tot je beschikking hebt, moet het er ook nog maar eens in passen. Bespaar jezelf de stress en laat je eettafel, bijzettafel of salontafel makkelijk thuis brengen met Brenger. Vul het ophaal- en afleveradres in en bekijk de prijs van jouw transport. Wij vinden een geschikte koerier die jouw tafel meeneemt op een route die hij toch al zou rijden.",
    p2: "Wij gaan altijd voor win-win-win: jij blij, koerier blij en het milieu blij!",
    image:
      "https://www.brenger.nl/nl/wp-content/uploads/2023/12/beazy-wosnixmmyca-unsplash-683x1024.jpg",
  },
  tuinmeubels: {
    name: "Laat je tuinmeubels vervoeren",
    p1: "Wil jij meubels of andere grote spullen laten vervoeren? Dan ben je bij Brenger aan het juiste adres! Via ons platform vind jij een koerier die jouw tuinmeubels van A naar B brengt zonder dat jij iets hoeft te doen. Je plaatst jouw transport op ons platform, kiest de tijdvakken waarin de tuinmeubels kunnen worden opgehaald en afgeleverd, en betaalt jouw transport op ons platform. Vervolgens ontvang jij in een e-mail welke koerier jouw tuinmeubels gaat brengen en in welk door jou gekozen tijdvak de tuinmeubels worden opgehaald en afgeleverd.",
    p2: "Zo heb jij het voordeligste transport voor je tuinmeubels, wordt de wereld wat duurzamer en verdient de koerier meer op zijn rit!",
    image: "https://www.brenger.nl/nl/wp-content/uploads/2023/12/bbq.jpg",
  },
  witgoed: {
    name: "Laat je witgoed vervoeren",
    p1: "Vaatwasser, koelkast, oven of wasmachine vervoeren? Dat is nogal een klus. Geef het transport uit handen en laat Brenger een koerier voor jou vinden die toch al die kant op gaat. Is je transport te zwaar en heb je extra hulp nodig bij het tillen? Boek dan een extra sjouwhulp die jouw vaatwasser, koelkast, oven of wasmachine zo bij jou naar binnen tilt. Vul je gegevens in op de site, bekijk je prijs en laat ons een koerier vinden die jouw witgoed meeneemt op de dag dat jij het in huis wilt hebben.",
    p2: "Zo heb jij geen zorgen, verdient de koerier meer op zijn rit en beperken we samen de CO₂ uitstoot!",
    image:
      "https://www.brenger.nl/nl/wp-content/uploads/2023/12/product-washmachine.jpg",
  },
};

const Wordbrenger = () => {
  const [data, setData] = useState({});
  const lastSegment = window.location.pathname.split("/").pop();
  const location = useLocation();
  // const data = dataMap[lastSegment];

  useEffect(() => {
    console.log("I am calling");
    setData(dataMap[lastSegment]);
  }, [location]);
  return (
    <WebsiteLayout>
      <div className="">
        <div class="mt-[100px]">
          <div className="container_custom">
            <div className="grid md:grid-cols-2 gap-10 items-center  md:mt-[100px] mb-[70px]">
              <div className="">
                <div className="split-content--text markdown">
                  <h2
                    className="font-bold text-3xl mb-6"
                    id="h-laat-je-bank-vervoeren"
                  >
                    Zelfstandige koerier? Vind extra opdrachten
                  </h2>
                  <p className="text-[15px] mb-4">
                    Ben jij een zzp koerier en heb je een eigen bus? Of heb je
                    een koeriersbedrijf met meerdere bussen? Vul jouw onbenutte
                    ruimte en verdien gemakkelijk bij via de Brenger koerier
                    app.
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="split-content--image">
                  <picture>
                    <img
                      data-src={
                        "https://www.brenger.nl/nl/wp-content/uploads/2023/12/brenger-mudanza-transportiste-15-1024x683.jpg"
                      }
                      className=" ls-is-cached lazyloaded rounded-xl w-[400px]"
                      src={
                        "https://www.brenger.nl/nl/wp-content/uploads/2023/12/brenger-mudanza-transportiste-15-1024x683.jpg"
                      }
                    />
                  </picture>
                </div>
              </div>
            </div>
          </div>

          <div className="container_custom">
            <div className="grid md:grid-cols-2 gap-10 items-center  md:mt-[100px] mb-[70px]">
              <div className="">
                <div className="split-content--text markdown">
                  <h2
                    className="font-bold text-3xl mb-6"
                    id="h-laat-je-bank-vervoeren"
                  >
                    Van losse freelance koerier opdrachten tot complete routes
                  </h2>
                  <p className="text-[15px] mb-4">
                    De alles-in-één oplossing om jouw werk als koerier
                    makkelijker en winstgevender te maken. Zoek handige ritten,
                    ontvang opdrachten in de buurt en beheer je
                    gepersonaliseerde dagroute. De Brenger koerier app zet alle
                    stops in de beste volgorde zodat jij minder hoeft te
                    plannen. Meld je aan en begin direct na de kennismaking met
                    rijden.
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="split-content--image">
                  <picture>
                    <img
                      data-src={
                        "https://www.brenger.nl/nl/wp-content/uploads/2023/12/brenger-koerier-app-preview-nl-1024x1024.png"
                      }
                      className=" ls-is-cached lazyloaded rounded-xl w-[400px]"
                      src={
                        "https://www.brenger.nl/nl/wp-content/uploads/2023/12/brenger-koerier-app-preview-nl-1024x1024.png"
                      }
                    />
                  </picture>
                </div>
              </div>
            </div>
          </div>

          <div className="container_custom">
            <h1 className="text-center font-bold text-3xl">Tijdens de rit</h1>
            <div className="row grid md:grid-cols-3 gap-4 mt-[100px]">
              <div className="usps-big--item section-space--y--50 align--center flex flex-col justify-center items-center">
                <div className="usps-big--image pb-5  mb-4">
                  <img
                    data-src="https://www.brenger.nl/nl/wp-content/uploads/2023/12/speedy_van.png"
                    className=" ls-is-cached lazyloaded h-[150px]"
                    src="https://www.brenger.nl/nl/wp-content/uploads/2023/12/speedy_van.png"
                  />
                </div>
                <h3 className="font-bold text-xl">Wij zijn er voor je </h3>
                <div className="">
                  <p className="text-center mt-3">
                    Gaat er onderweg iets niet goed, ben je te laat of is de
                    klant niet thuis? Ons Support Team staat voor je klaar voor
                    ondersteuning via de chat of telefoon
                  </p>
                </div>
              </div>
              <div className=" flex flex-col justify-center items-center">
                <div className="usps-big--image pb-5">
                  <img
                    data-src="https://www.brenger.nl/nl/wp-content/uploads/2023/12/icons-website-3-.svg"
                    className=" ls-is-cached lazyloaded h-[150px]"
                    src="https://www.brenger.nl/nl/wp-content/uploads/2023/12/icons-website-3-.svg"
                  />
                </div>
                <h3 className="font-bold text-xl">Zorgeloos op pad </h3>
                <div className="usps-big--text">
                  <p className="text-center mt-3">
                    Plan routes makkelijk in onze app. Al je tussenstops staan
                    daarin automatisch op de juiste volgorde in een dagroute,
                    met genoeg tijd ingerekend om in- en uit te laden
                  </p>
                </div>
              </div>
              <div className=" flex flex-col justify-center items-center">
                <div className="usps-big--image pb-5">
                  <img
                    data-src="https://www.brenger.nl/nl/wp-content/uploads/2023/12/person_green_circle.png"
                    className=" lazyloaded h-[150px]"
                    src="https://www.brenger.nl/nl/wp-content/uploads/2023/12/person_green_circle.png"
                  />
                </div>
                <h3 className="font-bold text-xl">Ogen op de weg </h3>
                <div className="usps-big--text">
                  <p className="text-center mt-3">
                    Tijdens het rijden krijgen de klanten op de ophaal- en
                    afleveradressen automatisch updates over je aankomsttijd
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Faqs />
          <div className=" bg-blue-100 py-16">
            <div className="container_custom">
              <h1 className="text-center font-bold text-3xl">
                Vervoer opdrachten van
              </h1>
              <div className="row grid md:grid-cols-3 gap-4 mt-[100px]">
                <div className="usps-big--item section-space--y--50 align--center flex flex-col justify-center items-center">
                  <div className="usps-big--image pb-5  mb-4">
                    <img
                      data-src="https://www.brenger.nl/nl/wp-content/uploads/2023/12/iconhome.svg"
                      className=" ls-is-cached lazyloaded h-[60px]"
                      src="https://www.brenger.nl/nl/wp-content/uploads/2023/12/iconhome.svg"
                    />
                  </div>
                  <h3 className="font-bold text-xl">Particulieren </h3>
                  <div className="">
                    <p className="text-center mt-3">
                      Bijvoorbeeld een nieuwe of tweedehands bank, fiets of kast
                      die van de ene woning naar de andere moet
                    </p>
                  </div>
                </div>
                <div className=" flex flex-col justify-center items-center">
                  <div className="usps-big--image pb-5">
                    <img
                      data-src="https://www.brenger.nl/nl/wp-content/uploads/2023/12/iconshopblue-1-.svg"
                      className=" ls-is-cached lazyloaded h-[60px]"
                      src="https://www.brenger.nl/nl/wp-content/uploads/2023/12/iconshopblue-1-.svg"
                    />
                  </div>
                  <h3 className="font-bold text-xl">Winkels </h3>
                  <div className="usps-big--text">
                    <p className="text-center mt-3">
                      Bezorg spullen in opdracht van van onze zakelijke klanten
                      zoals meubel,- witgoed en elektronicawinkels
                    </p>
                  </div>
                </div>
                <div className=" flex flex-col justify-center items-center">
                  <div className="usps-big--image pb-5">
                    <img
                      data-src="https://www.brenger.nl/nl/wp-content/uploads/2023/12/iconauction-2-.svg"
                      className=" lazyloaded h-[60px]"
                      src="https://www.brenger.nl/nl/wp-content/uploads/2023/12/iconauction-2-.svg"
                    />
                  </div>
                  <h3 className="font-bold text-xl">Veilingen </h3>
                  <div className="usps-big--text">
                    <p className="text-center mt-3">
                      Van losse items tot hele pallets: bezorg kavels van
                      veilingen zoals Onlineveilingmeester en Troostwijk
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WebsiteLayout>
  );
};

export default Wordbrenger;
