import React, { useState, useEffect } from "react";
import { useSessionContext, useEvmContext } from "./ContextProvider";

interface Stake {
  amount: number;
  yield_claimed: number;
  start_time: number;
}

const UserStakes: React.FC = () => {
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
    <div className="p-6">
      <h2>User Stakes</h2>
      {stakes.length > 0 ? (
        <ul>
          {stakes.map((stake, index) => (
            <li key={index} className="mb-4">
              <div>Amount: {stake.amount}</div>
              <div>Yield Claimed: {stake.yield_claimed}</div>
              <div>
                Start Time: {new Date(stake.start_time).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No stakes found</p>
      )}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default UserStakes;
