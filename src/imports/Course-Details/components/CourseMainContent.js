"use client";

import styled from "styled-components";
import { theme } from "@/styles/Theme";
import ReviewsSection from "./ReviewsSection";

export default function CourseMainContent({
  about,
  careerOpportunities,
  studyOptions,
  professionalExperience,
  reviews,
}) {
  return (
    <ContentWrapper>
      {about && (
        <SectionHeader>
          <SectionTitle>{about.title}</SectionTitle>
          <DescriptionText>{about.text}</DescriptionText>
        </SectionHeader>
      )}

      {careerOpportunities && (
        <ListSection>
          <SectionTitle>{careerOpportunities.title}</SectionTitle>
          <OpportunityList>
            {careerOpportunities.items.map((item, idx) => (
              <ListItem key={idx}>
                <CheckIconWrapper>
                  <CheckIcon />
                </CheckIconWrapper>
                <ListItemText>{item}</ListItemText>
              </ListItem>
            ))}
          </OpportunityList>
        </ListSection>
      )}

      {about && about.subText && (
        <DescriptionText style={{ marginTop: "25px" }}>
          {about.subText}
        </DescriptionText>
      )}

      {studyOptions && (
        <TableSection>
          <SectionTitle>{studyOptions.title}</SectionTitle>
          <TableResponsive>
            <CustomTable>
              <Thead>
                <Tr>
                  <Th>Qualification</Th>
                  <Th>Length</Th>
                  <Th>Code</Th>
                </Tr>
              </Thead>
              <Tbody>
                {studyOptions.rows.map((row, idx) => {
                  const isHons = row.qualification.includes("(Hons)");
                  const isBSC = row.qualification.includes("(BSC)");
                  let baseName = row.qualification;
                  let suffix = "";
                  if (isHons) {
                    baseName = row.qualification.replace("(Hons)", "").trim();
                    suffix = "(Hons)";
                  } else if (isBSC) {
                    baseName = row.qualification.replace("(BSC)", "").trim();
                    suffix = "(BSC)";
                  }

                  return (
                    <Tr key={idx}>
                      <Td data-label="Qualification">
                        {baseName} {suffix && <GoldSuffix>{suffix}</GoldSuffix>}
                      </Td>
                      <Td data-label="Length">{row.length}</Td>
                      <Td data-label="Code">
                        <CodeText>{row.code}</CodeText>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </CustomTable>
          </TableResponsive>
        </TableSection>
      )}

      {professionalExperience && (
        <SectionHeader style={{ marginTop: "30px" }}>
          <SectionTitle>{professionalExperience.title}</SectionTitle>
          <DescriptionText>{professionalExperience.text}</DescriptionText>
        </SectionHeader>
      )}

      <CourseDownloadArea className="course-download-area">
        <DownloadLeft>
          <PdfIconCircle>
            <PdfIcon />
          </PdfIconCircle>
          <DownloadTitle>Download full course Module</DownloadTitle>
        </DownloadLeft>
        <DownloadLink href="#0">
          Download <ArrowIcon />
        </DownloadLink>
      </CourseDownloadArea>

      <ReviewsSection reviews={reviews} />
    </ContentWrapper>
  );
}

const ContentWrapper = styled.div`
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

const ListSection = styled.div`
  margin-top: 30px;
`;

const OpportunityList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ListItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 15px;
`;

const CheckIconWrapper = styled.div`
  color: ${theme.base};
  font-size: 14px;
  margin-top: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ListItemText = styled.span`
  font-family: ${theme.fonts.mulish};
  font-size: 15px;
  font-weight: 600;
  color: ${theme.dark};
  line-height: 1.5;
`;

const TableSection = styled.div`
  margin-top: 40px;
`;

const TableResponsive = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: 6px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
`;

const CustomTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-family: ${theme.fonts.mulish};
  font-size: 16px;
`;

const Thead = styled.thead`
  @media (max-width: 768px) {
    display: none;
  }
`;

const Tbody = styled.tbody`
  @media (max-width: 768px) {
    display: block;
    width: 100%;
  }
`;

const Tr = styled.tr`
  @media (max-width: 768px) {
    display: block;
    width: 100%;
    margin-bottom: 15px;
    border: 1px solid #e5e0db;
    border-radius: 6px;
    overflow: hidden;
  }
`;

const Th = styled.th`
  padding: 18px 24px;
  border: 1px solid #e5e0db;
  background-color: ${theme.base};
  color: ${theme.dark};
  font-weight: 800;
  font-size: 16px;
`;

const Td = styled.td`
  padding: 15px 30px;
  border: 1px solid #e5e0db;
  color: ${theme.text};
  background-color: ${theme.white};
  font-weight: 500;

  ${Tr}:nth-child(even) & {
    background-color: #faf9f7;
  }

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    text-align: right;
    padding-left: 50%;
    position: relative;
    border: none;
    border-bottom: 1px solid #e5e0db;

    &:last-child {
      border-bottom: none;
    }

    &::before {
      content: attr(data-label);
      position: absolute;
      left: 20px;
      width: 45%;
      text-align: left;
      font-weight: 700;
      color: ${theme.dark};
    }
  }
`;

const CheckIcon = styled.i.attrs({ className: "fas fa-check" })`
  font-size: 14px;
`;

const PdfIcon = styled.i.attrs({ className: "far fa-file-pdf" })`
  font-size: 18px;
`;

const ArrowIcon = styled.i.attrs({ className: "fas fa-arrow-right" })`
  font-size: 14px;
`;

const GoldSuffix = styled.span`
  color: ${theme.base};
  font-weight: 700;
  margin-left: 4px;
`;

const CodeText = styled.span`
  color: ${theme.dark};
  font-weight: 700;
`;

const CourseDownloadArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(220, 187, 135, 0.1);
  border-radius: 6px;
  padding: 20px;
  margin: 40px 0 0 0;
  gap: 20px;
  height: 98px;
  box-sizing: border-box;
  border: 1px solid #e5e0db;

  @media (max-width: 575px) {
    flex-direction: column;
    align-items: stretch;
    padding: 20px;
    height: auto;
  }
`;

const DownloadLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const PdfIconCircle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${theme.dark};
  color: ${theme.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
`;

const DownloadTitle = styled.h4`
  font-family: ${theme.fonts.mulish};
  font-size: 24px;
  font-weight: 700;
  color: #3d3d3d;
  margin: 0;
`;

const DownloadLink = styled.a`
  border: 1px solid ${theme.dark};
  color: ${theme.dark};
  font-family: ${theme.fonts.mulish};
  font-size: 16px;
  font-weight: 800;
  padding: 10px 25px;
  border-radius: 99px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  justify-content: center;

  &:hover {
    background: transparent;
    color: ${theme.base};
  }
`;
