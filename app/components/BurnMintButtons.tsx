// components/BurnMintButtons.tsx

interface BurnMintButtonsProps {
	onBurn: () => void;
	onMint: () => void;
}

const BurnMintButtons: React.FC<BurnMintButtonsProps> = ({ onBurn, onMint }) => {
	return (
		<div className="flex justify-center space-x-4 mt-5">
			<button
				className="px-6 py-3 rounded-full bg-bgAccentOne text-white shadow  shadow-accent hover:bg-bgAccentTwo focus:outline-none transition duration-500"
				onClick={onBurn}
			>
				Burn
			</button>
			<button
				className="px-6 py-3 rounded-full bg-bgAccentOne text-white shadow shadow-accent hover:bg-bgAccentTwo focus:outline-none transition duration-500"
				onClick={onMint}
			>
				Mint
			</button>
		</div>
	);
};

export default BurnMintButtons;
