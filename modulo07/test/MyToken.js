const MyToken = artifacts.require("MyToken.sol");

contract("MyToken", async accounts => {
	describe("when creating tokens", async () => {
		it("should send all tokens to contract owner", async () => {
			const owner = "0xD7D943F465181Ff17D78a45b04E9B37333344B24";
			let instance = await MyToken.deployed();

			const balance = await instance.balanceOf(owner);
			const totalSupply = await instance.totalSupply.call();

			assert.equal(balance.toNumber(), totalSupply.toNumber(), "Owner balance should be equal to total supply.");
		})

		it("should transfer tokens", async() => {
			const owner = "0xD7D943F465181Ff17D78a45b04E9B37333344B24";
			const alice = "0x9DB191Ec41D106AF9f6c7BCB1E8DCa3F308BED30";
			const bob = "0x1cC60b9B1aa2fcd49824D5920e8dd8d6C4cbB8EE";

			let instance = await MyToken.deployed();
			
			const ownerBalance = await instance.balanceOf(owner);
			const decimals = Math.pow(10, ((await instance.decimals.call()).toNumber()));

			await instance.transfer(alice, 10*decimals);
			assert.equal((await instance.balanceOf(alice)).toNumber(), 10*decimals, "Alice's balance should be 10");

			await instance.transfer(bob, 4.99999999*decimals, {
				from : alice
			});
			assert.equal((await instance.balanceOf(bob)).toNumber(), 4.99999999*decimals, "Bob's balance should be 4.99999999");

			assert.equal((await instance.balanceOf(owner)).toNumber(), ownerBalance.toNumber()-(10*decimals), "Owner's balance is incorrect");
		})

		it("should support allowance", async () => {
			const owner = "0xD7D943F465181Ff17D78a45b04E9B37333344B24";
			const alice = "0x9DB191Ec41D106AF9f6c7BCB1E8DCa3F308BED30";
			const bob = "0x1cC60b9B1aa2fcd49824D5920e8dd8d6C4cbB8EE";

			let instance = await MyToken.deployed();

			const ownerBalance = await instance.balanceOf(owner);
			const decimals = Math.pow(10, ((await instance.decimals.call()).toNumber()));

			await instance.approve(alice, 50*decimals);

			assert.equal((await instance.balanceOf(owner)).toNumber(), ownerBalance.toNumber(), "Owner's balance should not change with allowance");
			assert.equal((await instance.allowance(owner, alice)).toNumber(), 50*decimals, "Alice should be allowed to spend 50 tokens");

			await instance.transferFrom(owner, bob, 50*decimals, {
				from: alice
			});

			assert.equal((await instance.allowance(owner, alice)).toNumber(), 0, "Alice should have no tokens to transfer");

			assert.equal((await instance.balanceOf(owner)).toNumber(), ownerBalance.toNumber()-(50*decimals), "Owner's balance is incorrect");
		})
	})
})