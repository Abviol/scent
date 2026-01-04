import { Minus, Plus } from "lucide-react";

export interface StepperProps {
	value: number;
	min?: number;
	max?: number;
	step?: number;
	disabled?: boolean;
	onChange: (newValue: number) => void;
}

export default function Stepper({
	value,
	min = 1,
	max = 99,
	disabled = false,
	onChange,
}: StepperProps) {
	const handleDecrement = (): void => {
		if (value > min) onChange(value - 1);
	};
	const handleIncrement = (): void => {
		if (value < max) onChange(value + 1);
	};

	return (
		<div className="flex">
			<button
				aria-label="Decrement"
            title="Decrement"
				onClick={handleDecrement}
            disabled={disabled || value <= min}
				className="group size-10 border-2 border-gray-200 flex justify-center items-center disabled:cursor-not-allowed"
            type="button"
			>
				<Minus
					size={32}
					strokeWidth={1.5}
					className="stroke-black group-hover:stroke-accent group-disabled:stroke-gray-200 transition-colors"
				></Minus>
			</button>
			<div className="h-10 w-[70px] flex justify-center items-center">
				<span className={`my-text-h5 ${disabled && 'text-gray-200'}`}>{value}</span>
			</div>
			<button
				aria-label="Increment"
            title="Increment"
				onClick={handleIncrement}
            disabled={disabled || value >= max}
				className="group size-10 border-2 border-gray-200 flex justify-center items-center disabled:cursor-not-allowed"
            type="button"
			>
				<Plus
					size={32}
					strokeWidth={1.5}
					className="stroke-black group-hover:stroke-accent group-disabled:stroke-gray-200 transition-colors"
				></Plus>
			</button>
		</div>
	);
}
