// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("NFTDesplegableModule", (m) => {
  // Parámetros de despliegue
  const name = m.getParameter("name", "NFTDesplegable");
  const symbol = m.getParameter("symbol", "M2");
  const baseTokenURI = m.getParameter("baseTokenURI", "a");

  // Despliegue del contrato NFTDesplegable
  const nftDesplegable = m.contract("NFTDesplegable", ["0x5A3B1D4C5D5C5D5C5D5C5D5C5D5C5D5C5D5C5D5C"]);

  return { nftDesplegable };
});
