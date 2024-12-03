import styled from "styled-components";

type OverlayProps = {
  bgColor?: string;
  children: React.ReactNode;
};

const OverlayContainer = styled.div<{ $bgColor: string }>`
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  z-index: 10;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ $bgColor }) => $bgColor || "none"};
  }
`;

const OverlayContent = styled.div`
  z-index: 20;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default function Overlay({ bgColor = "", children }: OverlayProps) {
  return (
    <OverlayContainer $bgColor={bgColor}>
      <OverlayContent>{children}</OverlayContent>
    </OverlayContainer>
  );
}
