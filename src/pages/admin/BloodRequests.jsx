function BloodRequests() {
  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Blood Requests
      </h1>

      <table className="w-full bg-white shadow rounded-lg">

        <thead>
          <tr className="bg-red-600 text-white">
            <th>Patient</th>
            <th>Blood Group</th>
            <th>Units</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr className="text-center">
            <td>Rahul</td>
            <td>O+</td>
            <td>2</td>
            <td>Pending</td>
          </tr>
        </tbody>

      </table>

    </div>
  );
}

export default BloodRequests;