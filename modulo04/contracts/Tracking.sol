pragma solidity ^0.5.10;

contract Tracking {
	enum Step { Supplier, SupplierToFactory, Factory, FactoryToStore}

	//State of each step
	// Unsigned Integers
	uint8 constant Waiting = 0;
	uint8 constant Running = 1;
	uint8 constant Finished = 2;

	//Steps
	// Supplier -> Factory -> Store
	uint8 public supplierState = Waiting;
	uint8 public supplierToFactoryState = Waiting;
	uint8 public factoryState = Waiting;
	uint8 public factoryToStoreState = Waiting;

	//Current Step
	// Will change over time
	Step public currentStep = Step.Supplier;

	//Tracking step change
	function next() public {
		if(currentStep == Step.Supplier) {
			supplierState++;
			if(supplierState == Finished) {
				currentStep = Step.SupplierToFactory;
			}
			return;
		}
		if(currentStep == Step.SupplierToFactory) {
			supplierToFactoryState++;
			if(supplierToFactoryState == Finished) {
				currentStep = Step.Factory;
			}
			return;
		}
		if(currentStep == Step.Factory) {
			factoryState++;
			if(factoryState == Finished) {
				currentStep = Step.FactoryToStore;
			}
			return;
		}
		//If all steps were executed, throw an error
		if(currentStep == Step.FactoryToStore) {
			if(factoryToStoreState == Finished) {
				revert("Process is already finished");
			}
			factoryToStoreState++;
			return;
		}
	}
}