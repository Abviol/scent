"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, Mail, Search, ShoppingCartIcon, X } from "lucide-react";

// UI Components
import { Button } from "../ui/button";
import Avatar from "../ui/avatar";
import { Input } from "../ui/input";
import SearchResultItem from "../searchResultItem";

// Types
interface User {
	avatarUrl: string;
	name: string;
}

// Main Component
export default function Header() {
	const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
	const [searchValue, setSearchValue] = useState<string>("");

	// Mock Data
	const isLoggedIn: boolean = false;
	const itemsInCart: number = 2;
	const user: User = {
		avatarUrl: "https://github.com/shadcn.png",
		name: "Misha Kulkin",
	};

	const closeSearch = () => setIsSearchOpen(false);
	const handleSearchFocus = () => setIsSearchOpen(true);
	const clearSearch = () => setSearchValue("");
	
	useEffect(() => {
		if (isSearchOpen && searchValue) document.body.style.overflow = "hidden";
		else document.body.style.overflow = "visible";
	}, [isSearchOpen, searchValue]);

	return (
		<>
			{/* Backdrop Overlay */}
			{isSearchOpen && searchValue && (
				<div
					className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-all"
					onClick={closeSearch}
					aria-hidden="true"
				/>
			)}

			<header className="relative w-full py-9 z-50 bg-white">
				<div className="container mx-auto px-8 flex justify-between items-center gap-8">
					{/* 1. Logo */}
					<Link
						href={"/"}
						className="text-4xl font-semibold shrink-0"
					>
						Scent
					</Link>

					{/* 2. Search Bar */}
					<div className="relative flex-1 max-w-2xl">
						<SearchBar
							value={searchValue}
							isOpen={isSearchOpen}
							onChange={setSearchValue}
							onFocus={handleSearchFocus}
							onClear={clearSearch}
						/>
					</div>

					{/* 3. Actions (Cart, Wishlist, User) */}
					<HeaderActions
						isLoggedIn={isLoggedIn}
						user={user}
						itemsInCart={itemsInCart}
					/>
				</div>

				{/* 4. Search Results Dropdown */}
				<SearchDropdown isOpen={isSearchOpen} query={searchValue} />
			</header>
		</>
	);
}

// Sub-Components

function SearchBar({
	value,
	isOpen,
	onChange,
	onFocus,
	onClear,
}: {
	value: string;
	isOpen: boolean;
	onChange: (val: string) => void;
	onFocus: () => void;
	onClear: () => void;
}) {
	return (
		<div className="relative group">
			<Input
				type="search"
				placeholder="Search fragrances..."
				value={value}
				onChange={(e) => onChange(e.target.value)}
				onFocus={onFocus}
				className="w-full h-12 rounded-lg border py-2 pl-6 pr-12 text-sm outline-none transition-all"
			/>
			<button
				className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-main"
				aria-label={isOpen && value ? "Clear search" : "Search"}
			>
				{isOpen && value ? (
					<X size={18} onClick={onClear} />
				) : (
					<Search size={20} />
				)}
			</button>
		</div>
	);
}

function HeaderActions({
	isLoggedIn,
	user,
	itemsInCart,
}: {
	isLoggedIn: boolean;
	user: User;
	itemsInCart: number;
}) {
	return (
		<div className="flex items-center gap-x-10 shrink-0">
			<div className="flex gap-x-3">
				<Link
					href={"/wishlist"}
					aria-label="Go to wishlist"
					className="button-icon flex items-center justify-center"
				>
					<Bookmark className="size-8" strokeWidth={1.5} />
				</Link>
				<CartLink items={itemsInCart} />
			</div>

			{isLoggedIn ? (
				<Link href={"/"}>
					<Avatar src={user.avatarUrl} alt={user.name} size="md" />
				</Link>
			) : (
				<Button asChild={true} size="lg">
					<Link href={"/auth"} className="gap-2">
						<Mail className="size-4" />
						Login with Email
					</Link>
				</Button>
			)}
		</div>
	);
}

function SearchDropdown({ isOpen, query }: { isOpen: boolean; query: string }) {
	if (!isOpen || !query) return null;

	return (
		<div className="absolute z-50 left-0 top-full w-full bg-white border-b border-gray-100 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
			<div className="container mx-auto px-8 grid grid-cols-12 gap-11">
				{/* Product Results */}
				<div className="col-span-9 flex flex-col gap-y-10 py-8">
					<div className="grid grid-cols-2 gap-x-5 gap-y-6">
						{Array.from({ length: 4 }).map((_, index) => (
							<SearchResultItem
								key={index}
								title="Versace Eros Flame"
								productId="sc-001"
								productCode="01203213"
								quantityInStock={10}
								imageUrl="https://i.makeup.it/2/2p/2pj8d0xfdqe0.jpg"
								volume={2}
								rating={4.5}
								price={4999}
							/>
						))}
					</div>
					<Link
						href={"/search"}
						className="w-fit text-slate-500 font-semibold capitalize hover:text-main transition-colors"
					>
						View All Results
					</Link>
				</div>

				{/* Brand Results */}
				<div className="col-span-3 py-8 pl-10 border-l-2 border-slate-200">
					<div>
						<h5 className="font-semibold mb-5 leading-3 text-gray-400 text-sm uppercase tracking-wide">
							Brands
						</h5>
						<ul className="flex flex-col gap-y-3">
							{["Versace", "Chanel", "Dior"].map((brand) => (
								<li key={brand}>
									<Link
										href={"/"}
										className="text-main hover:underline hover:text-opacity-70 transition-colors"
									>
										{brand}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

function CartLink({ items = 0 }: { items?: number }) {
	return (
		<Link
			href={"/cart"}
			aria-label="Go to cart"
			className="relative button-icon flex items-center justify-center"
		>
			<ShoppingCartIcon className="size-8" strokeWidth={1.5} />
			{items > 0 && (
				<div className="absolute top-0 right-0 size-5 bg-main border-2 border-white rounded-full flex justify-center items-center translate-x-1 -translate-y-1">
					<span className="text-[10px] text-white font-semibold">
						{items}
					</span>
				</div>
			)}
		</Link>
	);
}
