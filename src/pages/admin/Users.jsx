function Users() {
  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Users
      </h1>

      <table className="w-full bg-white shadow">

        <thead>
          <tr className="bg-red-600 text-white">
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="text-center">
              Vaishnavi
            </td>

            <td className="text-center">
              vaishu@gmail.com
            </td>
          </tr>
        </tbody>

      </table>

    </div>
  );
}

export default Users;