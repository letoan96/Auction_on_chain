var app = angular.module("auctionApp", ['templates']);

app.controller("mainCtrl",['$scope','mainService','$rootScope',function($scope, mainService, $rootScope){
	$scope.init = function() {
		$scope.getItems();
		window.addEventListener('load', function() {
  		console.log('load web3');
  		if (typeof web3 !== 'undefined'){  	// Checking if Web3 has been injected by the browser (Mist/MetaMask)
    		var provider = web3.currentProvider // Use the browser's ethereum provider
    	}else{
    		console.log('No web3? You should consider trying MetaMask!')
    	}
  	})
		setInterval(function(){ // time countdown
			angular.forEach($scope.items, function(value, key){
				if (value.time_left["seconds"] == 0){
					if (value.time_left["minutes"] == 0){
						if (value.time_left["hours"] == 0){
							// makeDisabled(value.id)
						}
						value.time_left["hours"] --;
						value.time_left["minutes"] = 59;
						value.time_left["seconds"] = 59;
						$scope.$apply();
					}else{
						value.time_left["minutes"] --;
						value.time_left["seconds"] = 59;
						$scope.$apply();
					}
				}else{
					value.time_left["seconds"] --;
					$scope.$apply();
				}
			});
  		// $scope.count = $scope.count - 1;
  		// $scope.$apply();
  		// console.log($scope.count);
  	}, 1000);

	}

	$scope.getItems = function() {
		mainService.loadItems().then(function(data) {
			if (data.status == 200){
				$scope.items = data.data;
				console.log ("Loaded items");
				return data
			}else{
				console.log ("Fail");
			}
		}, function(err) {
			console.log(err);
		})
	}
	// $scope.makeDisabled = function(id){
	// 	document.getElementById("btn-" + id ).disabled = true;
	// }

	$scope.withdraw = function(item){
		alert("You are only able to withdraw if you are not the highest bidder - Dont forget to set your GAS");
		var web3 = window.web3
		Promise.all([fetch('/public_Auction_sol_Auction.abi').then(resp => resp.json()),	
			fetch('/public_Auction_sol_Auction.bin').then(resp => resp.text())
			])
			.then(([abi, bytecode]) => {
				const AuctionContract = web3.eth.contract(abi)
				const contract = AuctionContract.at(item.address)	
				contract.withdraw(function(err,res){
					console.log(res)
					console.log(err)
				})
			})
	}

	$scope.getUserBidded = function(item){
		var web3 = window.web3
		Promise.all([fetch('/public_Auction_sol_Auction.abi').then(resp => resp.json()),	
			fetch('/public_Auction_sol_Auction.bin').then(resp => resp.text())
			])
			.then(([abi, bytecode]) => {
				const AuctionContract = web3.eth.contract(abi)
				const contract = AuctionContract.at(item.address)	
				contract.showUserBidded.call(function(err,res){
						$scope.biddedAmount = res.c[0] / 10000
						$scope.$apply();
				})
				
			})
	}

	$scope.openBidForm = function(item){
		$scope.amount = item.price_step
		$scope.getUserBidded(item)
		$('#bid-modal-'+item.id).modal('toggle');

	}
	$scope.end = function(item){
		var web3 = window.web3
		Promise.all([fetch('/public_Auction_sol_Auction.abi').then(resp => resp.json()),	
			fetch('/public_Auction_sol_Auction.bin').then(resp => resp.text())
			])
			.then(([abi, bytecode]) => {
				const AuctionContract = web3.eth.contract(abi)
				const contract = AuctionContract.at(item.address)	
				contract.end(function(error,result){
						if (!error){
							mainService.updateCurrentPrice(item.id, {'is_ended': 1}).then(function(data){
	  					if (data.status == 200) {
	  							$scope.getItems();
	  							$scope.$apply();
	  					}else{
	  							console.log ("Update attribute failed");
	  					}
	  				})
						}
				})
				
			})
	}

	$scope.bid = function(item, amount, biddedAmount){
		var web3 = window.web3
		var value = amount
		var highest_price = (amount * 1 + biddedAmount) 
		Promise.all([
			fetch('/public_Auction_sol_Auction.abi').then(resp => resp.json()),
			fetch('/public_Auction_sol_Auction.bin').then(resp => resp.text())
			]).then(([abi, bytecode]) => {
				const AuctionContract = web3.eth.contract(abi)
				const contract = AuctionContract.at(item.address)		
  			contract.Bid({
  				from: web3.eth.accounts[0],
  				value: web3.toWei(value, "ether"),
  				gas: 40000000
  			},(error, result) => {
  				console.log(error, result);
  				if (!error){
	  				mainService.updateCurrentPrice(item.id, {'opening_price': highest_price}).then(function(data){
	  					if (data.status == 200) {
	  							$('#bid-modal-'+item.id).modal('hide');
	  							$scope.getItems();
	  							console.log ("Updated price");
	  					}else{
	  							console.log ("Update price fail");
	  					}
	  				})
  				}else{
  					$('.transaction-err-'+item.id).append("There were errors!!!");
  				}
  			})
  			

			})

			// if (success == true){
  	// 			mainService.updateCurrentPrice(item.id, {'opening_price': '10'}).then(function(data){
  	// 				if (data.status == 200) {
  	// 						console.log ("Updated price");
  	// 						location.reload();
  	// 				}else{
  	// 						console.log ("Update price fail");
  	// 				}
  	// 			})
  	// 	}
			
		}


		}]);