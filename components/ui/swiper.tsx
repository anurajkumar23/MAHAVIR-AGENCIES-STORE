"use client";
import { Billboard } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

interface BillboardProps {
    data: Billboard;
}

const Slider: React.FC<BillboardProps> = ({
    data
}) => {
    console.log(data, "🎉🎉🎉🎉"); //aa raha hai data

    return (
        <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
            <Swiper
                slidesPerView={1}
                centeredSlides={true}
                autoplay={{ delay: 8000, disableOnInteraction: false }}
                loop={true}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
            >
                {data.map((item) => (
                    <SwiperSlide key={item.__id}>
                        <div className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden object-cover">
                            <Image
                            height={7000}
                            width={7000}
                                src={item.imageUrl}
                                alt={"billboards"}
                                className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden "
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Slider;
