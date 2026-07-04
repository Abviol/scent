/* components */
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Nav from "@/components/layout/nav";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<div className="mt-2">
				<Nav />
			</div>
			<div className="container mx-auto px-8">{children}</div>
			<Footer />
		</>
	);
}
