// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of th
// compiled file. JavaScript code in this file should be added after the last require_* statement
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require angular
//= require bootstrap-sprockets
//= require angular-ui-router
//= require angular-rails-templates
//= require rails-ujs
//= require_tree .

// var web3 = window.web3

// Promise.all([
//   // fetch('/contracts_Voting_sol_Ballot.abi').then(resp => resp.json()),
//   // fetch('/contracts_Voting_sol_Ballot.bin').then(resp => resp.text())
//   fetch('/public_contracts_contracts_Auction_sol_Auction.abi').then(resp => resp.json()),
//   fetch('/public_contracts_contracts_Auction_sol_Auction.bin').then(resp => resp.text())
// ]).then(([abi, bytecode]) => {
//   const VotingContract = web3.eth.contract(abi)

//   // "0x1f5ecf516d419d49d0ad1e6d56f17ffdc64db3eb"

//   const contract = VotingContract.at("0x1f5ecf516d419d49d0ad1e6d56f17ffdc64db3eb")

//   contract.chairperson((error, address) => console.log(address))

//   // VotingContract.new(['Germany', 'Brazil'], {
//   //   data: bytecode
//   // }, (error, contract) => {
//   //   console.log(error, contract)
//   // })
// }) solcjs --bin --abi public/Auction.sol --output-dir app/public
