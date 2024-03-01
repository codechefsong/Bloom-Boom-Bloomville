//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./Garden.sol";

contract Bloomville {
  address bloomPoint;

  uint256 public totalGardens = 0;
  UserGarden[] public userGardens;
  mapping(address => uint) public contractaddressToUsergarden;

  struct UserGarden {
    uint256 id;
    address owner;
    address contractAdress;
    string url;
  }

  constructor(address _tokenAddress) {
    bloomPoint = _tokenAddress;
  }

  function getGardens() public view returns (UserGarden[] memory){
    return userGardens;
  }

  function buyGarden() public {
    Garden newGarden = new Garden(msg.sender, bloomPoint);
    userGardens.push(UserGarden(totalGardens, msg.sender, address(newGarden), ""));
    contractaddressToUsergarden[address(newGarden)] = totalGardens;
    totalGardens++;
  }

  function setURL(address contractaddress, string calldata newurl) public {
    uint256 currentId = contractaddressToUsergarden[contractaddress];
    userGardens[currentId].url = newurl;
  }
}
