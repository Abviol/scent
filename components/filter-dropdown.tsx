"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface BaseFilterProps {
	id: string;
	title: string;
	className?: string;
	isOpen?: boolean;
}

interface Option {
	label: string;
	value: string | number;
	count: number;
}

// for Checkbox mode
interface CheckboxFilterProps extends BaseFilterProps {
	type: "checkbox";
	options: Option[];
	selectedValues: (string | number)[];
	onChange: (id: string, values: (string | number)) => void;
	min?: never;
	max?: never;
	rangeValue?: never;
}

// for Range mode
interface RangeFilterProps extends BaseFilterProps {
	type: "range";
	min: number;
	max: number;
	rangeValue: [number, number];
	onChange: (id: string, values: [number, number]) => void;
	options?: never;
	selectedValues?: never;
}

type FiltersDropdownProps = CheckboxFilterProps | RangeFilterProps;

export function FiltersDropdown({ isOpen = false, ...props }: FiltersDropdownProps) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(isOpen);

	const toggleOpen = () => setIsDropdownOpen((prev) => !prev);

	return (
		<div className={cn("w-full", props.className)}>
			<div
				className="flex items-center justify-between cursor-pointer group select-none"
				onClick={toggleOpen}
			>
				<h3 className="text-xl font-bold text-foreground">
					{props.title}
				</h3>
				<div className="text-foreground transition-colors">
					{isDropdownOpen ? <Minus size={28} strokeWidth={1.5} /> : <Plus size={28} strokeWidth={1.5} />}
				</div>
			</div>

			{isDropdownOpen && (
				<div className="mt-6">
					{props.type === "checkbox" ? (
						<CheckboxList
							options={props.options}
							selectedValues={props.selectedValues}
							onChange={(updatedValue) =>
								props.onChange(props.id, updatedValue)
							}
						/>
					) : (
						<RangeSlider
							min={props.min}
							max={props.max}
							value={props.rangeValue}
							onChange={(newRange) =>
								props.onChange(props.id, newRange)
							}
						/>
					)}
				</div>
			)}
		</div>
	);
}

// Sub-components
interface CheckboxListProps {
	options: Option[];
	selectedValues: (string | number)[];
	onChange: (value: (string | number)) => void;
}

function CheckboxList({
	options,
	selectedValues,
	onChange,
}: CheckboxListProps) {
	const handleCheck = (
		checked: boolean | string,
		itemValue: string | number,
	) => {
		onChange(itemValue);
	};

	return (
		<div
			className="max-h-[448px] flex flex-col gap-6 overflow-auto 
            [&::-webkit-scrollbar]:w-0.5
         [&::-webkit-scrollbar-track]:bg-transparent
         [&::-webkit-scrollbar-thumb]:bg-foreground"
		>
			{options.map((opt) => {
				const isChecked = selectedValues.includes(opt.value);
				return (
					<div
						key={opt.value}
						className="flex items-center space-x-6"
					>
						<Checkbox
							id={`filter-${opt.value}`}
							checked={isChecked}
							onCheckedChange={(checked) =>
								handleCheck(checked, opt.value)
							}
							className={cn(
								"size-6 border-slate-300 rounded-none data-[state=checked]:bg-main data-[state=checked]:border-main transition-all",
								opt.count == 0 && "bg-slate-300 cursor-default",
							)}
							disabled={opt.count == 0}
						/>
						<label
							htmlFor={`filter-${opt.value}`}
							className={cn(
								"text-lg cursor-pointer select-none leading-none",
								isChecked
									? "font-semibold text-foreground"
									: "font-normal text-foreground",
								opt.count > 0
									? "text-foreground"
									: "text-slate-300 cursor-default",
							)}
						>
							{opt.label} ({opt.count})
						</label>
					</div>
				);
			})}
		</div>
	);
}

interface RangeSliderProps {
	min: number;
	max: number;
	value: [number, number];
	onChange: (val: [number, number]) => void;
}

function RangeSlider({ min, max, value, onChange }: RangeSliderProps) {
	const [localValue, setLocalValue] = useState(value);

	const handleInputChange = (index: 0 | 1, newValue: string) => {
		const num = parseInt(newValue);
		if (isNaN(num)) return;

		const newRange = [...localValue] as [number, number];
		newRange[index] = num;
		setLocalValue(newRange);
		onChange(newRange);
	};

	return (
		<div className="flex flex-col gap-6 px-1">
			<div className="flex flex-row justify-center gap-5">
				<Input
					min={min}
					max={localValue[1]}
					value={localValue[0]}
					onChange={(e) => handleInputChange(0, e.target.value)}
					className="h-10 w-28 text-center font-medium border-slate-200"
				/>
				<Input
					min={localValue[0]}
					max={max}
					value={localValue[1]}
					onChange={(e) => handleInputChange(1, e.target.value)}
					className="h-10 w-28 text-center font-medium border-slate-200"
				/>
			</div>

			<Slider
				min={min}
				max={max}
				step={1}
				value={localValue}
				onValueChange={(value: [number, number]) =>
					setLocalValue(value)
				}
				onValueCommit={onChange}
				className="my-2"
			/>
		</div>
	);
}
