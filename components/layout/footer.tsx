"use client";

/* react*/
import { FormEvent } from "react";
/* next.js */
import Link from "next/link";
/* components*/
import { Input } from "../ui/input";
import { Button } from "../ui/button";
/* icons */
import { TelegramIcon } from "../icons/telegram";
import { InstagramIcon } from "../icons/instagram";
import { TiktokIcon } from "../icons/tiktok";
import { Send } from "lucide-react";

export default function Footer() {
	const currentYear = new Date().getFullYear();
	const handleSubscribe = (e: FormEvent) => {
		e.preventDefault();
		console.log("Subscribed");
	};

	return (
		<footer className="w-full bg-white border-t border-slate-100 pt-20 pb-10">
			<div className="container mx-auto px-8">
				<div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-8 mb-16">
					<div className="md:col-span-5 flex flex-col gap-6 pr-10">
						<Link
							href="/"
							className="text-2xl font-semibold tracking-tight"
						>
							Scent™. IMMERSE YOURSELF.
						</Link>
						<p className="text-slate-500 text-base leading-relaxed max-w-sm">
							Elevating your daily ritual with the world&apos;s
							finest fragrances. Join our community for exclusive
							offers and scents.
						</p>

						<form
							onSubmit={handleSubscribe}
							className="flex w-full max-w-sm items-center space-x-2 pt-2"
						>
							<Input
								type="email"
								placeholder="Email address"
								className="h-11 bg-slate-50 border-slate-200 focus:bg-white transition-all"
							/>
							<Button
								type="submit"
								size="icon"
								className="h-11 w-11 shrink-0"
							>
								<Send className="h-4 w-4" />
								<span className="sr-only">Subscribe</span>
							</Button>
						</form>
					</div>

					<div className="md:col-span-2">
						<h4 className="font-semibold text-slate-900 mb-6">
							Shop
						</h4>
						<ul className="flex flex-col gap-4 text-sm text-slate-500">
							<FooterLink href="/shop/women">Women</FooterLink>
							<FooterLink href="/shop/men">Men</FooterLink>
							<FooterLink href="/shop/unisex">Unisex</FooterLink>
						</ul>
					</div>

					<div className="md:col-span-2">
						<h4 className="font-semibold text-slate-900 mb-6">
							Support
						</h4>
						<ul className="flex flex-col gap-4 text-sm text-slate-500">
							<FooterLink href="/faq">FAQ</FooterLink>
							<FooterLink href="/shipping">Shipping</FooterLink>
							<FooterLink href="/returns">Returns</FooterLink>
							<FooterLink href="/contact">Contact</FooterLink>
						</ul>
					</div>

					<div className="md:col-span-3">
						<h4 className="font-semibold text-slate-900 mb-6">
							Follow Us
						</h4>
						<div className="flex gap-4 mb-8">
							<SocialIcon
								href="#"
								icon={
									<TelegramIcon
										size={40}
										strokeWidth={0}
										fill="currentColor"
									/>
								}
							/>
							<SocialIcon
								href="#"
								icon={
									<InstagramIcon
										size={40}
										strokeWidth={1.5}
									/>
								}
							/>
							<SocialIcon
								href="#"
								icon={
									<TiktokIcon
										size={40}
										strokeWidth={0}
										fill="currentColor"
									/>
								}
							/>
						</div>
					</div>
				</div>

				<div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-medium">
					<p>© {currentYear} Scent Inc. All rights reserved.</p>
					<div className="flex flex-row gap-x-16">
						<Link
							href="#"
							className="hover:text-foreground transition-colors"
						>
							Privacy Policy
						</Link>
						<Link
							href="#"
							className="hover:text-foreground transition-colors"
						>
							Terms of Service
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}

function FooterLink({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) {
	return (
		<li>
			<Link
				href={href}
				className="hover:text-foreground transition-colors duration-200"
			>
				{children}
			</Link>
		</li>
	);
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
	return (
		<Link
			href={href}
			className="p-2 -ml-2 rounded-full text-slate-500 hover:text-foreground hover:bg-slate-50 transition-all"
		>
			{icon}
		</Link>
	);
}
