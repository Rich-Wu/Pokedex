import {
    useRef,
    useEffect,
    useState,
    MouseEventHandler,
    Dispatch,
    SetStateAction,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { Pokemon } from "@/types";
import { AddPokeball, FullPokeball, Pokeball } from "./Pokeball";

export default function PokeballCarousel({
    team,
    activePokemon,
    onSelect,
    addPokemon,
}: {
    team: Array<Pokemon>;
    activePokemon: Pokemon | null;
    onSelect: Dispatch<SetStateAction<Pokemon | null>>;
    addPokemon: Function;
}) {
    const swiperRef = useRef<SwiperType | null>(null);
    const isProgrammatic = useRef(false);
    const [centerIndex, setCenterIndex] = useState(0);

    // Sync Swiper position whenever activePokemon or team changes
    useEffect(() => {
        const swiper = swiperRef.current;
        if (!swiper) return;

        swiper.update();

        const targetIdx = activePokemon
            ? team.findIndex((p: Pokemon) => p.number === activePokemon.number)
            : team.length;

        if (targetIdx === -1 || targetIdx === swiper.activeIndex) return;

        isProgrammatic.current = true;
        swiper.slideTo(targetIdx, 300);
        setCenterIndex(targetIdx);
    }, [activePokemon, team]);

    function handleSlideChange(swiper: SwiperType) {
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
                {team.map((pokemon: Pokemon) => (
                    <SwiperSlide key={pokemon.number}>
                        <FullPokeball pokemon={pokemon} />
                    </SwiperSlide>
                ))}
                <SwiperSlide>
                    <div className="carousel-item valign-wrapper">
                        <AddPokeball addPokemon={addPokemon} />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
