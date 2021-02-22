pragma solidity ^0.5.10;

contract Store {
	// Owner of the contract
	// will receive payments
	address payable public owner;

	// Store control variables
	uint256 public price;
	uint64 public stock;

	// Points control
	mapping(address => uint256) points;
	address[] buyers;

	event NewSale(address indexed buyer, uint256 points);
	event ChangeReceipt(address indexed buyer, uint256 change);

	constructor(uint64 _stock, uint256 _price) public {
		owner = msg.sender;
		stock = _stock;
		price = _price;
	}

	function buy() payable public {
		require(stock > 0, "There are no products available.");
		require(msg.value >= price, "Value doesn't afford price.");

		uint256 change = msg.value%price;
		if(change > 0) {
			msg.sender.transfer(change);
			emit ChangeReceipt(msg.sender, change);
		}

		owner.transfer(msg.value-change);

		uint64 reward = uint64(msg.value/price); //Type cast

		if(points[msg.sender] == 0) buyers.push(msg.sender);
		points[msg.sender] += reward;

		emit NewSale(msg.sender, reward);

		stock -= reward;
	}

	function getPoints() public view returns(uint256) {
		uint256 total = 0;
		for(uint64 i=0; i<buyers.length; i++) {
			total += points[ buyers[i] ];
		}
		return total;
	}

	function getBalance(address buyer) public view returns(uint256) {
		return points[buyer];
	}
}