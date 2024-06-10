import React, { useState } from "react";
import { useSessionContext } from "./ContextProvider";

const UnstakeTokens: React.FC = () => {
  const session = useSessionContext();
  const [amount, setAmount] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleUnstake = async () => {
    if (!session) return;
    try {
      await session.call({
        name: "initiate_unstake",
        args: [parseInt(amount)],
      });
      setMessage("Unstake request initiated successfully");
    } catch (error) {
      setMessage("Error initiating unstake request");
      console.error(error);
    }
  };

  const handleCompleteUnstake = async () => {
    if (!session) return;
    try {
      await session.call({
        name: "complete_unstake",
      });
      setMessage("Stake withdrawn successfully");
    } catch (error) {
      setMessage("Error withdrawing stake");
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h2>Unstake Tokens</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="w-full p-2 border rounded"
      />
      <button
        onClick={handleUnstake}
        className="bg-blue-500 hover:bg-blue-600 w-32 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Unstake
      </button>
      <button
        onClick={handleCompleteUnstake}
        className="bg-green-500 hover:bg-green-600 w-48 text-white font-bold py-2 px-4 rounded mt-4 ml-4"
      >
        Complete Unstake
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default UnstakeTokens;
