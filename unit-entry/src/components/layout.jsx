import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="main-content">
      <Header />
      {children}
    </div>
  );
}