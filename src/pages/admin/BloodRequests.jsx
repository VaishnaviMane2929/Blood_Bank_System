import {
  useEffect,
  useState,
} from "react";

import {
  getRequests,
  deleteRequest,
} from "../../api/requestApi";

function BloodRequests() {
  const [requests, setRequests] =
    useState([]);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests =
    async () => {
      const res =
        await getRequests();

      setRequests(
        res.requests
      );
    };

  const handleDelete =
    async (id) => {
      if (
        window.confirm(
          "Delete Request?"
        )
      ) {
        await deleteRequest(id);

        loadRequests();
      }
    };

  return (
    <>
      <div className="flex justify-between mb-6">
        <h1 className="text-4xl font-bold">
          Blood Requests
        </h1>

        <button className="bg-red-600 text-white px-5 py-2 rounded-lg">
          Add Request
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-red-600 text-white">

            <tr>
              <th className="p-4">
                Patient
              </th>

              <th className="p-4">
                Blood Group
              </th>

              <th className="p-4">
                Units
              </th>

              <th className="p-4">
                Hospital
              </th>

              <th className="p-4">
                Status
              </th>

              <th className="p-4">
                Action
              </th>
            </tr>

          </thead>

          <tbody>

            {requests.map(
              (request) => (
                <tr
                  key={
                    request._id
                  }
                  className="border-b"
                >

                  <td className="p-4">
                    {
                      request.patientName
                    }
                  </td>

                  <td className="p-4">
                    {
                      request.bloodGroup
                    }
                  </td>

                  <td className="p-4">
                    {
                      request.unitsRequired
                    }
                  </td>

                  <td className="p-4">
                    {
                      request.hospital
                    }
                  </td>

                  <td className="p-4">
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                      {
                        request.status
                      }
                    </span>
                  </td>

                  <td className="p-4">

                    <button className="bg-green-600 text-white px-3 py-2 rounded mr-2">
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          request._id
                        )
                      }
                      className="bg-red-600 text-white px-3 py-2 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>
    </>
  );
}

export default BloodRequests;