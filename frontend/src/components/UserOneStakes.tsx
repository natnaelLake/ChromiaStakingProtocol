import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSessionContext, useEvmContext } from "./ContextProvider";

interface Stake {
  amount: number;
  yield_claimed: number;
  start_time: number;
}

const Container = styled.div`
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
`;

const Property = styled.div`
  margin-bottom: 0.5rem;
`;

const NoStakesMessage = styled.p`
  margin-top: 1rem;
`;

const UserOneStakes: React.FC = () => {
  const session = useSessionContext();
  const evmAddress = useEvmContext();
  const [stakes, setStakes] = useState<Stake[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchStakes = async () => {
      if (!session || !evmAddress) return;
      try {
        const userStakes = await session.query<any[]>("get_current_yield", {
          user_id: evmAddress,
        });
        setStakes(userStakes);
      } catch (error) {
        setMessage("Error fetching stakes");
        console.error(error);
      }
    };

    fetchStakes();
  }, [session, evmAddress]);

  return (
    <Container>
      <Title>User Stakes</Title>
      {stakes.length > 0 ? (
        <List>
          {stakes.map((stake, index) => (
            <ListItem key={index}>
              <Property>Amount: {stake.amount}</Property>
              <Property>Yield Claimed: {stake.yield_claimed}</Property>
              <Property>
                Start Time: {new Date(stake.start_time).toLocaleString()}
              </Property>
            </ListItem>
          ))}
        </List>
      ) : (
        <NoStakesMessage>No stakes found</NoStakesMessage>
      )}
      {message && <p className="mt-4">{message}</p>}
    </Container>
  );
};

export default UserOneStakes;
