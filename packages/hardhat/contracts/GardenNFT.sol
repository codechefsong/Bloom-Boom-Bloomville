// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GardenNFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  constructor() ERC721("Garden NFT", "GNFT") {}

  function mint(address _to) public returns (uint256) {
    uint256 newItemId = _tokenIds.current();
    _mint(_to, newItemId);

    _tokenIds.increment();
    return newItemId;
  }

  function setURL(uint256 _id, string memory _tokenURI_) public {
    _setTokenURI(_id, _tokenURI_);
  }
}
