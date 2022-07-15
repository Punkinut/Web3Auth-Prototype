import Web3 from "web3";

export default class EthereumRpc {
  provider;

  constructor(provider) {
    this.provider = provider;
  }
  async getAccounts() {
    try {
      const web3 = new Web3(this.provider);
      const accounts = await web3.eth.getAccounts();
      return accounts;
    } catch (error) {
      return error;
    }
  }

  async getBalance() {
    try {
      const web3 = new Web3(this.provider);
      const accounts = await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(accounts[0]);
      return balance;
    } catch (error) {
      return error;
    }
  }

  async signMessage() {
    try {
      const web3 = new Web3(this.provider);
      const accounts = await web3.eth.getAccounts();
      const message =
        "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad";
      web3.currentProvider?.send(
        {
          method: "eth_sign",
          params: [accounts[0], message],
          from: accounts[0],
        },
        (err, result) => {
          if (err) {
            return console.error(err);
          }
          return result;
        }
      );
    } catch (error) {
      return error;
    }
    return;
  }

  async signTransaction() {
    try {
      const web3 = new Web3(this.provider);
      const accounts = await web3.eth.getAccounts();
      const txRes = await web3.eth.signTransaction({
        from: accounts[0],
        to: accounts[0],
        value: web3.utils.toWei("0.01"),
      });
      return txRes.raw;
    } catch (error) {
      return error;
    }
  }

  async signAndSendTransaction() {
    try {
      const web3 = new Web3(this.provider);
      const accounts = await web3.eth.getAccounts();

      const txRes = await web3.eth.sendTransaction({
        from: accounts[0],
        to: accounts[0],
        value: web3.utils.toWei("0.01"),
      });
      return txRes.transactionHash;
    } catch (error) {
      return error;
    }
  }
}
