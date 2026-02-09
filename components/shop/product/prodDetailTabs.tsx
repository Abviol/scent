"use client";

import { ReactNode, useState, createContext, useContext } from "react";

interface TabsContextType {
	activeIndex: number;
	setActiveIndex: (index: number) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

function useTabs() {
	const context = useContext(TabsContext);
	if (!context)
		throw new Error(
			"Tabs component must be used within a <ProdTabs> provider.",
		);

	return context;
}

interface ProdTabsProps {
	children: ReactNode;
	defaultIndex?: number;
}

export function ProdTabs({ children, defaultIndex = 0 }: ProdTabsProps) {
	const [activeIndex, setActiveIndex] = useState(defaultIndex);

	return (
		<TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
			<div className="grid grid-cols-[1fr_2.5fr] h-[350px] px-24 border border-gray-300 rounded-md bg-white">
				{children}
			</div>
		</TabsContext.Provider>
	);
}

export function ProdTabList({ children }: { children: ReactNode }) {
	return (
		<ul
			role="tablist"
			className="h-full flex flex-col py-16 border-r border-gray-300"
		>
			{children}
		</ul>
	);
}

interface ProdTabProps {
	title: string;
	index: number;
}

export function ProdTab({ title, index }: ProdTabProps) {
	const { activeIndex, setActiveIndex } = useTabs();
	const isActive = activeIndex === index;

	return (
		<li
			role="tab"
			onClick={() => setActiveIndex(index)}
			aria-selected={isActive}
			className={`flex text-lg p-3 cursor-pointer border-r-2 select-none 
				${
					isActive
						? "border-main font-semibold text-main"
						: "border-transparent font-normal text-gray-300"
				}
			`}
		>
			{title}
		</li>
	);
}

interface ProdTabPanelProps {
	index: number;
	children: ReactNode;
}

export function ProdTabPanel({ index, children }: ProdTabPanelProps) {
	const { activeIndex } = useTabs();
	
	if (activeIndex !== index) return null;
	
	return (
		<div
			key={index}
			role="tabpanel"
			className="py-16 pl-11 text-lg max-h-[350px]"
		>
			<div className="max-h-full overflow-auto">
				{children}
			</div>
		</div>
	);
}
