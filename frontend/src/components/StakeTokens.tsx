import React, { useState } from "react";
import { useSessionContext } from "./ContextProvider";

const StakeTokens: React.FC = () => {
  const session = useSessionContext();
  const [amount, setAmount] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleStake = async () => {
    if (!session) return;
    try {
      await session.call({
        name: "stake_tokens",
        args: [parseInt(amount)],
      });
      setMessage("Tokens staked successfully");
    } catch (error) {
      setMessage("Error staking tokens");
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h2>Stake Tokens</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="w-full p-2 border rounded"
      />
      <button
        onClick={handleStake}
        className="bg-blue-500 hover:bg-blue-600 w-32 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Stake
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default StakeTokens;
