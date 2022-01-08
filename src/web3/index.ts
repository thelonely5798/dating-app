import Web3 from 'web3'
var provider = 'https://data-seed-prebsc-1-s1.binance.org:8545/';
var web3Provider = new Web3.providers.HttpProvider(provider);

export const web3 = new Web3(web3Provider);
export const contractAddress = "0x502C45A37D42cFE6ED7bC7706b3a3214068Ae2C2"

const abi: any =  [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "content",
        "type": "bytes"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timeStamp",
        "type": "uint256"
      }
    ],
    "name": "SendMessage",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "arrUser",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      },
      {
        "internalType": "int8",
        "name": "lng",
        "type": "int8"
      },
      {
        "internalType": "int8",
        "name": "lat",
        "type": "int8"
      },
      {
        "internalType": "bool",
        "name": "exists",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "target",
        "type": "address"
      },
      {
        "internalType": "bytes",
        "name": "content",
        "type": "bytes"
      }
    ],
    "name": "sendMessage",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "content",
            "type": "bytes"
          },
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "timeStamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct Message[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "getMessagesBySender",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "content",
            "type": "bytes"
          },
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "timeStamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct Message[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      }
    ],
    "name": "getMessagesByTarget",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "bytes",
            "name": "content",
            "type": "bytes"
          },
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "timeStamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct Message[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "setUser",
    "outputs": [
      {
        "internalType": "bool",
        "name": "_success",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getUser",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "_address",
            "type": "address"
          },
          {
            "internalType": "int8",
            "name": "lng",
            "type": "int8"
          },
          {
            "internalType": "int8",
            "name": "lat",
            "type": "int8"
          },
          {
            "internalType": "bool",
            "name": "exists",
            "type": "bool"
          }
        ],
        "internalType": "struct User",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
export const myContract = new web3.eth.Contract(abi, contractAddress)


export const sendMessageByContract = async ({ from, to, content }) => {
  const nonce = await web3.eth.getTransactionCount(from)
  content = web3.utils.utf8ToHex(content)
  return myContract.methods.sendMessage(to, content).send({ from, gas: 400000 })
}

const mapArrayMessageToArrayJson = (arr: Array<any>) => {
  return arr.map(message => ({ from: message[0], to: message[1], content: Buffer.from(web3.utils.hexToBytes(message[2])).toString(), id: message[3], timeStamp: message[4] }))
}

export const getMessagesBySender = async ({ from, to }) => {
    const messages = await myContract.methods.getMessagesBySender(to).call({ from })
    return mapArrayMessageToArrayJson(messages)
}

export const getMessagesByTarget = async ({ from, to }) => {
    const messages = await myContract.methods.getMessagesByTarget(to).call({ from })
    return mapArrayMessageToArrayJson(messages)
}