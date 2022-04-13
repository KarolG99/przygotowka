import styled from "styled-components";

export const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  padding: 1.75rem;
  z-index: 10;
  width: 80vw;
  max-width: 300px;
  background-color: ${({ theme }) => theme.colors.white};
  max-height: 50vh;
  overflow: scroll;
  margin-bottom: 1.75rem;

  -webkit-box-shadow: 0px 20px 31px 10px rgba(170, 170, 170, 1);
  -moz-box-shadow: 0px 20px 31px 10px rgba(170, 170, 170, 1);
  box-shadow: 0px 20px 31px 10px rgba(170, 170, 170, 1);

  &::-webkit-scrollbar {
    display: none;
  }

  .buttons-wrapper {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-top: 20px;

    button {
      padding: 4px 9px;
      border: none;
      border-radius: 10px;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.white};
      font-size: 18px;
      cursor: pointer;

      &.yes {
        background-color: ${({ theme }) => theme.colors.green};
      }
      &.no {
        background-color: ${({ theme }) => theme.colors.red};
      }
    }
  }
`;
