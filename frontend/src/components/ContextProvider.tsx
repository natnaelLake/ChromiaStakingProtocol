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
      // 1. Initialize Client
      const client = await createClient({
        // nodeUrlPool: "http://localhost:7740",
        // blockchainIid: 0,
      });

      // 2. Connect with MetaMask
      const evmKeyStore = await createWeb3ProviderEvmKeyStore(window.ethereum);
      setEvmAddress(evmKeyStore.address);

      // 3. Get all accounts associated with evm address
      const evmKeyStoreInteractor = createKeyStoreInteractor(
        client,
        evmKeyStore
      );
      const accounts = await evmKeyStoreInteractor.getAccounts();

      if (accounts.length > 0) {
        // 4. Start a new session
        setSession(
          await evmKeyStoreInteractor.getLoginManager().login({
            accountId: accounts[0].id,
            config: {
              flags: ["MySession"],
            },
          })
        );
      } else {
        // 5. Create a new account by signing a message using metamask
        // 5.1 Sign message using metamask
        const msg: string = await client.query("evm.get_register_message", {
          evm_address: evmKeyStore.address,
        });
        const signature = await evmKeyStore.signMessage(msg);

        // 5.2 Create a session keypair (SignatureProvider) and register account on dapp
        const sessionSignatureProvider = newSignatureProvider();
        await client.signAndSendUniqueTransaction(
          {
            name: "register_account",
            args: [
              getRandomUserName(),
              evmKeyStore.address,
              [signature.r, signature.s, signature.v],
            ],
          },
          sessionSignatureProvider
        );
        const account = (await evmKeyStoreInteractor.getAccounts())[0];
        // 6. Get session connected to the session keypair
        const sessionKeyStore = createInMemoryFtKeyStore(
          sessionSignatureProvider
        );
        const sessionKeyStoreInteractor = createKeyStoreInteractor(
          client,
          sessionKeyStore
        );
        setSession(await sessionKeyStoreInteractor.getSession(account.id));
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
