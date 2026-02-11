"use client";

import { SortingOrderType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ChevronDown, SortAsc, SortDesc } from "lucide-react";
import { useState } from "react";

interface SortingDropdownProps {
	criteria: string;
	order: SortingOrderType;
	onChange: (criteria: string, order: SortingOrderType) => void;
	className?: string;
}

const SORTING_CRITERIAS: string[] = ["price", "name", "popularity", "date"];

export default function SortingDropdown(props: SortingDropdownProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleOptionChange = (option: string) => {
		props.onChange(option, props.order);
		setIsOpen(false);
	};

	const handleOrderChange = (order: SortingOrderType) =>
		props.onChange(props.criteria, order);

	return (
		<div className={cn("block relative py-2 ", props.className)}>
			<DropdownDisplay
				selectedCriteria={props.criteria}
				onOrderChange={handleOrderChange}
				onOpen={() => setIsOpen((prev) => !prev)}
			/>
			<DropdownContent
				selectedOption={props.criteria}
				isOpen={isOpen}
				onChange={handleOptionChange}
			/>
		</div>
	);
}

// --- Sub-components

interface DropdownDisplayProps {
	onOrderChange: (order: SortingOrderType) => void;
	onOpen: () => void;
	selectedCriteria: string;
}

function DropdownDisplay({
	onOrderChange,
	onOpen,
	selectedCriteria,
}: DropdownDisplayProps) {
	const [order, setOrder] = useState<SortingOrderType>("DESC");

	const handleOrder = () => {
		const newOrder = order === "DESC" ? "ASC" : "DESC";
		setOrder(newOrder);
		onOrderChange(newOrder);
	};

	return (
		<div className="sorting-display flex flex-row items-center gap-x-2">
			<button
				aria-label="Descending"
				onClick={handleOrder}
				className="text-gray-600 hover:text-foreground"
			>
				{order === "DESC" ? (
					<SortDesc size={16} />
				) : (
					<SortAsc size={16} />
				)}
			</button>
			<button
				className="flex items-center gap-x-2 cursor-pointer select-none"
				onClick={onOpen}
			>
				<span className="text-gray-600">
					Sort by:{" "}
					<span className="font-semibold text-foreground">
						{selectedCriteria}
					</span>
				</span>
				<ChevronDown size={16} />
			</button>
		</div>
	);
}

interface DropdownContentProps {
	selectedOption: string;
	isOpen: boolean;
	onChange: (option: string) => void;
}
function DropdownContent({
	selectedOption,
	isOpen,
	onChange,
}: DropdownContentProps) {
	if (!isOpen) return null;

	return (
		<div className="sorting-content absolute top-10 right-0 w-[160px] py-4 px-8 bg-white rounded-md drop-shadow-md">
			<ul className="flex flex-col">
				{SORTING_CRITERIAS.map((v, k) => {
					const isSelected = v === selectedOption;
					return (
						<label
							tabIndex={isOpen ? 1 : 0}
							key={`${v}-${k}`}
							className={cn(
								"py-2 cursor-pointer hover:font-semibold transition-all",
								isSelected && "text-accent font-semibold",
							)}
							onClick={() => onChange(v)}
						>
							{v}
						</label>
					);
				})}
			</ul>
		</div>
	);
}
