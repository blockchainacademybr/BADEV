pragma solidity ^0.5.10;

contract Tracking {
	enum Step { Supplier, SupplierToFactory, Factory, FactoryToStore, StoreVerification}

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
	uint8 public storeVerificationState = Waiting;

	//Current Step
	// Will change over time
	Step public currentStep = Step.Supplier;

	//Roles
	address public supplier;
	address public factory;
	address public store;

	//Conctract creation
	constructor(address _supplier, address _factory, address _store) public {
		supplier = _supplier;
		factory = _factory;
		store = _store;
	}

	//Tracking step change
	function next() public {
		if(currentStep == Step.Supplier) {
			if(msg.sender != supplier) revert("User not allowed");
			supplierState++;
			if(supplierState == Finished) {
				currentStep = Step.SupplierToFactory;
			}
			return;
		}
		if(currentStep == Step.SupplierToFactory) {
			if(msg.sender != supplier) revert("User not allowed");
			supplierToFactoryState++;
			if(supplierToFactoryState == Finished) {
				currentStep = Step.Factory;
			}
			return;
		}
		if(currentStep == Step.Factory) {
			if(msg.sender != factory) revert("User not allowed");
			factoryState++;
			if(factoryState == Finished) {
				currentStep = Step.FactoryToStore;
			}
			return;
		}
		if(currentStep == Step.FactoryToStore) {
			if(msg.sender != factory) revert("User not allowed");
			factoryToStoreState++;
			if(factoryToStoreState == Finished) {
				currentStep = Step.StoreVerification;
			}
			return;
		}
		//If all steps were executed, throw an error
		if(currentStep == Step.StoreVerification) {
			if(msg.sender != store) revert("User not allowed");
			if(storeVerificationState == Finished) {
				revert("Process is already finished");
			}
			storeVerificationState++;
			return;
		}
	}
}