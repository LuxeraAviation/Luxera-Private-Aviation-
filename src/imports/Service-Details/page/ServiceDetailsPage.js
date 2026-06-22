"use client";

import Banner from "@/imports/core/components/Banner";
import ServiceDetailsAbout from "@/imports/Service-Details/components/About";
import Gallery from "@/imports/core/components/Gallery";
import Statistics from "@/imports/HomePage/ui/components/Statistics";
import Feature from "@/imports/HomePage/ui/components/Feature";
import Benefits from "@/imports/Service-Details/components/Benefits";
import BookFlight from "@/imports/HomePage/ui/components/BookFlight";
import Brands from "@/imports/HomePage/ui/components/Brands";
import { SERVICE_DETAILS_BANNER } from "@/imports/core/constants/banner";
import { SERVICE_GALLERY } from "@/imports/core/constants/gallery";

export default function ServiceDetailsPage() {
    return (
        <main>
            <Banner banner={SERVICE_DETAILS_BANNER} />
            <ServiceDetailsAbout />
            <Statistics />
            <Feature />
            <Gallery {...SERVICE_GALLERY} />
            <Benefits />
            <BookFlight />
            <Brands />
        </main>
    );
}
