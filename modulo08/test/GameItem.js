const GameItem = artifacts.require("GameItem.sol");

contract("GameItem", async accounts => {
	const player = "0xD7D943F465181Ff17D78a45b04E9B37333344B24";
	const friend = "0x9DB191Ec41D106AF9f6c7BCB1E8DCa3F308BED30";
	const other  = "0x1cC60b9B1aa2fcd49824D5920e8dd8d6C4cbB8EE";
	let instance, receipt, event;

	beforeEach(async () => {
		instance = await GameItem.deployed();

		receipt = await instance.awardItem(player, "Almighty Gem");
		event = {
			name : receipt.logs[0].event,
			...receipt.logs[0].args
		}
	})
	describe("when playing the game", async () => {
		it("should create a token for each item", async () => {
			assert.equal(event.name, "Transfer", "Transfer event should be triggered");
			assert.equal(player, event.to, "Token should be awarded to " + player);

			const balance = await instance.balanceOf(player);
			assert.equal(balance.toNumber(), 1, "Player should have 1 token");

			assert.equal(player, await instance.ownerOf.call(event.tokenId), "Player " + player + " should own token " + event.tokenId);

			const uri = await instance.tokenURI.call(event.tokenId);
			assert.equal(uri, "Almighty Gem");
		})
		it("should transfer token", async () => {
			await instance.transferFrom(player, friend, event.tokenId, {
				from: player
			});
			assert.equal(friend, await instance.ownerOf.call(event.tokenId), "Player " + friend + " should own token " + event.tokenId);
		})
		it("should support allowed transfer", async () => {
			await instance.approve(friend, event.tokenId, {
				from: player
			});
			assert.equal(friend, await instance.getApproved.call(event.tokenId), "Account " + friend + " should have access to token " + event.tokenId);

			await instance.safeTransferFrom(player, other, event.tokenId, {
				from: friend
			});
			assert.equal(other, await instance.ownerOf.call(event.tokenId), "Player " + other + " should own token " + event.tokenId);
		})
	})
})