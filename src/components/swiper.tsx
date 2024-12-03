"use client";
import { Swiper as TSwiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import { testimonials } from "@/lib/constant";

export const Swiper = () => {
  return (
    <div className=" py-10 flex ">
      <TSwiper navigation={true} modules={[Navigation]}>
        {testimonials.map((t) => (
          <SwiperSlide key={t.id}>
            <div className="flex items-center justify-between px-24">
              <div className="w-[10%] h-[10%] rounded-full overflow-hidden">
                <img src={t.src} />
              </div>
              <div className=" pl-5 w-[90%] ">
                <p className="text-balance">{t.words}</p>
                <h4 className="text-lg font-semibold mt-6 text-violet-500">
                  -{t.name}
                </h4>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </TSwiper>
    </div>
  );
};
