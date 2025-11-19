/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { LuCircleArrowDown, LuCircleArrowUp } from "react-icons/lu";
import useFetch from "../hooks/useFetch";
import { FETCH_FAQS } from "../constants";
const faqs = [
  {
    id: 1,
    q: "Kan ik mijn boeking kosteloos annuleren?",
    a: "Ja, je kunt je boeking tot 72 uur van tevoren gratis annuleren of wijzigen. Zo blijf je flexibel, ook als je plannen veranderen.",
  },
  {
    id: 2,
    q: "Kan ik zelf een datum en tijd kiezen voor de levering?",
    a: "Zeker! Je kiest zelf wanneer wij langskomen — overdag, in de avond of zelfs in het weekend. Jij bepaalt wat het beste uitkomt.",
  },
  {
    id: 3,
    q: "Wat gebeurt er nadat ik geboekt heb?",
    a: "Na je boeking houden we je stap voor stap op de hoogte. Je ontvangt informatie over je koerier en wanneer hij precies komt.",
  },
  {
    id: 4,
    q: "Wie komt mijn spullen ophalen en bezorgen?",
    a: "Wij werken uitsluitend met betrouwbare en professionele koeriers. Ze worden zorgvuldig geselecteerd en getraind voor een veilige levering.",
  },
  {
    id: 5,
    q: "Hoe snel kan ik een transport boeken?",
    a: "Je kunt binnen een paar minuten boeken. Vul je gegevens in, kies een tijdslot en je bent klaar! Eenvoudig en snel geregeld.",
  },
  {
    id: 6,
    q: "Wat als ik vragen heb of hulp nodig heb?",
    a: "Onze vriendelijke klantenservice staat altijd klaar om je te helpen — voor, tijdens en na je transport.",
  },
];
const Faqs = () => {
  const { fetchData } = useFetch();
  const [faqdata, setFaqData] = useState([]);
  const [active, setActive] = useState(null);

  const fetchFaqs = async () => {
    try {
      const response = await fetchData(FETCH_FAQS);
      setFaqData(response?.data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);
  return (
    <div className="mt-10" id="faqs">
      <div className="w-full">
        <div className=" !bg-none">
          <div className="container_custom pt-[30px] pb-[40px]">
            <div className="flex justify-center items-center flex-col">
              <div className="bg-pills">FAQ</div>
              <h2 className="uppercase text-[#2A3342] font-bold text-[26px] mt-3 md:text-left text-center">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="mt-10">
              {faqs?.map((item, index) => (
                <>
                  <div
                    key={index}
                    className="bg-[#F3F3F3] p-5 rounded-xl mb-2 cursor-pointer"
                    onClick={() => {
                      if (active == index) {
                        setActive(null);
                      } else {
                        setActive(index);
                      }
                      // setActive(index)
                    }}
                  >
                    <h3 className="font-bold text-[#2A3342] text-[16px] flex justify-between items-center">
                      <span>
                        {index + 1}. {item?.question}
                      </span>
                      {active == index ? (
                        <LuCircleArrowUp color="#ccc" />
                      ) : (
                        <LuCircleArrowDown color="#BBC3CF" />
                      )}
                    </h3>
                    {active == index && (
                      <p
                        className="pt-5 text-[#556987] text-[15px]"
                        dangerouslySetInnerHTML={{ __html: item?.answer }}
                      ></p>
                    )}
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
