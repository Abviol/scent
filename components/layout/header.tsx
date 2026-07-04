"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { Bookmark, Mail, Search, ShoppingCartIcon, X } from "lucide-react";

// UI Components
import { Button } from "../ui/button";
import Avatar from "../ui/avatar";
import { Input } from "../ui/input";
import SearchResultItem from "../search-result-item";
import { useRouter } from "next/navigation";

// Types
interface User {
	avatarUrl: string;
	name: string;
}

// Main Component
export default function Header() {
	const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const router = useRouter();

	// Mock Data
	const isLoggedIn: boolean = false;
	const itemsInCart: number = 2;
	const user: User = {
		avatarUrl: "https://github.com/shadcn.png",
		name: "Misha Kulkin",
	};

	const closeSearch = () => setIsSearchOpen(false);
	const handleSearchFocus = () => setIsSearchOpen(true);
	const clearSearch = () => setSearchQuery("");
	const handleBlur = useCallback((e: PointerEvent) => {
		const target = e.target as HTMLElement;
		if (!target.closest(".search-bar")) {
			closeSearch();
		}
	}, []);
	const applySearchQuery = () => {
		router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
		closeSearch();
		setSearchQuery("");
	}
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key !== "Enter") return;
		applySearchQuery();
	};

	useEffect(() => {
		if (isSearchOpen && searchQuery)
			document.body.style.overflow = "hidden";
		else document.body.style.overflow = "visible";
	}, [isSearchOpen, searchQuery]);

	useEffect(() => {
		document.body.addEventListener("click", handleBlur);
		return () => document.body.removeEventListener("click", handleBlur);
	}, [handleBlur]);

	return (
		<>
			{/* Backdrop Overlay */}
			{isSearchOpen && searchQuery && (
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

					<div className="flex flex-row justify-between w-full max-w-[75%] gap-x-3">
						{/* 2. Search Bar */}
						<div className="relative flex-1">
							<SearchBar
								value={searchQuery}
								isOpen={isSearchOpen}
								onChange={setSearchQuery}
								onFocus={handleSearchFocus}
								onClear={clearSearch}
								onKeyDown={handleKeyDown}
							/>
						</div>

						{/* 3. Actions (Cart, Wishlist, User) */}
						<HeaderActions
							isLoggedIn={isLoggedIn}
							user={user}
							itemsInCart={itemsInCart}
						/>
					</div>
				</div>

				{/* 4. Search Results Dropdown */}
				<SearchDropdown isOpen={isSearchOpen} query={searchQuery} />
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
	onKeyDown,
}: {
	value: string;
	isOpen: boolean;
	onChange: (val: string) => void;
	onFocus: () => void;
	onClear: () => void;
	onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isOpen) {
			setTimeout(() => {
				inputRef.current?.focus();
			}, 50);
		}
	}, [isOpen]);

	const handleFocus = () => {
		onFocus();
		inputRef.current?.focus();
	};

	const handleClear = () => {
		onClear();
		inputRef.current?.focus();
	};

	return (
		<div
			className={`search-bar relative group flex flex-row gap-x-3 ${
				isOpen ? "justify-start" : "w-full justify-end"
			} transition-all`}
		>
			{isOpen && (
				<Input
					ref={inputRef}
					type="search"
					placeholder="Search fragrances..."
					value={value}
					onChange={(e) => onChange(e.target.value)}
					onKeyDown={onKeyDown}
					className="w-full max-w-xl h-12 rounded-lg border py-2 px-6 text-sm outline-none transition-all animate-in fade-in duration-200"
				/>
			)}
			<div
				className={`${isOpen ? "w-0" : "w-[20%]"} transition-all`}
			></div>
			<button
				className="button-icon shrink-0"
				aria-label={isOpen && value ? "Clear search" : "Search"}
				onClick={isOpen && value ? handleClear : handleFocus}
			>
				{isOpen && value ? (
					<X size={28} />
				) : (
					<Search size={32} strokeWidth={1.5} />
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
					href={"/account/wishlist"}
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
						href={`/shop?q=${encodeURIComponent(query)}`}
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
			href={"/account/cart"}
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
