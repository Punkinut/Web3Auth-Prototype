import { useState, useEffect } from "react";
import "../styles/globals.css";
import dynamic from "next/dynamic";
const Web3Import = dynamic(
  () => {
    return import("@web3auth/web3auth");
  },
  { ssr: false }
);
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import RPC from "../evm";
const { Web3Auth } = Web3Import;

const clientId =
  "BI85NN4KDzeQ7-pbsxaOlLKd59LqPPg5qqzWdaFkT07KLF62Na0h0S-1di44gwWOW5OewIExneumhXqL9yMHt9o";

function MyApp({ Component, pageProps }) {
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x1",
            rpcTarget: "https://rpc.ankr.com/eth", // This is the mainnet RPC we have added, please pass on your own endpoint while creating an app
          },
        });

        setWeb3auth(web3auth);

        await web3auth.initModal();
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
