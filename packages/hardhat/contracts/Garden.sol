//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./BloomPoint.sol";

contract Garden {
  address public immutable owner;
  Box[] public grid;
  BloomPoint public bloomPoint;

  struct Box {
    uint256 index;
    uint256 id;
    string typeGrid;
    string content;
    uint256 startdate;
  }

  constructor(address _owner, address _tokenAddress) {
    owner = _owner;
    bloomPoint = BloomPoint(_tokenAddress);

    uint256 id = 0;

    for (uint256 row = 0; row < 5; row++) {
      for (uint256 col = 0; col < 5; col++) {
        grid.push(Box(id, id, "base", "-", 0));
        id++;
      }
    }
  }

  modifier isOwner() {
    require(msg.sender == owner, "Not the Owner");
    _;
  }

  function getGrid() public view returns (Box[] memory){
    return grid;
  }

  function plantSeed(uint256 index) public {
    grid[index].content = "0";
  }

  function waterSeed(uint256 index) public {
    grid[index].content = "G";
    grid[index].startdate = block.timestamp;
  }

  function collectPoints(uint256 index) public {
    uint256 amount = block.timestamp - grid[index].startdate;
    bloomPoint.mint(msg.sender, amount);
    grid[index].startdate = block.timestamp;
  }

  function withdraw() isOwner public {
    (bool success,) = owner.call{value: address(this).balance}("");
    require(success, "Failed to send Ether");
  }

  receive() external payable {}
}