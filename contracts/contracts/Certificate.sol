// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Certificate is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    struct Applicant {
        address addr;
        string certificate;
        uint256 tokenId;
    }
    mapping(string => Applicant) public applicants;

    Counters.Counter private _tokenIdCounter;

    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) {}

    function _issueCertificate(address to, string memory hash) internal {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, hash);
        Applicant memory newApplicant = Applicant(to, hash, tokenId);
        applicants[hash] = newApplicant;
    }

    function issueCertificate(address to, string memory hash) public onlyOwner {
        _issueCertificate(to, hash);
    }

    function batchIssueCertificate(
        address[] memory to,
        string[] memory hash
    ) public onlyOwner {
        require(
            to.length == hash.length,
            "The length of to and hashs must be equal"
        );

        for (uint256 i = 0; i < to.length; i++) {
            _issueCertificate(to[i], hash[i]);
        }
    }

    function verifyCertificate(
        address addr,
        string memory hash
    ) public view returns (bool) {
        return applicants[hash].addr == addr;
    }

    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        require(from == address(0), "Token not transferable");
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
