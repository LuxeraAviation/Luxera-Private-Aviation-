"use client";

import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styled from "styled-components";
import Image from "next/image";
import Banner from "@/imports/core/components/Banner";
import { PACKAGE_DETAILS_BANNER } from "@/imports/core/constants/banner";
import Container from "@/imports/core/atom/Container";
import Flex from "@/imports/core/atom/Flex";
import { theme } from "@/styles/Theme";
import { PACKAGE_DETAILS_DATA } from "@/imports/core/constants/packageData";
import CourseWidgets from "@/imports/Course-Details/components/CourseWidgets";
import PackageSidebar from "@/imports/Package-Details/components/PackageSidebar";

export default function PackageDetailsPage() {
  const data = PACKAGE_DETAILS_DATA;
  const [activeFaq, setActiveFaq] = useState(0);

  const galleryImages = data.gallery;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActiveGalleryIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  const goPrevGallery = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const goNextGallery = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const goToGallery = useCallback((idx) => emblaApi?.scrollTo(idx), [emblaApi]);

  return (
    <PageMain>
      <Banner banner={PACKAGE_DETAILS_BANNER} />

      <DetailsSection>
        <StyledContainer>
          <HeaderWrapper $direction="column">
            <ImageWrapper>
              <Image
                src={data.img}
                alt="Package Details"
                width={1140}
                height={515}
                priority
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            </ImageWrapper>
            <CourseWidgets stats={data.stats} />
          </HeaderWrapper>

          <ContentArea>
            <ContentGrid>
              <MainCol $direction="column">
                <PackageContent>
                  <SectionHeader>
                    <SectionTitle>{data.about.title}</SectionTitle>
                    <DescriptionText>{data.about.text}</DescriptionText>
                  </SectionHeader>

                  <HighlightsSection>
                    <SectionTitle>Tour Highlights</SectionTitle>
                    <HighlightsList>
                      {data.highlights.map((item, idx) => (
                        <HighlightItem key={idx}>
                          <CheckCircle>
                            <CheckIcon />
                          </CheckCircle>
                          <HighlightText>{item}</HighlightText>
                        </HighlightItem>
                      ))}
                    </HighlightsList>
                  </HighlightsSection>

                  <DescriptionText style={{ marginTop: "25px" }}>
                    {data.extraText}
                  </DescriptionText>

                  <PlanSection>
                    <SectionTitle>Included/Excluded</SectionTitle>
                    <PlanList>
                      {data.includedExcluded.map((item, idx) => (
                        <PlanItem key={idx}>
                          {item.included ? <SuccessIcon /> : <DangerIcon />}
                          <PlanText>{item.label}</PlanText>
                        </PlanItem>
                      ))}
                    </PlanList>
                  </PlanSection>

                  <GallerySection>
                    <SectionTitle>Gallery</SectionTitle>
                    <GallerySliderWrapper>
                      <GalleryViewport ref={emblaRef}>
                        <GalleryTrack>
                          {galleryImages.map((src, idx) => (
                            <GallerySlide key={idx}>
                              <Image
                                src={src}
                                alt={`Gallery image ${idx + 1}`}
                                width={770}
                                height={460}
                                style={{
                                  width: "100%",
                                  height: "auto",
                                  borderRadius: "5px",
                                  display: "block",
                                }}
                              />
                            </GallerySlide>
                          ))}
                        </GalleryTrack>
                      </GalleryViewport>
                      {galleryImages.length > 1 && (
                        <>
                          <SliderPrevBtn
                            onClick={goPrevGallery}
                            aria-label="Previous image"
                          >
                            <ChevronLeftIcon />
                          </SliderPrevBtn>
                          <SliderNextBtn
                            onClick={goNextGallery}
                            aria-label="Next image"
                          >
                            <ChevronRightIcon />
                          </SliderNextBtn>
                        </>
                      )}
                    </GallerySliderWrapper>
                    <GalleryDots>
                      {galleryImages.map((_, idx) => (
                        <GalleryDot
                          key={idx}
                          $active={idx === activeGalleryIndex}
                          onClick={() => goToGallery(idx)}
                          aria-label={`Go to image ${idx + 1}`}
                        />
                      ))}
                    </GalleryDots>
                  </GallerySection>

                  <FaqSection>
                    <SectionTitle>Tour Plan</SectionTitle>
                    <FaqWrapper>
                      {data.tourPlan.map((faq, idx) => {
                        const isOpen = activeFaq === idx;
                        return (
                          <FaqItem key={idx} $isOpen={isOpen}>
                            <FaqTitle
                              $isOpen={isOpen}
                              onClick={() => setActiveFaq(isOpen ? -1 : idx)}
                            >
                              <FaqTitleText>{faq.day}</FaqTitleText>
                              <RightIconWrapper>
                                <ChevronIcon
                                  className={
                                    isOpen
                                      ? "fas fa-chevron-up"
                                      : "fas fa-chevron-down"
                                  }
                                />
                              </RightIconWrapper>
                            </FaqTitle>
                            {isOpen && (
                              <FaqContent>
                                <FaqContentWrapper>
                                  <FaqThumb>
                                    <Image
                                      src="/image/faq-small.png"
                                      alt="faq thumb"
                                      width={150}
                                      height={120}
                                      style={{
                                        borderRadius: "5px",
                                        objectFit: "cover",
                                      }}
                                    />
                                  </FaqThumb>
                                  <FaqPara>
                                    <FaqParagraphText>
                                      {faq.text}
                                    </FaqParagraphText>
                                    <FaqPlanList>
                                      {faq.items.map((subItem, sIdx) => (
                                        <FaqPlanItem key={sIdx}>
                                          {subItem.included ? (
                                            <SuccessIcon />
                                          ) : (
                                            <DangerIcon />
                                          )}
                                          <FaqPlanText>
                                            {subItem.label}
                                          </FaqPlanText>
                                        </FaqPlanItem>
                                      ))}
                                    </FaqPlanList>
                                  </FaqPara>
                                </FaqContentWrapper>
                              </FaqContent>
                            )}
                          </FaqItem>
                        );
                      })}
                    </FaqWrapper>
                  </FaqSection>

                  <MapSection>
                    <SectionTitle>Tour Location</SectionTitle>
                    <MapWrapper>
                      <MapFrame
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3070.1899657893728!2d90.42380431666383!3d23.779746865573756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7499f257eab%3A0xe6b4b9eacea70f4a!2sManama+Tower!5e0!3m2!1sen!2sbd!4v1561542597668!5m2!1sen!2sbd"
                        title="Tour Location Map"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </MapWrapper>
                  </MapSection>
                </PackageContent>
              </MainCol>
              <SidebarCol $direction="column">
                <PackageSidebar sidebarData={data.sidebar} />
              </SidebarCol>
            </ContentGrid>
          </ContentArea>
        </StyledContainer>
      </DetailsSection>
    </PageMain>
  );
}

const DetailsSection = styled.section`
  padding: 120px 0;
  background-color: ${theme.white};
  overflow: hidden;

  @media (max-width: 991px) {
    padding: 80px 0;
  }
`;

const StyledContainer = styled(Container)`
  max-width: 1140px;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  margin-left: auto;
  margin-right: auto;
  overflow: visible;
`;

const HeaderWrapper = styled(Flex)`
  margin-bottom: 50px;
`;

const ImageWrapper = styled.div`
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  margin-bottom: 0px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

const ContentArea = styled.div`
  padding-top: 80px;

  @media (max-width: 991px) {
    padding-top: 40px;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 8fr 4fr;
  gap: 30px;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    gap: 50px;
  }
`;

const MainCol = styled(Flex)``;

const SidebarCol = styled(Flex)``;

const PackageContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionHeader = styled.div``;

const SectionTitle = styled.h3`
  font-family: ${theme.fonts.playfair};
  font-size: 24px;
  font-weight: 700;
  color: ${theme.dark};
  margin: 0 0 15px 0;
`;

const DescriptionText = styled.p`
  font-family: ${theme.fonts.mulish};
  font-size: 16px;
  line-height: 1.8;
  color: ${theme.text};
  margin: 0;
`;

const HighlightsSection = styled.div`
  margin-top: 30px;
`;

const HighlightsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const HighlightItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 15px;
`;

const CheckCircle = styled.div`
  width: 20px;
  height: 20px;
  line-height: 20px;
  background-color: #fff8ed;
  color: #19232d;
  border-radius: 50%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  flex-shrink: 0;
  margin-top: 2px;
`;

const CheckIcon = styled.i.attrs({ className: "fas fa-check" })``;

const HighlightText = styled.span`
  font-family: ${theme.fonts.mulish};
  font-size: 15px;
  font-weight: 700;
  color: #3d3d3d;
  line-height: 1.5;

  @media (max-width: 991px) {
    font-size: 14px;
  }
`;

const PlanSection = styled.div`
  margin-top: 40px;
`;

const PlanList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const PlanItem = styled.li`
  flex: 0 0 50%;
  width: 50%;
  margin-top: 10px;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;

  @media (max-width: 767px) {
    flex: 0 0 100%;
    width: 100%;
    font-size: 13px;
  }
`;

const PlanText = styled.span`
  font-family: ${theme.fonts.mulish};
  font-weight: 600;
  color: ${theme.text};
`;

const SuccessIcon = styled.i.attrs({ className: "far fa-check-circle" })`
  font-size: 18px;
  color: #28a745;
  flex-shrink: 0;
`;

const DangerIcon = styled.i.attrs({ className: "far fa-times-circle" })`
  font-size: 18px;
  color: #dc3545;
  flex-shrink: 0;
`;

const GallerySection = styled.div`
  margin-top: 60px;
`;

const GallerySliderWrapper = styled.div`
  position: relative;
  width: 100%;
  border-radius: 5px;
`;

const GalleryViewport = styled.div`
  overflow: hidden;
  width: 100%;
  border-radius: 5px;
`;

const GalleryTrack = styled.div`
  display: flex;
`;

const GallerySlide = styled.div`
  flex: 0 0 100%;
  min-width: 0;
`;

const SliderPrevBtn = styled.button`
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translateY(-50%);
  background: rgba(25, 35, 45, 0.7);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: ${theme.white};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.base};
    color: ${theme.dark};
  }
`;

const SliderNextBtn = styled.button`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  background: rgba(25, 35, 45, 0.7);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: ${theme.white};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${theme.base};
    color: ${theme.dark};
  }
`;

const ChevronLeftIcon = styled.i.attrs({ className: "fas fa-chevron-left" })``;
const ChevronRightIcon = styled.i.attrs({
  className: "fas fa-chevron-right",
})``;

const GalleryDots = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
`;

const GalleryDot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid ${theme.base};
  background-color: ${({ $active }) => ($active ? theme.base : "transparent")};
  padding: 0;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${theme.base};
  }
`;

const FaqSection = styled.div`
  margin-top: 60px;
`;

const FaqWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FaqItem = styled.div`
  background-color: white;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-bottom: 20px;
  overflow: hidden;
  transition: all 0.3s;
`;

const FaqTitle = styled.div`
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  margin-bottom: 0;
  transition: all 0.3s ease;
  background-color: ${(props) => (props.$isOpen ? theme.base : "white")};
  color: ${(props) => (props.$isOpen ? "#19232d" : theme.dark)};

  @media (max-width: 991px) {
    font-size: 15px;
  }
`;

const FaqTitleText = styled.h4`
  margin: 0;
  font-family: ${theme.fonts.mulish};
  font-weight: 700;
  font-size: 16px;
  color: inherit;
`;

const RightIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
`;

const ChevronIcon = styled.i`
  font-size: 16px;
`;

const FaqContent = styled.div`
  padding: 20px;
  background: ${theme.white};
  border-top: 1px solid #f5f3f1;
`;

const FaqContentWrapper = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 575px) {
    flex-direction: column;
  }
`;

const FaqThumb = styled.div`
  width: 150px;
  height: 120px;
  flex-shrink: 0;
  position: relative;

  @media (max-width: 575px) {
    width: 100%;
    height: 180px;
  }
`;

const FaqPara = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FaqParagraphText = styled.p`
  font-family: ${theme.fonts.mulish};
  font-size: 14px;
  line-height: 1.6;
  color: ${theme.text};
  margin: 0;
`;

const FaqPlanList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FaqPlanItem = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FaqPlanText = styled.span`
  font-family: ${theme.fonts.mulish};
  font-size: 14px;
  font-weight: 600;
  color: ${theme.text};
`;

const MapSection = styled.div`
  margin-top: 60px;
`;

const MapWrapper = styled.div`
  width: 100%;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.05);
`;

const MapFrame = styled.iframe`
  display: block;
  width: 100%;
  height: 450px;
  border: none;
  border-radius: 5px;
`;

const PageMain = styled.main``;
