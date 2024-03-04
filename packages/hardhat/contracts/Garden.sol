//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./BloomPoint.sol";

contract Garden {
  address public immutable owner;
  Box[] public grid;
  BloomPoint public bloomPoint;
  uint256 public immutable waterTime = 100;

  struct Box {
    uint256 index;
    uint256 id;
    string typeGrid;
    string content;
    uint256 startdate;
    uint256 waterdate;
    uint256 level;
  }

  constructor(address _owner, address _tokenAddress) {
    owner = _owner;
    bloomPoint = BloomPoint(_tokenAddress);

    uint256 id = 0;

    for (uint256 row = 0; row < 5; row++) {
      for (uint256 col = 0; col < 5; col++) {
        grid.push(Box(id, id, "base", "-", 0, 0, 0));
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
    grid[index].level = 1;
  }

  function waterSeed(uint256 index) public {
    grid[index].content = "G";
    grid[index].startdate = block.timestamp;
    grid[index].waterdate = block.timestamp + waterTime;
  }

  function collectPoints(uint256 index) public {
    require(owner == msg.sender, "You do not own this garden");

    uint256 amount = block.timestamp - grid[index].startdate;
    uint256 currentLevel = grid[index].level;
    bloomPoint.mint(msg.sender, currentLevel * amount);
    grid[index].startdate = block.timestamp;
  }

  function stealPlant(uint256 index) public {
    require(block.timestamp > grid[index].waterdate, "You cannot steal this plant yet");

    uint256 amount = block.timestamp - grid[index].startdate;
    uint256 currentLevel = grid[index].level;

    bloomPoint.mint(msg.sender, currentLevel * amount);
    grid[index].startdate = 0;
    grid[index].waterdate = 0;
    grid[index].content = "x";
  }

  function removeDisappear(uint256 index) public {
    require(owner == msg.sender, "You do not own this garden");
    grid[index].content = "-";
    grid[index].level = 0;
  }

  function withdraw() isOwner public {
    (bool success,) = owner.call{value: address(this).balance}("");
    require(success, "Failed to send Ether");
  }

  receive() external payable {}
}