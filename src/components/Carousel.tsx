import React, { useEffect, useState } from "react";
import styled from "@emotion/styled/macro";
import { css, keyframes } from "@emotion/react";
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";

/* assets */
import banner_01 from "../assets/img_banner_01.jpg";
import banner_02 from "../assets/img_banner_02.jpg";
import banner_03 from "../assets/img_banner_03.jpg";

interface IProps {
  position?: string;
  activeIdx?: number;
  isActive?: boolean;
  src?: string;
  length?: number;
}

const Carousel = () => {
  const banners = [banner_01, banner_02, banner_03];

  // 활성화된 idx
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // 다음 액션
  const handleNext = () => {
    setActiveIdx((activeIdx: number) => (activeIdx + 1) % banners.length);
  };

  useEffect(() => {
    console.log(activeIdx);
  }, [activeIdx]);

  // 이전 액션
  const handlePrev = () => {
    setActiveIdx(
      (activeIdx: number) => (activeIdx - 1 + banners.length) % banners.length
    );
  };

  const handleGoTo = (index: number) => setActiveIdx(index);

  const handleMouseEnter = () => setIsFocused(true);
  const handleMouseLeave = () => setIsFocused(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (!isFocused) {
      intervalId = setInterval(handleNext, 3000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isFocused]);

  return (
    <Base onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Title>Welcom to Carousel World,</Title>
      <Container>
        {banners.length && (
          <ArrowButton position="left" onClick={handlePrev}>
            <RiArrowDropLeftLine />
          </ArrowButton>
        )}
        <CarouselList>
          {banners.map((url, index) => (
            <CarouselListItem activeIdx={activeIdx} key={index}>
              <BannerImage src={url} alt="" />
            </CarouselListItem>
          ))}
        </CarouselList>
        {banners.length && (
          <ArrowButton position="right" onClick={handleNext}>
            <RiArrowDropRightLine />
          </ArrowButton>
        )}
      </Container>
      {banners.length && (
        <NavWrapper>
          {Array.from({ length: banners.length }).map((_, idx) => (
            <NavItem
              key={idx}
              isActive={activeIdx === idx}
              onClick={() => handleGoTo(idx)}
            />
          ))}
        </NavWrapper>
      )}
    </Base>
  );
};

/**** keyFrame ****/
const bounce = keyframes`
    0% {
        transform: translateY(0);    
    }
    50% {
        transform: translateY(-6px);
    }
    100% {
        transform: translateY(0);
    }
`;
/**** keyFrame ****/

const Base = styled.div``;

const Container = styled.div`
  position: relative;
`;

const ArrowButton = styled.button<IProps>`
  position: absolute;
  top: 50%;
  z-index: 1;
  padding: 8px 12px;
  font-size: 48px;
  font-weight: bold;
  background-color: transparent;
  color: #fff;
  border: none;
  margin: 0;
  cursor: pointer;
  ${({ position }) =>
    position === "left"
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `};
`;

const CarouselList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  overflow: hidden;
`;

const CarouselListItem = styled.li<IProps>`
  width: 100%;
  flex: 1 0 100%;
  transform: translateX(-${({ activeIdx }) => activeIdx && activeIdx * 100}%);
  transition: 2000ms ease-out;
  > img {
    width: 100%;
    height: 600px;
  }
`;

const NavWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 600px;
  object-fit: cover;
`;

const Title = styled.div`
  display: flex;
  padding: 6px 0;
  margin: 4px 0;
  align-items: center;
  justify-content: center;

  font-size: 16px;
  font-weight: bold;
  color: #fff;

  background-color: #7cb4c1;
`;

const NavItem = styled.div<IProps>`
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #38955f;
  margin: 0 4px;
  ${({ isActive }) =>
    isActive
      ? css`
          border-radius: 50%;
          opacity: 0.6;
          background-color: #38955f;
          animation: ${bounce} 1s ease-in-out 2;
        `
      : css`
          opacity: 0.3;
        `}
`;

export default Carousel;
