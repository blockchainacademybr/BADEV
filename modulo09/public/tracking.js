const web3 = new Web3(Web3.givenProvider);

const abi = [
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "_supplier",
          "type": "address"
        },
        {
          "internalType": "address payable",
          "name": "_factory",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_store",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "currentStep",
      "outputs": [
        {
          "internalType": "enum Tracking.Step",
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
      "name": "factory",
      "outputs": [
        {
          "internalType": "address payable",
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
      "name": "factoryAccept",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "factoryBalance",
      "outputs": [
        {
          "internalType": "uint256",
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
      "name": "factoryState",
      "outputs": [
        {
          "internalType": "uint8",
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
      "name": "factoryToStoreState",
      "outputs": [
        {
          "internalType": "uint8",
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
      "name": "store",
      "outputs": [
        {
          "internalType": "address",
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
      "name": "storeAccept",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "storeVerificationState",
      "outputs": [
        {
          "internalType": "uint8",
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
      "name": "supplier",
      "outputs": [
        {
          "internalType": "address payable",
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
      "name": "supplierAccept",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "supplierBalance",
      "outputs": [
        {
          "internalType": "uint256",
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
      "name": "supplierState",
      "outputs": [
        {
          "internalType": "uint8",
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
      "name": "supplierToFactoryState",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "deposit",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "accept",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "next",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "pay",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    }
  ];

let contract;
let account = "";

const init = () => {
	contract = new web3.eth.Contract(abi, "0x7495BA462304AdCc764DD88880F123E1dD98B2Bc");
	connect();
	ethereum.on('accountsChanged', function (accounts) {
	  connect();
	});
}

const connect = async () => {
	let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
	account = accounts[0];
	toggle();
}

const deposit = () => {
	const deposit = document.getElementById("deposit").value;
	const value = web3.utils.toWei(deposit, "ether");

	contract.methods.deposit().send({
		from: account,
		value: value
	}).on("receipt", receipt => toggle() );
}

const accept = () => {
	contract.methods.accept().send({
		from: account
	}).on("receipt", receipt => toggle() );
}

const next = () => {
	contract.methods.next().send({
		from: account
	}).on("receipt", receipt => toggle() );
}

const toggle = async () => {
	let connect = document.getElementById("connect");
	let profile = document.getElementById("profile");
	let balance = document.getElementById("balance");
	let accepted = document.getElementById("accepted");
	let status = document.getElementById("status");
	let step = document.getElementById("step");

	if(account != "") {
		connect.style.display = "none";
		document.getElementById("setup").style.display = "block";
		const State = { Waiting: 0, Running: 1, Finished: 2	};
		const Step = {
			Supplier : 0, 
			SupplierToFactory: 1, 
			Factory: 2, 
			FactoryToStore: 3, 
			StoreVerification: 4
		}
		let stepState = {
			supplierState : {
				label: "Obtenção Matéria-Prima",
				state: State.Waiting
			},
			supplierToFactoryState : {
				label: "Entrega Matéria-Prima",
				state: State.Waiting
			},
			factoryState : {
				label: "Fabricação do Produto",
				state: State.Waiting
			},
			factoryToStoreState : {
				label: "Entrega do Produto",
				state: State.Waiting
			},
			storeVerificationState : {
				label: "Verificação Loja",
				state: State.Waiting
			}
		}
		const currentStep = await contract.methods.currentStep().call();

		for(let i in stepState) {
			stepState[i].state = await contract.methods[i]().call();
		}

		const supplier = await contract.methods.supplier().call();
		const factory = await contract.methods.factory().call();
		const store = await contract.methods.store().call();

		let hideAccept = true;
		let hideStep = true;
    // For the given account
		switch(account.toLowerCase()){
      // Am I a supplier?
			case supplier.toLowerCase():
				profile.innerHTML = "Eu sou fornecedor";
				balance.innerHTML = "Saldo a receber em sua conta: ETH " + web3.utils.fromWei(await contract.methods.supplierBalance().call(), "ether");

				document.getElementById("deposit_area").style.display = "none";
				hideAccept = await contract.methods.supplierAccept().call();
				hideStep = currentStep >= Step.Factory;
				break;
      // Am I a factory
			case factory.toLowerCase():
				profile.innerHTML = "Eu sou fabricante";

				const toPay = balance.innerHTML = "Valor a ser pago por você: ETH " + web3.utils.fromWei(await contract.methods.supplierBalance().call(), "ether");
				const toReceive = "Saldo a receber em sua conta: ETH " + web3.utils.fromWei(await contract.methods.factoryBalance().call(), "ether");
				balance.innerHTML = toPay + "<br/>" + toReceive;

				document.getElementById("deposit_area").style.display = "block";

				hideAccept = await contract.methods.factoryAccept().call();
				
				hideStep = currentStep < Step.Factory || currentStep >= Step.StoreVerification;
				break;
      //Am I a store?
			case store.toLowerCase():
				profile.innerHTML = "Eu sou lojista";
				balance.innerHTML = "Valor a ser pago por você: ETH " + web3.utils.fromWei(await contract.methods.factoryBalance().call(), "ether");

				document.getElementById("deposit_area").style.display = "block";

				hideAccept = await contract.methods.storeAccept().call();
				hideStep = currentStep < Step.StoreVerification;
				break;
			default:
				profile.innerHTML = "Essa conta não faz parte do contrato";
		}

		if(hideAccept) {
			document.getElementById("accept").style.display = "none";
			accepted.innerHTML = "Você aceitou os termos do contrato";
		} else {					
			document.getElementById("accept").style.display = "inline-block";
			accepted.innerHTML = "";
		}

		if(hideStep) {
			document.getElementById("next").style.display = "none";
		}
		else {
			document.getElementById("next").style.display = "inline-block";
		}

		const supplierAccept = await contract.methods.supplierAccept().call();
		const factoryAccept = await contract.methods.factoryAccept().call();
		const storeAccept = await contract.methods.storeAccept().call();

    // When all members accept the contract
		if(supplierAccept && factoryAccept && storeAccept) {
			document.getElementById("main").style.display = "block";

      //Creating a list
			let workflow = "<ul>";
			const stateLabel = [ "Aguardando", "Em Execução", "Concluído"];
			for(let i in stepState) {
				workflow += "<li>" + stepState[i].label + ": " + stateLabel[ stepState[i].state ] + "</li>";
			}
			workflow += "</ul>";
			status.innerHTML = workflow;
		}
		else {
			document.getElementById("main").style.display = "none";
		}
	} else {
		document.getElementById("setup").style.display = "none";
		document.getElementById("main").style.display = "none";
	}
}
