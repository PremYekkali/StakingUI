// Set up Web3 and the smart contract
let web3;
let stakingContract;
let currentAccount;
const stakingContractAddress = '0x1231DF9091BcBf76cd227a1031E362B7E350bBB8';
const stakingContractABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "stake",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "updateGlobalYield",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdrawInterest",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withdrawStakeAndInterest",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_stakeToken",
				"type": "address"
			},
			{
				"name": "_rewardToken",
				"type": "address"
			},
			{
				"name": "_stakingPeriod",
				"type": "uint256"
			},
			{
				"name": "_totalRewardToBeDistributed",
				"type": "uint256"
			},
			{
				"name": "_stakingStart",
				"type": "uint256"
			},
			{
				"name": "_vaultAdd",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "staker",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_globalYieldPerToken",
				"type": "uint256"
			}
		],
		"name": "Staked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "staker",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_globalYieldPerToken",
				"type": "uint256"
			}
		],
		"name": "StakeWithdrawn",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "staker",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_value",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_globalYieldPerToken",
				"type": "uint256"
			}
		],
		"name": "InterestCollected",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_staker",
				"type": "address"
			}
		],
		"name": "calculateInterest",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_staker",
				"type": "address"
			}
		],
		"name": "getStakerData",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_staker",
				"type": "address"
			}
		],
		"name": "getStatsData",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_staker",
				"type": "address"
			}
		],
		"name": "getYieldData",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "interestData",
		"outputs": [
			{
				"name": "globalTotalStaked",
				"type": "uint256"
			},
			{
				"name": "globalYieldPerToken",
				"type": "uint256"
			},
			{
				"name": "lastUpdated",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "stakingPeriod",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "stakingStartTime",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalReward",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "vaultAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

const tokenABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "from",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "burnFrom",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newOperator",
				"type": "address"
			}
		],
		"name": "changeOperator",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "account",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "to",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "from",
				"type": "address"
			},
			{
				"name": "to",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_initialSupply",
				"type": "uint256"
			},
			{
				"name": "_initialTokenHolder",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "owner",
				"type": "address"
			},
			{
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "operator",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
const tokenAddress = '0xa95d8e49d072b108Ac12D03DFFdF8C941A6f25b3';

let tokenContract;

async function getAllowance(owner, spender) {
    return await tokenContract.methods.allowance(owner, spender).call();
}

async function approveTokens(spender, amount) {
    return new Promise((resolve, reject) => {
        tokenContract.methods.approve(spender, amount).send({ from: currentAccount })
        .on('transactionHash', function(hash) {
            console.log('Transaction hash:', hash);
        })
        .on('receipt', function(receipt) {
            console.log('Transaction receipt:', receipt);
            resolve(receipt);
        })
        .on('error', function(error) {
            console.error('Error approving tokens:', error);
            reject(error);
        });
    });
}

window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        currentAccount = accounts[0];
        console.log("address:   ",currentAccount);
        initContract();
        loadStakingEvents(); // Optionally, load events on page load
    } else {
        alert('Please install MetaMask!');
    }
});

function initContract() {
    stakingContract = new web3.eth.Contract(stakingContractABI, stakingContractAddress);
    tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
}

async function loadStakingEvents() {
    const eventsContainer = document.getElementById('events-container');
    if (!eventsContainer) {
        console.error('Element with ID "events-container" not found');
        return;
    }
    eventsContainer.innerHTML = ''; // Clear previous events

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    // Helper function to get block timestamp
    async function getBlockTimestamp(blockNumber) {
        const block = await web3.eth.getBlock(blockNumber);
        return block.timestamp;
    }

    // Listen for Staked events
    stakingContract.events.Staked({
        filter: { staker: account }, // Optional: filter for the current account
        fromBlock: 0,
        toBlock: 'latest'
    })
    .on('data',async event => {
        const eventData = event.returnValues;
        const timestamp = await getBlockTimestamp(event.blockNumber);
        const eventDate = new Date(timestamp * 1000).toLocaleString();
        const eventElement = document.createElement('div');
        console.log(JSON.stringify(eventData));
        eventElement.innerText = `Staked ${web3.utils.fromWei(eventData.value, 'ether')} ETH at ${eventDate}`;
        eventsContainer.appendChild(eventElement);
    })
    .on('error', console.error);

    // Listen for StakeWithdrawn events
    stakingContract.events.StakeWithdrawn({
        filter: { staker: account }, // Optional: filter for the current account
        fromBlock: 0,
        toBlock: 'latest'
    })
    .on('data',async event => {
        const eventData = event.returnValues;
        const timestamp = await getBlockTimestamp(event.blockNumber);
        const eventDate = new Date(timestamp * 1000).toLocaleString();
        const eventElement = document.createElement('div');
        eventElement.innerText = `Unstaked ${web3.utils.fromWei(eventData.value, 'ether')} ETH at ${eventDate}`;
        eventsContainer.appendChild(eventElement);
    })
    .on('error', console.error);
}

async function stakeTokens(amount) {
    try {
        const allowance = await getAllowance(currentAccount, stakingContractAddress);
        const amountInWei = web3.utils.toWei(amount, 'ether');

        if (web3.utils.toBN(allowance).lt(web3.utils.toBN(amountInWei))) {
            console.log('Allowance is insufficient. Requesting approval...');
            showLoader();
            await approveTokens(stakingContractAddress, amountInWei);
            hideLoader();
        }

        // Proceed with staking
        stakingContract.methods.stake(amountInWei).send({ from: currentAccount })
        .on('transactionHash', function(hash) {
            console.log('Staking transaction hash:', hash);
        })
        .on('receipt', function(receipt) {
            console.log('Staking transaction receipt:', receipt);
            loadStakingEvents(); // Refresh events after staking
        })
        .on('error', function(error) {
            console.error('Error staking tokens:', error);
        });
    } catch (error) {
        console.error('Error in staking process:', error);
    }
}

async function unstakeTokens() {
    const amount = document.getElementById('unstake-amount').value;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    try {
        await stakingContract.methods.withdrawStakeAndInterest(web3.utils.toWei(amount, 'ether')).send({ from: account });
        alert('Tokens unstaked successfully!');
        loadStakingEvents();  // Refresh events
    } catch (error) {
        console.error(error);
        alert('Error unstaking tokens.');
    }
}

async function withdrawInterest() {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    try {
        await stakingContract.methods.withdrawInterest().send({ from: account });
        alert('Interest withdrawn successfully!');
        loadStakingEvents();  // Refresh events
    } catch (error) {
        console.error(error);
        alert('Error withdrawing interest.');
    }
}

const loader = document.getElementById('loader'); // Get the loader element

function showLoader() {
    loader.style.display = 'block'; // Show the loader
}

function hideLoader() {
    loader.style.display = 'none'; // Hide the loader
}

async function mintStakeTokens() {
    if (!window.ethereum) {
        alert('Please install MetaMask!');
        return;
    }

    const accounts = await web3.eth.requestAccounts();
    const currentAccount = accounts[0];
    const amountToMint = document.getElementById('mint-amount').value;

    if (!amountToMint || isNaN(amountToMint) || amountToMint <= 0) {
        alert('Please enter a valid amount to mint.');
        return;
    }

    // Convert amount to the appropriate units
    const amountInWei = web3.utils.toWei(amountToMint, 'ether');

    try {
        // Call the mint function on the contract
        await tokenContract.methods.mint(currentAccount, amountInWei).send({ from: currentAccount });
        alert('Tokens minted successfully!');
    } catch (error) {
        console.error('Error minting tokens:', error);
        alert('Error minting tokens. Check console for details.');
    }
}