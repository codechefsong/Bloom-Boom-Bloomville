//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./Garden.sol";

contract Bloomville {
  uint256 public totalGardens = 0;
  UserGarden[] public userGardens;

  struct UserGarden {
    uint256 id;
    address owner;
    address contractAdress;
  }

  constructor() {}

  function getGardens() public view returns (UserGarden[] memory){
    return userGardens;
  }

  function buyGarden() public {
    Garden newGarden = new Garden(msg.sender);
    userGardens.push(UserGarden(totalGardens, msg.sender, address(newGarden)));
    totalGardens++;
  }
}
