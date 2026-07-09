"use client";

/* react */
import { useEffect, useRef, useState } from "react";
/* hooks */
import { useShopFilters } from "@/hooks/use-shop-filters";
/* lib */
import { SortingCriteriaType, SortingOrderType } from "@/lib/types";
import { cn } from "@/lib/utils";
/* icons */
import { ChevronDown, SortAsc, SortDesc } from "lucide-react";

interface SortingDropdownProps {
	criteria: SortingCriteriaType;
	order: SortingOrderType;
	className?: string;
}

const SORTING_CRITERIAS: SortingCriteriaType[] = ["price", "name", "popularity", "date"];

export default function Sorting(props: SortingDropdownProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const { setSorting }= useShopFilters();

	const handleCriteriaChange = (criteria: SortingCriteriaType) => {
		setSorting(criteria, props.order);
		setIsOpen(false);
	};

	const toggleOrder = () => {
		const newOrder = props.order === "DESC" ? "ASC" : "DESC";
		setSorting(props.criteria, newOrder);
	};

	//  Handle Click Outside to close dropdown
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div
			ref={containerRef}
			className={cn("block relative py-2 ", props.className)}
		>
			<DropdownDisplay
				selectedOrder={props.order}
				criteria={props.criteria}
				onOrderChange={toggleOrder}
				onOpen={() => setIsOpen((prev) => !prev)}
			/>
			<DropdownContent
				selectedCriteria={props.criteria}
				isOpen={isOpen}
				onChange={handleCriteriaChange}
			/>
		</div>
	);
}

// --- Sub-components

interface DropdownDisplayProps {
	onOrderChange: () => void;
	onOpen: () => void;
	criteria: string;
	selectedOrder: SortingOrderType;
}

function DropdownDisplay({
	onOrderChange,
	onOpen,
	criteria,
	selectedOrder,
}: DropdownDisplayProps) {

	return (
		<div className="sorting-display flex flex-row items-center gap-x-2">
			<button
				aria-label="Descending"
				onClick={() => onOrderChange()}
				className="text-gray-600 hover:text-foreground"
			>
				{selectedOrder === "DESC" ? (
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
						{criteria}
					</span>
				</span>
				<ChevronDown size={16} />
			</button>
		</div>
	);
}

interface DropdownContentProps {
	selectedCriteria: SortingCriteriaType;
	isOpen: boolean;
	onChange: (criteria: SortingCriteriaType) => void;
}
function DropdownContent({
	selectedCriteria,
	isOpen,
	onChange,
}: DropdownContentProps) {
	if (!isOpen) return null;

	return (
		<div className="sorting-content absolute top-10 right-0 w-[160px] py-4 px-8 bg-white rounded-md drop-shadow-md z-30">
			<ul className="flex flex-col">
				{SORTING_CRITERIAS.map((v, k) => {
					const isSelected = v === selectedCriteria;
					return (
						<li key={`${v}-${k}`} className="flex-1">
							<button
								className={cn(
									"w-full text-left py-2 cursor-pointer transition-all",
									"hover:font-semibold",
									isSelected && "text-accent font-semibold",
								)}
								onClick={() => onChange(v)}
							>
								{v}
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
