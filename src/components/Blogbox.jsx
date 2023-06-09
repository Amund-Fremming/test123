import React,{ useState, useEffect } from "react";
import 'tailwindcss/tailwind.css';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { UserAuth } from "../util/AuthContext";

const Blogbox = ({ overskrift, dato, bilde, tekst, bio, delay, deletePost, id }) => {

  const { user } = UserAuth();

  /**
   * Denne funksjonen lager annimasjoner og refs til de ulike komponentene slik at ikke alle ender med å ha samme ref
   * og vi slipper å lage mange ref objekter.
   */
  const useInViewAnimation = (delay) => {
    const control = useAnimation();
    const [ref, inView] = useInView();

    const boxVariants = {
      hidden: {
        opacity: 0,
        y: 45
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          delay: delay,
          typeof: "spring"
        }
      }
    };
    
    useEffect(() => {
      if(inView) {
        control.start("visible");
      }
    }, [control, inView]);
  
    return { ref, variants: boxVariants, initial: 'hidden', animate: control };
  }

    const [bgLesMer, setBgLesMer] = useState(false);
    const [tekstVisibility, setTekstVisibility] = useState(false);
    const [minibildeVisibility, setMinibildeVisibility] = useState(true);
    const [stortbildeVisibility, setStortbildeVisibility] = useState(false);
    const [knappTekst, setKnappTekst] = useState("Les mer");

    const handleMouseOver = () => {
        setBgLesMer(!bgLesMer);
    }

    const handleLes = () => {
        if(knappTekst === "Les mer") {
            setKnappTekst("Les mindre");
            setMinibildeVisibility(false);
            setTekstVisibility(true);
            setStortbildeVisibility(true);
        } else {
            setKnappTekst("Les mer");
            setMinibildeVisibility(true);
            setTekstVisibility(false);
            setStortbildeVisibility(false);
        }
    }

    return(
        <motion.div
            {...useInViewAnimation(delay)}
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseOver}
            className="block bg-[#616D3D] my-6 shadow-xl overflow-hidden p-6 w-[97%] sm:w-[95%] md:w-[90%] lg:w-[70%] xl:w-[70%] rounded-xl"
        >     <div className="flex justify-between">
                <h1 className="pr-2 font-medium text-white text-xl">{overskrift}</h1>
                {
                  user !== null
                  ? <button onClick={() => deletePost(id)} className="">X</button>
                  : <></>
                }
              </div>
            <div className="flex justify-between text-white w-full">
                <div className="flex flex-col h-full">
                    <p className="pr-2">{dato}</p>
                    <p className="pr-2 text-[#DADADB]">"<i>{bio}"</i></p>

                    <div className="flex flex-wrap justify-between">
                        {/* Når les mer trykkes */}
                        <p className={`mt-6 ${tekstVisibility === true ? "flex" : "hidden"} w-full md:w-[80%] lg:w-[40%] xl:w-[50%] mr-3`}>{tekst}</p>
                        <img src={bilde} alt={bilde} className={`${stortbildeVisibility === true ? "flex" : "hidden"} object-cover w-[250px] lg:w-[300px] xl:w-[300px] rounded-md m-2 mt-8`} />
                    </div>

                    <input onClick={handleLes} className={`${bgLesMer ? "bg-ocean-blue" : "bg-ggg" } rounded-xl h-8 w-24 mt-12 px-2 cursor-pointer`} type="button" value={knappTekst} />
                </div>
                <img src={bilde} alt={bilde} className={`${minibildeVisibility === true ? "flex" : "hidden"} h-[130px] object-cover rounded-md mr-3`} />
            </div>
        </motion.div>
    );
};

export default Blogbox;