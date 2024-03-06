//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./BloomPoint.sol";
import "./Garden.sol";

contract Bloomville {
  BloomPoint bloomPoint;

  address public immutable owner;
  uint256 public constant tokensPerEth = 1000000000;

  uint256 public totalGardens = 0;
  UserGarden[] public userGardens;
  mapping(address => uint) public contractaddressToUsergarden;

  struct UserGarden {
    uint256 id;
    address owner;
    address contractAdress;
    string url;
  }

  event BuyTokens(address buyer, uint256 amountOfETH, uint256 amountOfTokens);

  constructor(address _owner, address _tokenAddress) {
    owner = _owner;
    bloomPoint = BloomPoint(_tokenAddress);
  }

  modifier isOwner() {
    require(msg.sender == owner, "Not the Owner");
    _;
  }

  function getGardens() public view returns (UserGarden[] memory){
    return userGardens;
  }

  function buyGarden() public {
    Garden newGarden = new Garden(msg.sender, address(bloomPoint));
    userGardens.push(UserGarden(totalGardens, msg.sender, address(newGarden), ""));
    contractaddressToUsergarden[address(newGarden)] = totalGardens;
    totalGardens++;
  }

  function buyBloomPoint() public payable {
    uint256 tokens = tokensPerEth * msg.value;
    bloomPoint.mint(msg.sender, tokens);
    emit BuyTokens(msg.sender, msg.value, tokens);
  }

  function setURL(address contractaddress, string calldata newurl) public {
    uint256 currentId = contractaddressToUsergarden[contractaddress];
    userGardens[currentId].url = newurl;
  }

  function withdraw() isOwner public {
    (bool success,) = owner.call{value: address(this).balance}("");
    require(success, "Failed to send Ether");
  }
}
