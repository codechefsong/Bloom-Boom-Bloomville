//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Bloomville {
  uint256 public totalGardens = 0;
  Garden[] public gardens;

  struct Garden {
    uint256 id;
    address owner;
  }

  constructor() {}

  function getGardens() public view returns (Garden[] memory){
    return gardens;
  }

  function buyGarden() public {
    gardens.push(Garden(totalGardens, msg.sender));
    totalGardens++;
  }
}
