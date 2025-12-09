import { useState, useEffect } from "react";

import imgGrad from "../assets/images/portfolio/grad_shot.jpg"
import imgXV from "../assets/images/portfolio/XV_shot.jpg"
import imgBride from "../assets/images/portfolio/bride_shot.jpg"
import imgHair from "../assets/images/portfolio/hair_style_1.jpg"
import imgHair2 from "../assets/images/portfolio/hair_style_2.jpg"

const portfolioItems = [
    {
        src: imgGrad,
        label: "Maquillaje para graduacion",
        headline: "Haz que tu graduacion sea inolvidable.",
        description: 
            "Piel luminosa, mirada definida y un look que aguanta desde la ceremonia hasta la fiesta.",
    },
    {
        src: imgXV,
        label: "XV años  - look completo",
        headline: "El dia que ella sueaña desde niña.",
        description:
            "Maquillaje y peinado pensados para resaltar tu juventud sin perder elegancia.",
    },
    {
        src: imgBride,
        label: "Maquillaje para Novia",
        headline: "Tu maquillaje debe de ser igual de majico de tu dia.",
        description:
            "Un estilo atemporal que se verá hermoso hoy y en tus fotos dentro de 20 años.",
    },
    {
        src: imgHair,
        label: "Tu pelo brillante y hermoso.",
        headline: "Estilo que te va encantar.",
        description:
            "Tu peinado para cualquier ocasion.",
    },
    {
        src: imgHair2,
        label: "Pelo radiante y juvenil.",
        headline: "Tu pelo que amaras.",
        description:
            "Peinados a tu estilo que te guste.",
    },
];

function Portfolio() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [overlayOpen, setOverlayOpen] = useState(false);

    const currentItem = portfolioItems[currentIndex];

    // AUTO SLIDE every 5s (pauses when overlay is open)
    useEffect(() => {
        if (overlayOpen) return;

        const id = setInterval(() => {
            setCurrentIndex((prev) =>
                prev === portfolioItems.length - 1 ? 0 : prev + 1
            );
        }, 5000);

        return () => clearInterval(id);
    }, [overlayOpen]);

    const handlePrev = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? portfolioItems.length - 1 : prev - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prev) => 
            prev === portfolioItems.length - 1 ? 0 : prev + 1
        );
    };

    const handleThumbClick = (index) => {
        setCurrentIndex(index);
    };

    const openOverlay = () => {
        setOverlayOpen(true);
    }

    const closeOverlay = (e) => {
        // close when clicking outside the content or on the X button
        if (!e || e.target === e.currentTarget) {
            setOverlayOpen(false);
        }
    };

  return (
    <section className="section" id="portfolio">
      <h2>Portafolio</h2>
      <p className="section-subtitle">
        Una muestra del tipo de resultados que puedes esperar: graduaciones,
        novias, XV años y eventos especiales.
      </p>

      {/* MAIN SLIDER */}
      <div className="portfolio-slider">
        <button
          type="button"
          className="portfolio-arrow portfolio-arrow-left"
          onClick={handlePrev}
          aria-label="Foto anterior"
        >
          ‹
        </button>

        <div className="portfolio-main">
          <img
            key={currentItem.src}
            src={currentItem.src}
            alt={currentItem.label}
            className="portfolio-main-image"
            onClick={openOverlay}
          />
          <div className="portfolio-caption">
            {currentItem.label} · <span className="portfolio-caption-hint">
              Toca para ver más
            </span>
          </div>
        </div>

        <button
          type="button"
          className="portfolio-arrow portfolio-arrow-right"
          onClick={handleNext}
          aria-label="Foto siguiente"
        >
          ›
        </button>
      </div>

      {/* THUMBNAILS */}
      <div className="portfolio-thumbs">
        {portfolioItems.map((item, index) => (
          <button
            key={item.src}
            type="button"
            onClick={() => handleThumbClick(index)}
            className={`portfolio-thumb ${
              index === currentIndex ? "portfolio-thumb-active" : ""
            }`}
          >
            <img src={item.src} alt={item.label} />
          </button>
        ))}
      </div>

      {/* ZOOM OVERLAY */}
      {overlayOpen && (
        <div className="portfolio-overlay" onClick={closeOverlay}>
          <div
            className="portfolio-overlay-hero"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="portfolio-overlay-close"
              onClick={closeOverlay}
              aria-label="Cerrar"
            >
              ✕
            </button>

            <div
              className="portfolio-overlay-hero-bg"
              style={{ backgroundImage: `url(${currentItem.src})` }}
            >
              <div className="portfolio-overlay-hero-inner">
                <div className="portfolio-overlay-textblock">
                  <div className="portfolio-overlay-headline title-font">
                    {currentItem.headline.split(" ").map((word, index) => (
                      <span
                        key={index}
                        className="portfolio-overlay-word"
                        style={{ animationDelay: `${index * 80}ms` }}
                      >
                        {word}&nbsp;
                      </span>
                    ))}
                  </div>
                  <p className="portfolio-overlay-sub">
                    {currentItem.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Portfolio;
