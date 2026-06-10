function BloodStock() {
  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Blood Stock
      </h1>

      <table className="w-full bg-white shadow">

        <thead>
          <tr className="bg-red-600 text-white">
            <th>Blood Group</th>
            <th>Units</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="text-center">A+</td>
            <td className="text-center">50</td>
          </tr>

          <tr>
            <td className="text-center">B+</td>
            <td className="text-center">40</td>
          </tr>

          <tr>
            <td className="text-center">O+</td>
            <td className="text-center">60</td>
          </tr>
        </tbody>

      </table>

    </div>
  );
}

export default BloodStock;