import React, { useState } from "react";
import { useSessionContext } from "./ContextProvider";

const ClaimYield: React.FC = () => {
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
    <div className="p-6">
      <h2>Claim Yield</h2>
      <button
        onClick={handleClaim}
        className="bg-blue-500 hover:bg-blue-600 w-32 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Claim
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default ClaimYield;
