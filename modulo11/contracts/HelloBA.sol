pragma solidity ^0.6.0;

contract HelloBA {
	event HelloFrom(address who);

	function hello() public {
		emit HelloFrom(msg.sender);
	}
}