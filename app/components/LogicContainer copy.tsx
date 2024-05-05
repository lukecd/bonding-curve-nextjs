"use client";
import { useState } from "react";
import NFTImage from "./NFTImage";
import PriceGraph from "./PriceGraph";
import BurnMintButtons from "./BurnMintButtons";
import { useEffect } from "react";

const LogicContainer = () => {
	const [priceData, setPriceData] = useState<{ mintBurn: number; price: number }[]>([]); // Initial price data
	const [nftPrice, setNftPrice] = useState(0);

	// When the contract is deployed, you must send 1 ETH to the contract to mint the first NFT
	const [ethBalance, setEthBalance] = useState(1);
	const [nftCount, setNftCount] = useState(1);
	const [reserveRatio, setReserveRatio] = useState(1.1);
	useEffect(() => {
		const initialNftPrice = ethBalance / (nftCount * reserveRatio);
		setNftPrice(initialNftPrice);
	}, [ethBalance, nftCount, reserveRatio]);

	const handleMint = () => {
		// 1: Log the sale
		setPriceData([...priceData, { mintBurn: priceData.length + 1, price: nftPrice }]);

		// 2: Setup for the new sale
		const newEthBalance = ethBalance + nftPrice;
		setEthBalance(newEthBalance);

		const newNftCount = nftCount + 1;
		setNftCount(newNftCount);

		// Recalculate the NFT price using the updated parameters
		const newNftPrice = newEthBalance / (newNftCount * reserveRatio);
		console.log(newNftPrice);
		setNftPrice(newNftPrice);
	};

	const handleBurn = () => {
		// Decrease price exponentially by multiplying with delta
	};

	return (
		<div className="min-h-screen bg-white flex flex-col justify-start items-center">
			<div className="flex w-full flex-col items-center justify-center mb-8">
				<div className="flex w-full flex-row gap-10 mb-10">
					<div className="w-1/2">
						<NFTImage />{" "}
					</div>
					<div className="w-1/2">
						<PriceGraph data={priceData} />
					</div>
				</div>
				<BurnMintButtons onBurn={handleBurn} onMint={handleMint} />
				<div className="flex justify-center space-x-4 mt-10">
					<div className="w-1/2 flex flex-col bg-neon2 p-2 rounded-xl">
						<label className="text-white text-bold text-xl">NFT Price</label>
						{nftPrice} ETH
					</div>
					<div className="w-1/2 flex flex-col bg-neon2 p-2 rounded-xl">
						<label className="text-white text-bold text-xl">ETH Balance</label>
						{ethBalance} ETH
					</div>
					<div className="w-1/2 flex flex-col bg-neon2 p-2 rounded-xl">
						<label className="text-white text-bold text-xl">NFT Count</label>
						{nftCount} NFTs
					</div>
					<div className="w-1/2 flex flex-col bg-neon2 p-2 rounded-xl">
						<label className="text-white text-bold text-xl">Reserve Ratio: {reserveRatio}</label>
						<input
							type="range"
							min={1.1}
							max={1.9}
							value={reserveRatio}
							onChange={(e) => setReserveRatio(Number(e.target.value))}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LogicContainer;
