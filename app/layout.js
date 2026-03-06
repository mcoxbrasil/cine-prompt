export const metadata = {
  title: "Cine Prompt | Cartel Criativo",
  description: "Gerador de prompts cinematográficos para IA"
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, padding: 0, background: "#060d1a" }}>{children}</body>
    </html>
  );
}
