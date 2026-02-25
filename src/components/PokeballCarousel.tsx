import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function PokeballCarousel({
    team,
    activePokemon,
    onSelect,
    onAdd,
}) {
    const swiperRef = useRef(null);
    const isProgrammatic = useRef(false);
    const [centerIndex, setCenterIndex] = useState(0);

    // Sync Swiper position whenever activePokemon or team changes
    useEffect(() => {
        const swiper = swiperRef.current;
        if (!swiper?.initialized) return;

        swiper.update();

        const targetIdx = activePokemon
            ? team.findIndex((p) => p.number === activePokemon.number)
            : team.length;

        if (targetIdx === -1 || targetIdx === swiper.activeIndex) return;

        isProgrammatic.current = true;
        swiper.slideTo(targetIdx, 300);
        setCenterIndex(targetIdx);
    }, [activePokemon, team]);

    function handleSlideChange(swiper) {
        const idx = swiper.activeIndex;
        setCenterIndex(idx);
        if (isProgrammatic.current) {
            isProgrammatic.current = false;
            return;
        }
        onSelect(idx < team.length ? team[idx] : null);
    }

    return (
        <div className="col s12 m6 l8" id="pokeSelector">
            <Swiper
                centeredSlides
                slidesPerView={3}
                onSwiper={(s) => {
                    swiperRef.current = s;
                }}
                onSlideChange={handleSlideChange}
            >
                {team.map((pokemon) => (
                    <SwiperSlide key={pokemon.number}>
                        <div className="carousel-item valign-wrapper">
                            <div className="pokeball">
                                <img
                                    src={pokemon.picture}
                                    alt={pokemon.species}
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
                <SwiperSlide>
                    <div className="carousel-item valign-wrapper">
                        <Pokeball onAdd={onAdd} onSelect={onSelect} />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
