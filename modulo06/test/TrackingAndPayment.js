const TrackingAndPayment = artifacts.require("TrackingAndPayment.sol");

contract("TrackingAndPayment", async accounts => {
	describe("when tracking supply chain", async () => {
		it("should run payments during lifecycle", async () => {
			let instance = await TrackingAndPayment.deployed();
			const roles = {
				supplier : {
					account: await instance.supplier.call(),
					steps: 4
				},
				factory : {
					account: await instance.factory.call(),
					steps: 4,
					deposit: 1000000000000000000 // 1 ETH
				},
				store : {
					account: await instance.store.call(),
					steps: 2,
					deposit: 2000000000000000000 // 2 ETH
				}
			}

			for(let i in roles) {
				let role = roles[i];
				if(role.deposit) {
					await instance.deposit({
						from: role.account,
						value: role.deposit
					});
				}
			}

			const supplierBalance = await instance.supplierBalance.call();
			const factoryBalance = await instance.factoryBalance.call();

			assert.equal(supplierBalance, roles.factory.deposit, "Factory deposit doesn't match supplier balance");
			assert.equal(factoryBalance, roles.store.deposit, "Store deposit doesn't match factory balance");

			// All roles will accept
			for(let i in roles) {
				let role = roles[i];
				await instance.accept({ from: role.account });
			}

			// Each role will run its own steps
			for(let i in roles) {
				let role = roles[i];
				for(let j=0; j<role.steps; j++) {
					await instance.next({ from: role.account });
				}
			}

			// Check if contract still have funds
			assert.equal(await web3.eth.getBalance(instance.address), 0, "The contract still have funds");

			// Check if last step is finished
			assert.equal( (await instance.storeVerificationState.call()).toNumber(), 2, "Workflow is not finished" );

		})
	})
})