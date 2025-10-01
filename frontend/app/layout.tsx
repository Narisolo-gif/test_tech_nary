// app/layout.tsx
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';


export const metadata = {
  title: "Articles |",
  description: "Liste des articles avec Next.js 15 et API routes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}
