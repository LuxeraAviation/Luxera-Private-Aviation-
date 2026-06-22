"use client";

import { useState, Fragment } from "react";
import styled from "styled-components";
import Image from "next/image";
import { theme } from "@/styles/Theme";
import Flex from "@/imports/core/atom/Flex";

export default function ReviewsSection({ reviews: initialReviews }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newComment = {
      author: "Guest User",
      avatar: "/image/user.png",
      rating: Number(rating),
      badge: "awesome",
      text: comment,
    };

    const updatedComments = [newComment, ...reviews.comments];
    const totalCount = updatedComments.length;
    const starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    updatedComments.forEach((c) => {
      const r = Math.round(c.rating);
      if (starCounts[r] !== undefined) starCounts[r]++;
    });

    const sum = updatedComments.reduce((acc, c) => acc + c.rating, 0);
    const avg = (sum / totalCount).toFixed(1);

    const breakdown = [5, 4, 3, 2, 1].map((star) => {
      const count = starCounts[star];
      const percentage =
        totalCount > 0 ? `${Math.round((count / totalCount) * 100)}%` : "0%";
      return {
        stars: star,
        percentage,
        count: `${count} rating`,
      };
    });

    setReviews({
      averageRating: avg.endsWith(".0") ? avg.split(".")[0] : avg,
      totalReviews: `${totalCount} rating`,
      breakdown,
      comments: updatedComments,
    });

    setComment("");
    setRating(5);
    setShowForm(false);
  };

  return (
    <ReviewsWrapper>
      <Title>Reviews</Title>

      <SubHeaderRow $justifycontent="space-between" $alignitems="center">
        <SubTitle>Average Rating</SubTitle>
        <WriteReviewHeader onClick={() => setShowForm(!showForm)}>
          <WriteReviewSpan>
            <PenIcon /> Write a Review
          </WriteReviewSpan>
        </WriteReviewHeader>
      </SubHeaderRow>

      <RatingGrid>
        <RatingLeftCard
          $direction="column"
          $alignitems="center"
          $justifycontent="center"
        >
          <AverageScore>{reviews.averageRating}</AverageScore>
          <Stars>
            {[...Array(5)].map((_, i) =>
              i < Math.round(Number(reviews.averageRating)) ? (
                <StarIcon key={i} />
              ) : (
                <StarOutlineIcon key={i} />
              ),
            )}
          </Stars>
          <RatingCredit>{reviews.totalReviews}</RatingCredit>
        </RatingLeftCard>

        <RatingRightCard $direction="column">
          <BarList>
            {reviews.breakdown.map((item, idx) => (
              <BarItem key={idx}>
                <BarLabel>
                  <StarIcon /> {item.stars}
                </BarLabel>
                <ProgressOuter>
                  <ProgressInner $percentage={item.percentage} />
                </ProgressOuter>
                <BarCount>{item.count}</BarCount>
              </BarItem>
            ))}
          </BarList>
        </RatingRightCard>
      </RatingGrid>

      {showForm && (
        <ReviewForm onSubmit={handleSubmit}>
          <FormGroupRating>
            <StarRatingInput>
              {[5, 4, 3, 2, 1].map((val) => (
                <Fragment key={val}>
                  <input
                    type="radio"
                    id={`star-${val}`}
                    name="rating"
                    value={val}
                    checked={rating === val}
                    onChange={() => setRating(val)}
                  />
                  <label htmlFor={`star-${val}`}>{val} Stars</label>
                </Fragment>
              ))}
            </StarRatingInput>
          </FormGroupRating>
          <FormGroup>
            <TextArea
              placeholder="Write Reply"
              rows="5"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <SubmitButton type="submit">
              Comment Now <ArrowRightIcon />
            </SubmitButton>
          </FormGroup>
        </ReviewForm>
      )}

      <CommentList>
        {reviews.comments.map((comment, index) => (
          <CommentItem key={index}>
            <AuthorThumb>
              <Image
                src={comment.avatar}
                alt={comment.author}
                width={70}
                height={70}
              />
            </AuthorThumb>
            <CommentContent>
              <CommentContentHeader>
                <AuthorName>{comment.author}</AuthorName>
                <CommentStars>
                  {[...Array(5)].map((_, i) =>
                    i < comment.rating ? (
                      <StarIcon key={i} />
                    ) : (
                      <StarOutlineIcon key={i} />
                    ),
                  )}
                </CommentStars>
                {comment.badge && <Badge>{comment.badge}</Badge>}
              </CommentContentHeader>
              <CommentText>{comment.text}</CommentText>
            </CommentContent>
          </CommentItem>
        ))}
      </CommentList>
    </ReviewsWrapper>
  );
}

const ReviewsWrapper = styled.div`
  margin-top: 40px;
`;

const Title = styled.h3`
  font-family: ${theme.fonts.playfair};
  font-size: 24px;
  font-weight: 700;
  color: ${theme.dark};
  margin-top: 0px;
  margin-bottom: 25px;
`;

const SubHeaderRow = styled(Flex)`
  width: 100%;
`;

const SubTitle = styled.h4`
  font-family: ${theme.fonts.mulish};
  font-size: 16px;
  font-weight: 700;
  color: ${theme.dark};
  margin: 0;
  margin-bottom: 15px;
`;

const RatingGrid = styled.div`
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 30px;
  margin-bottom: 40px;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const RatingLeftCard = styled(Flex)`
  background-color: #f5f3f1;
  border: 1px solid #e5e5e5;
  padding: 40px 20px;
  text-align: center;
  border-radius: 10px;
  width: 160px;
  height: 230px;
  box-sizing: border-box;

  @media only screen and (max-width: 991px) {
    width: 100%;
    height: auto;
    padding: 30px 15px;
  }
`;

const RatingRightCard = styled(Flex)`
  background-color: #f5f3f1;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  padding: 40px 20px;
  justify-content: center;

  @media only screen and (max-width: 991px) {
    padding: 30px 15px;
  }
`;

const AverageScore = styled.span`
  font-family: ${theme.fonts.mulish};
  color: #dcbb87;
  font-size: 80px;
  line-height: 80px;
  font-weight: 900;
  margin-bottom: 0px;
`;

const Stars = styled(Flex)`
  margin-top: 10px;
  gap: 4px;
`;

const RatingCredit = styled.span`
  font-family: ${theme.fonts.mulish};
  margin-top: 10px;
  font-size: 14px;
  font-weight: 700;
  color: ${theme.dark};
`;

const WriteReviewHeader = styled.div`
  cursor: pointer;
`;

const WriteReviewSpan = styled.span`
  font-family: ${theme.fonts.mulish};
  color: #000;
  font-size: 16px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 15px;
`;

const PenIcon = styled.i.attrs({ className: "fas fa-pen" })`
  font-size: 12px;
  color: #000;
`;

const StarIcon = styled.i.attrs({ className: "fas fa-star" })`
  color: #dcbb87;
  font-size: 16px;
`;

const StarOutlineIcon = styled.i.attrs({ className: "far fa-star" })`
  color: #dcbb87;
  font-size: 16px;
`;

const ArrowRightIcon = styled.i.attrs({ className: "fas fa-arrow-right" })`
  font-size: 14px;
`;

const BarList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const BarItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 9px;
  width: 100%;
  gap: 15px;
`;

const BarLabel = styled.span`
  font-family: ${theme.fonts.mulish};
  margin-right: 10px;
  font-size: 14px;
  font-weight: 700;
  color: ${theme.dark};
  display: flex;
  align-items: center;
  gap: 6px;
  width: 40px;
  flex-shrink: 0;

  i {
    color: #dcbb87;
  }
`;

const ProgressOuter = styled.div`
  position: relative;
  display: block;
  flex: 1;
  height: 10px;
  background-color: #e5e5e5;
  border-radius: 25px;
`;

const ProgressInner = styled.div`
  position: absolute;
  width: ${(props) => props.$percentage};
  height: 100%;
  top: 0;
  left: 0;
  background: #dcbb87;
  border-radius: 25px;
  overflow: hidden;
  transition: width 1s ease;
`;

const BarCount = styled.span`
  font-family: ${theme.fonts.mulish};
  margin-left: 10px;
  font-size: 14px;
  font-weight: 700;
  color: ${theme.dark};
  width: 70px;
  text-align: right;
  white-space: nowrap;
  flex-shrink: 0;
`;

const ReviewForm = styled.form`
  margin-top: 20px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-bottom: 1px dashed #e5e0db;
  padding-bottom: 40px;
`;

const FormGroupRating = styled(Flex)``;

const StarRatingInput = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  margin-bottom: 20px;

  input {
    position: absolute;
    clip: rect(0, 0, 0, 0);
  }

  label {
    width: 1em;
    padding: 0 0.1em;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
    font-size: 200%;
    line-height: 1.2;
    color: #ddd;

    &:before {
      content: "★";
      border: none;
    }

    &:active {
      position: relative;
      top: 2px;
      left: 2px;
    }
  }

  input:checked ~ label {
    color: #dcbb87;
  }

  label:hover,
  label:hover ~ label {
    color: gold;
  }

  input:checked + label:hover,
  input:checked + label:hover ~ label,
  input:checked ~ label:hover,
  input:checked ~ label:hover ~ label,
  label:hover ~ input:checked ~ label {
    color: #ea0;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 15px 20px;
  border: 1px solid #e5e5e5;
  background-color: white;
  color: #3d3d3d;
  font-family: "Mulish", sans-serif;
  font-weight: 700;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border: 1px solid #dcbb87;
    background-color: white;
    color: #3d3d3d;
  }

  &::placeholder {
    color: #3d3d3d;
  }
`;

const SubmitButton = styled.button`
  align-self: flex-start;
  background: ${theme.base};
  border: 1px solid ${theme.base};
  color: ${theme.dark};
  font-family: ${theme.fonts.mulish};
  font-size: 15px;
  font-weight: 800;
  padding: 12px 30px;
  border-radius: 999px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: transparent;
    color: ${theme.base};
  }
`;

const CommentList = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
`;

const CommentItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 20px;
  margin-bottom: 20px;

  &:last-child {
    border: none;
    padding: 0;
    margin: 0;
  }

  @media only screen and (max-width: 459px) {
    display: block;
  }
`;

const AuthorThumb = styled.div`
  width: 70px;
  flex-shrink: 0;

  img {
    object-fit: cover;
  }
`;

const CommentContent = styled.div`
  width: calc(100% - 70px);
  padding-left: 30px;

  @media only screen and (max-width: 459px) {
    width: 100%;
    padding-left: 0;
    padding-top: 20px;
  }
`;

const CommentContentHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 10px;
`;

const AuthorName = styled.h4`
  margin: 0;
  margin-right: 30px;
  font-family: "Mulish", sans-serif;
  font-weight: 800;
  font-size: 18px;

  @media only screen and (max-width: 459px) {
    margin-right: 15px;
  }
`;

const CommentStars = styled.div`
  margin-right: 30px;
  display: flex;
  gap: 3px;

  @media only screen and (max-width: 459px) {
    margin-right: 15px;
  }
`;

const Badge = styled.span`
  background-color: #dcbb87;
  border-radius: 3px;
  padding: 2px 10px;
  font-size: 14px;
  font-weight: 700;
  color: white;

  @media only screen and (max-width: 459px) {
    padding: 2px 5px;
  }
`;

const CommentText = styled.p`
  font-family: ${theme.fonts.mulish};
  font-size: 16px;
  line-height: 1.6;
  color: ${theme.text};
  margin: 0;
`;
