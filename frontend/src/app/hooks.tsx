import { useSessionContext } from "@/components/ContextProvider";
import { useCallback, useEffect, useState } from "react";
import { RawGtv, DictPair } from "postchain-client";

// Custom hook for queries and operations
export function useQuery<
  TReturn extends RawGtv,
  TArgs extends DictPair | undefined = DictPair
>(name: string, args?: TArgs) {
  const session = useSessionContext();
  const [serializedArgs, setSerializedArgs] = useState(JSON.stringify(args));
  const [data, setData] = useState<TReturn | undefined>();

  // Function to send the query
  const sendQuery = useCallback(async () => {
    if (!session || !args) return;
    const data = await session.query<TReturn>({ name: name, args: args });
    setSerializedArgs(JSON.stringify(args));
    setData(data!!);
  }, [session, name, args]);

  // Trigger the query when session, query name, or arguments change
  useEffect(() => {
    sendQuery().catch(console.error);
  }, [session, name, serializedArgs]);

  // Return query result and reload function
  return {
    result: data,
    reload: sendQuery,
  };
}