pragma solidity ^0.6.0;

contract PrivateNetwork {
	address public owner;
	uint256 constant BOOTSTRAP_VALUE = 1000000000;

	event DepositFrom(address from, uint256 amount);

	constructor(address _owner) public {
		owner = _owner;
	}

	function deposit() payable public {
		emit DepositFrom(msg.sender, msg.value);
	}


	function bootstrap(address payable account) public {
		require(msg.sender == owner, "Only owner can bootstrap account");
		require(address(this).balance > BOOTSTRAP_VALUE, "Cannot bootstrap. We are out of money");

		account.transfer(BOOTSTRAP_VALUE);
	}
}