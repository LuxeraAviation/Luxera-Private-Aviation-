"use client";

import {
  memo,
  useState,
  useMemo,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import styled from "styled-components";

function computePerView(width, perView, resolvePerView) {
  if (resolvePerView) {
    return resolvePerView(width, perView);
  }

  switch (perView) {
    case 5:
      if (width < 420) return 1;
      if (width < 575) return 2;
      if (width < 768) return 3;
      if (width < 992) return 4;
      return 5;

    case 4:
      if (width < 575) return 1;
      if (width < 992) return 2;
      if (width < 1200) return 3;
      return 4;

    case 3:
      if (width < 575) return 1;
      if (width < 992) return 2;
      return 3;

    case 2:
      return width < 768 ? 1 : 2;

    default:
      if (width < 768) return 1;
      if (width < 992) return Math.min(perView, 2);
      return perView;
  }
}

function Slider({
  items = [],
  perView = 3,
  autoplay = false,
  autoplayInterval = 3000,
  renderItem,
  controls: Controls,
  bottomControls: BottomControls,
  resolvePerView,
  viewportPadding,
  slideGap = 30,
  loop = true,
}) {
  const [currentPerView, setCurrentPerView] = useState(perView);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const plugins = useMemo(() => {
    if (!autoplay) return [];

    return [
      Autoplay({
        delay: autoplayInterval,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ];
  }, [autoplay, autoplayInterval]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop,
      align: "start",
      slidesToScroll: 1,
      containScroll: "trimSnaps",
    },
    plugins,
  );

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    let timeout;

    const updatePerView = () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        const next = computePerView(window.innerWidth, perView, resolvePerView);

        setCurrentPerView((prev) => (prev === next ? prev : next));
      }, 100);
    };

    updatePerView();

    window.addEventListener("resize", updatePerView);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", updatePerView);
    };
  }, [perView, resolvePerView]);

  const renderedItems = useMemo(() => {
    if (!loop || items.length === 0) return items;
    const minSlides = currentPerView * 2 + 1;
    if (items.length >= minSlides) return items;
    const repeat = Math.ceil(minSlides / items.length);
    return Array.from({ length: repeat }, () => items).flat();
  }, [loop, items, currentPerView]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.reInit();
  }, [emblaApi, currentPerView, renderedItems.length]);

  const onSelect = useCallback((api) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const prev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const next = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const goTo = useCallback(
    (index) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  const basis = useMemo(() => 100 / currentPerView, [currentPerView]);

  const controlProps = useMemo(
    () => ({
      prev,
      next,
      goTo,
      currentIndex: items.length ? selectedIndex % items.length : 0,
      totalItems: items.length,
      perView: currentPerView,
    }),
    [prev, next, goTo, selectedIndex, items.length, currentPerView],
  );

  const slides = useMemo(
    () =>
      renderedItems.map((item, index) => (
        <SliderItem
          key={index}
          $basis={basis}
          $pad={slideGap / 2}
          className="slider-item"
        >
          {renderItem(item, items.length ? index % items.length : index)}
        </SliderItem>
      )),
    [renderedItems, items.length, basis, renderItem, slideGap],
  );

  return (
    <SliderRoot className="slider-root">
      {Controls && <Controls {...controlProps} />}

      <SliderViewport
        className="slider-viewport"
        ref={emblaRef}
        $viewportPadding={viewportPadding}
      >
        <SliderTrack className="slider-track">{slides}</SliderTrack>
      </SliderViewport>

      {BottomControls && <BottomControls {...controlProps} />}
    </SliderRoot>
  );
}

export default memo(Slider);

const SliderRoot = styled.div`
  position: relative;
`;

const SliderViewport = styled.div`
  overflow: hidden;
  width: 100%;
  padding: ${({ $viewportPadding }) => $viewportPadding || "0"};
`;

const SliderTrack = styled.div`
  display: flex;
  align-items: stretch;
  backface-visibility: hidden;
  touch-action: pan-y pinch-zoom;
`;

const SliderItem = styled.div`
  flex: 0 0 ${({ $basis }) => $basis}%;
  max-width: ${({ $basis }) => $basis}%;
  min-width: 0;
  box-sizing: border-box;
  padding: 0 ${({ $pad }) => $pad ?? 15}px;
`;
