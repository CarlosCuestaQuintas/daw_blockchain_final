// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MiNFT is ERC721Enumerable, AccessControl {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    // Define roles
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    // Estructura para almacenar informacion del NFT
    struct NFT {
        string uri;
        uint256 price;
        address owner;
        bool forSale;
    }

    // Mapeo de tokenId a NFT
    mapping(uint256 => NFT) private _nfts;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        _setupRole(ADMIN_ROLE, msg.sender); // Asigna el rol de ADMIN al creador del contrato
        _setupRole(MINTER_ROLE, msg.sender); // Asigna el rol de MINTER al creador del contrato
    }

    // Funcion para minting
    function mint(string memory uri, uint256 price) public onlyRole(MINTER_ROLE) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _mint(msg.sender, tokenId);

        // Almacena la informacion del NFT
        _nfts[tokenId] = NFT({
            uri: uri,
            price: price,
            owner: msg.sender,
            forSale: false
        });
    }

    // Funcion para obtener el URI del NFT
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return _nfts[tokenId].uri;
    }

    // Funcion para poner un NFT a la venta
    function putNFTForSale(uint256 tokenId, uint256 price) public {
        require(ownerOf(tokenId) == msg.sender, "You do not own this token");
        _nfts[tokenId].forSale = true;
        _nfts[tokenId].price = price;
    }

    // Funcion para comprar un NFT
    function buyNFT(uint256 tokenId) public payable {
        require(_nfts[tokenId].forSale, "NFT is not for sale");
        require(msg.value >= _nfts[tokenId].price, "Insufficient funds");

        address seller = ownerOf(tokenId);
        require(seller != msg.sender, "You cannot buy your own NFT");

        // Transferir el NFT
        _transfer(seller, msg.sender, tokenId);
        _nfts[tokenId].owner = msg.sender;
        _nfts[tokenId].forSale = false;

        // Transferir el pago al vendedor
        payable(seller).transfer(msg.value);
    }

    // Funcion para retirar un NFT de la venta
    function withdrawNFTFromSale(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "You do not own this token");
        _nfts[tokenId].forSale = false;
    }

    // Funcion para quemar un NFT
    function burn(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "You do not own this token");
        _burn(tokenId);
        delete _nfts[tokenId]; // Eliminar la informacion del NFT
    }

    // Funcion para obtener el precio del NFT
    function getPrice(uint256 tokenId) public view returns (uint256) {
        require(_exists(tokenId), "Token does not exist");
        return _nfts[tokenId].price;
    }

    // Funcion para establecer el rol de minter
    function grantMinterRole(address account) public onlyRole(ADMIN_ROLE) {
        grantRole(MINTER_ROLE, account);
    }

    // Funcion para revocar el rol de minter
    function revokeMinterRole(address account) public onlyRole(ADMIN_ROLE) {
        revokeRole(MINTER_ROLE, account);
    }
}