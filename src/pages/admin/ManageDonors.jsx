import { useEffect, useState } from "react";
import {
  getDonations,
  deleteDonation,
} from "../../api/donationApi";

function ManageDonors() {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    loadDonors();
  }, []);

  const loadDonors = async () => {
    try {
      const res = await getDonations();

      setDonors(res.donations);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure?"
      )
    ) {
      await deleteDonation(id);

      loadDonors();
    }
  };

  return (
    <>
      <div className="flex justify-between mb-6">
        <h1 className="text-4xl font-bold">
          Manage Donors
        </h1>

        <button className="bg-red-600 text-white px-5 py-2 rounded-lg">
          Add Donor
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="p-4">
                Name
              </th>

              <th className="p-4">
                Blood Group
              </th>

              <th className="p-4">
                Units
              </th>

              <th className="p-4">
                City
              </th>

              <th className="p-4">
                Contact
              </th>

              <th className="p-4">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {donors.map(
              (donor) => (
                <tr
                  key={donor._id}
                  className="border-b"
                >
                  <td className="p-4">
                    {donor.donorName}
                  </td>

                  <td className="p-4">
                    {
                      donor.bloodGroup
                    }
                  </td>

                  <td className="p-4">
                    {donor.units}
                  </td>

                  <td className="p-4">
                    {donor.city}
                  </td>

                  <td className="p-4">
                    {donor.contact}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() =>
                        handleDelete(
                          donor._id
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

export default ManageDonors;