// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MiNFTModule", (m) => {
  // Parámetros de despliegue
  const name = m.getParameter("name", "MiNFT");
  const symbol = m.getParameter("symbol", "M2");
  const baseTokenURI = m.getParameter("baseTokenURI", "http://localhost:3000/metadata/");

  // Despliegue del contrato MiNFT2
  const miNFT2 = m.contract("MiNFT", "0x5A3B1D4C5D5C5D5C5D5C5D5C5D5C5D5C5D5C5D5C");

  return { miNFT2 };
});
