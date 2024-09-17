// Set up Web3 and the smart contract
let web3;
let stakingContract;
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

window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        initContract();
        loadStakingEvents(); // Optionally, load events on page load
    } else {
        alert('Please install MetaMask!');
    }
});

function initContract() {
    stakingContract = new web3.eth.Contract(stakingContractABI, stakingContractAddress);
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

async function stakeTokens() {
    const amount = document.getElementById('stake-amount').value;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    try {
        await stakingContract.methods.stake(web3.utils.toWei(amount, 'ether')).send({ from: account });
        alert('Tokens staked successfully!');
        loadStakingEvents();  // Refresh events
    } catch (error) {
        console.error(error);
        alert('Error staking tokens.');
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
