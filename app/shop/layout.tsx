import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<div className="container mx-auto px-8">{children}</div>
			<Footer />
		</>
	);
}
