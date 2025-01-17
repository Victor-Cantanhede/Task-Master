import Layout from '../components/layout/Layout';
import "./globals.css";

export const metadata = {
  title: "TaskMaster (beta)",
  description: null,
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
