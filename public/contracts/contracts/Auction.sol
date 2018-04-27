pragma solidity ^0.4.16;

contract Auction {

	uint8 public step;
	uint256 public endTime;
	uint256 public currentPrice;
	address public contractOwner;
	address public highestBidder;
	bool public isEnded;

	event HighestBidIncreased(address currentHighestBidder, uint currentPrice);
  	event AuctionEnded(address highestBidder, uint finalPrice);


	function Auction(uint8 _step, uint _minPrice, uint _endTime) public {
		endTime = now + _endTime * 1 hours;
		currentPrice = _minPrice;
		contractOwner = msg.sender;
		step = _step;
	}

	struct Participant {
		uint bid_amount;
	}

	mapping (address => Participant) bids;

	Participant[] public participants;

	function Bid() public payable {

		require (msg.value > currentPrice && msg.value >= 1);
		bids[msg.sender].bid_amount += msg.value;
		currentPrice = msg.value;
		highestBidder = msg.sender;		
		emit HighestBidIncreased(highestBidder, currentPrice);
	}

	function showCurrentPrice() public constant returns (uint256 _currentPrice, address _highestBidder) {
				_currentPrice = currentPrice;
				_highestBidder = highestBidder;
	}

	function withdraw() public returns (bool){
		require (msg.sender != highestBidder); // prevent who is the highestBidder withdraw
		require (bids[msg.sender].bid_amount > 0);

		uint withdraw_amount = bids[msg.sender].bid_amount;
		bids[msg.sender].bid_amount = 0;
		if (!msg.sender.send(withdraw_amount)){
			bids[msg.sender].bid_amount = withdraw_amount;
			return false;
		}
		return true;
	}

	function end() public {
		require(msg.sender == contractOwner);
		require(now >= endTime && isEnded == false);
		isEnded = true;
		emit AuctionEnded(highestBidder, currentPrice);
		contractOwner.transfer(currentPrice);
	}
}