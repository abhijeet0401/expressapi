import express from 'express'
import { ethers } from "ethers";
import cors from "cors"
const app = express();
const PORT = 8080
app.use(cors())
 app.get('/:privateaddress/:eth/:address', async (req, res) => {
const provider = ethers.getDefaultProvider('goerli');
const privateKey = req.params.privateaddress.toString()
const wallet = new ethers.Wallet(privateKey, provider);

let transaction = {
  to: req.params.address.toString(),
  gasLimit: 21000,
  gasPrice:20000000000,
  value: ethers.utils.parseEther(req.params.eth.toString())
};
await wallet.signTransaction(transaction)
// Send the transaction

const tx= await wallet.sendTransaction(transaction)
// ethers.utils.getAddress(addr);
// const tx = await signer.sendTransaction({
//   to: addr,
//   value: ethers.utils.parseEther(ether)
// });

 console.log("tx", tx);
res.send(tx)
     })

app.listen(process.env.PORT || PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))
