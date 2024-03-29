//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./BloomPoint.sol";

contract Garden {
  address public immutable owner;
  Box[] public grid;
  uint256 public totalSpace = 0;
  BloomPoint public bloomPoint;
  uint256 public immutable waterTime = 100;
  uint256 public immutable expandCost = 50;
  uint256[] levelCost = [0, 50, 200, 10000, 20000];

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

    for (uint256 i = 0; i < 5; i++) {
      grid.push(Box(totalSpace, totalSpace, "base", "-", 0, 0, 0));
      totalSpace++;
    }
  }

  modifier isOwner() {
    require(msg.sender == owner, "Not the Owner");
    _;
  }

  function getGrid() public view returns (Box[] memory){
    return grid;
  }

  function expandGrid() public {
    require(totalSpace < 25, "No space to expand");
    require(bloomPoint.balanceOf(msg.sender) >= expandCost, "You need more points");

    for (uint256 i = 0; i < 5; i++) {
      grid.push(Box(totalSpace, totalSpace, "base", "-", 0, 0, 0));
      totalSpace++;
    }
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

  function levelUpPlant(uint256 index) public {
    require(grid[index].level < 4, "Your plant is at max level");
    uint256 cost = levelCost[grid[index].level];
    require(bloomPoint.balanceOf(msg.sender) >= cost, "You need more points");
    bloomPoint.burn(msg.sender, cost);
    grid[index].level += 1;
  }

  function withdraw() isOwner public {
    (bool success,) = owner.call{value: address(this).balance}("");
    require(success, "Failed to send Ether");
  }

  receive() external payable {}
}