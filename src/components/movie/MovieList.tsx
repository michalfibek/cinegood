export default function MovieList({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h2>Found movies</h2>
      {children}
    </div>
  );
}
