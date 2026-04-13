import { Minus, Plus } from "lucide-react";
import "./stepper.css";

export interface StepperProps {
	value: number;
	min?: number;
	max?: number;
	step?: number;
	disabled?: boolean;
	size?: "md" | "sm";
	onChange: (delta: number) => void;
}

export default function Stepper({
	value,
	min = 1,
	max = 99,
	step = 1,
	disabled = false,
	size = "md",
	onChange,
}: StepperProps) {
	const handleDecrement = (): void => {
		onChange(-step);
	};
	const handleIncrement = (): void => {
		onChange(step);
	};

	const sizeClass = {
		md: "stepper_md",
		sm: "stepper_sm"
	};

	return (
		<div className={`${sizeClass[size]} flex relative`}>
			<button
				aria-label="Decrement"
            title="Decrement"
				onClick={handleDecrement}
            disabled={disabled || value <= min}
				className="group border-2 border-gray-200 flex justify-center items-center disabled:cursor-not-allowed"
            type="button"
			>
				<Minus
					size={size == "md" ? 32 : 18}
					strokeWidth={1.5}
					className="stepper__icon group-hover:stroke-accent group-disabled:stroke-gray-200 transition-colors"
				></Minus>
			</button>
			<div className="stepper__display h-full flex justify-center items-center">
				<span className={` ${disabled && 'text-gray-200'}`}>{value}</span>
			</div>
			<button
				aria-label="Increment"
            title="Increment"
				onClick={handleIncrement}
            disabled={disabled || value >= max}
				className="group border-2 border-gray-200 flex justify-center items-center disabled:cursor-not-allowed"
            type="button"
			>
				<Plus
					size={size == "md" ? 32 : 18}
					strokeWidth={1.5}
					className="group-hover:stroke-accent group-disabled:stroke-gray-200 transition-colors"
				></Plus>
			</button>
		</div>
	);
}
