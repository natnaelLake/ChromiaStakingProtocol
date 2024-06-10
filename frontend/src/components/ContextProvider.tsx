"use client";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getRandomUserName } from "@/app/user";
import {
  EvmKeyStore,
  Session,
  createInMemoryFtKeyStore,
  createKeyStoreInteractor,
  createWeb3ProviderEvmKeyStore,
} from "@chromia/ft4";
import { createClient, IClient, newSignatureProvider } from "postchain-client";

// Create contexts for Chromia and EVM wallet
const ChromiaContext = createContext<Session | undefined>(undefined);
const EvmContext = createContext<Buffer | undefined>(undefined);

declare global {
  interface Window {
    ethereum: any;
  }
}

export function ContextProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [evmAddress, setEvmAddress] = useState<Buffer | undefined>(undefined);

  useEffect(() => {
    const initSession = async () => {
      console.log("Initializing Session");
      const client = await createClient({
        nodeUrlPool: "http://localhost:7740",
        blockchainIid: 0,
      });

      try {
        const store: EvmKeyStore = await createWeb3ProviderEvmKeyStore(
          window.ethereum
        );
        const { getAccounts, getSession } = createKeyStoreInteractor(
          client,
          store
        );
        setEvmAddress(store.address);
        const accounts = await getAccounts();
        const { login, logout } = createKeyStoreInteractor(
          client,
          store
        ).getLoginManager();
        if (accounts.length > 0) {
          const { account } = await login({
            accountId: accounts[0].id,
            config: {
              flags: ["MySession"],
            },
          });
          console.log("===============", accounts[0].id);
          const session = await getSession(accounts[0].id);
          setSession(session);
          logout(accounts[0].id);
        } else {
          const msg: string = await client.query("evm.get_register_message", {
            evm_address: store.address,
          });
          const signature = await store.signMessage(msg);
          const sessionSignatureProvider = newSignatureProvider();
          await client.signAndSendUniqueTransaction(
            {
              name: "register_account",
              args: [
                getRandomUserName(),
                store.address,
                [signature.r, signature.s, signature.v],
              ],
            },
            sessionSignatureProvider
          );
          const account = (await getAccounts())[0];
          const sessionKeyStore = createInMemoryFtKeyStore(
            sessionSignatureProvider
          );
          const sessionKeyStoreInteractor = createKeyStoreInteractor(
            client,
            sessionKeyStore
          );
          setSession(await sessionKeyStoreInteractor.getSession(account.id));
        }
      } catch (error) {
        console.error("Error during session initialization:", error);
      }

      console.log("Session initialized");
    };

    initSession().catch(console.error);
  }, []);

  return (
    <ChromiaContext.Provider value={session}>
      <EvmContext.Provider value={evmAddress}>{children}</EvmContext.Provider>
    </ChromiaContext.Provider>
  );
}

export function useEvmContext() {
  return useContext(EvmContext);
}

export function useSessionContext() {
  return useContext(ChromiaContext);
}
