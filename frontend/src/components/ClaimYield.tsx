'use client'
import React, { useState } from "react";
import styled from "styled-components";
import { useSessionContext } from "./ContextProvider";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  background-color: #4a90e2;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 2rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3572b1;
  }
`;

const Message = styled.p`
  margin-top: 1rem;
  color: #333;
`;

const ClaimOneYield: React.FC = () => {
  const session = useSessionContext();
  const [message, setMessage] = useState<string>("");

  const handleClaim = async () => {
    if (!session) return;
    try {
      await session.call({
        name: "claim_yield",
      });
      setMessage("Yield claimed successfully");
    } catch (error) {
      setMessage("Error claiming yield");
      console.error(error);
    }
  };

  return (
    <Container>
      <Title>Claim Yield</Title>
      <Button onClick={handleClaim}>Claim</Button>
      {message && <Message>{message}</Message>}
    </Container>
  );
};

export default ClaimOneYield;
