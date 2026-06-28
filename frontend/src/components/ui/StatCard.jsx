function StatCard({
  title,
  value,
  color,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-gray-500 text-sm">

        {title}

      </h2>

      <h1
        className={`text-4xl font-bold mt-3 ${color}`}
      >
        {value}
      </h1>

    </div>
  );
}

export default StatCard;