const Overview = ({ overview }: { overview: string }) => {
  return (
    <section>
      <div className="py-8 max-w-6xl mx-auto">
        <h2 className="font-bold text-xl my-4">Overview</h2>
        <p className="text-muted-foreground leading-7 whitespace-pre-wrap">{overview}</p>
      </div>
    </section>
  );
};

export default Overview;
