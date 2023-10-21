const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Certificate Test", function () {
  let owner, soulbound, student1, student2, student3, student4, student5;
  let name = "Visvesvaraya Technological University";
  let symbol = "VTU";

  beforeEach(async function () {
    // Retrieve the default account from ethers
    [owner, student1, student2, student3, student4, student5] = await ethers.getSigners();

    // A helper to get the contracts instance and deploy it locally
    const Soulbound = await ethers.getContractFactory("Certificate");
    soulbound = await Soulbound.deploy(name, symbol);
  });

  it("Should return the correct name and symbol", async function () {
    expect(await soulbound.name()).to.equal(name);
    expect(await soulbound.symbol()).to.equal(symbol);
    expect(await soulbound.owner()).to.equal(owner.address);
  })

  it("Should mint a certificate to a student", async function () {
    let hash = "QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A"
    await soulbound.issueCertificate(student1.address, hash);
    const result = await soulbound.applicants(hash);
    let testResult = [student1.address, "QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A", ethers.toBigInt("0")]
    expect(result).to.eql(testResult);
  })

  it("Should batch mint certificate to students", async function () {
    let stdAddr = {
      0: student1.address,
      1: student2.address,
      2: student3.address,
      3: student4.address,
      4: student5.address
    }
    for (let i = 0; i < 5; i++) {
      let hash = `${i}`;
      let to = stdAddr[i];
      await soulbound.issueCertificate(to, hash);
    }
    for (let i = 0; i < 5; i++) {
      let hash = `${i}`;
      let result = await soulbound.applicants(hash);
      let testResult = [stdAddr[i], `${i}`, ethers.toBigInt(i)]
      expect(result).to.eql(testResult);
    }
  })

  it("Should verify the certificate", async function () {
    let hash = "QmPChd2hVbrJ6bfo3WBcTW4iZnpHm8TEzWkLHmLpXhF68A"
    await soulbound.issueCertificate(student1.address, hash);
    let result = await soulbound.verifyCertificate(student1.address, hash);
    expect(result).to.equal(true);
  })
});