import { useEffect, useState } from "react";

import {
  getDonations,
  addDonation,
  updateDonation,
  deleteDonation,
} from "../../api/donationApi";

import DonorModal from "../../components/admin/DonorModal";

function ManageDonors() {
  const [donors, setDonors] = useState([]);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [selectedDonor, setSelectedDonor] =
    useState(null);

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

  const handleAdd = async (data) => {
    try {
      await addDonation(data);

      loadDonors();

      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (data) => {
    try {
      await updateDonation(
        selectedDonor._id,
        data
      );

      loadDonors();

      setIsModalOpen(false);

      setSelectedDonor(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this donor?"
      );

    if (!confirmDelete) return;

    try {
      await deleteDonation(id);

      loadDonors();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Header */}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            Manage Donors
          </h1>

          <p className="text-gray-500 mt-2">
            View, Add, Edit and Delete Donors
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedDonor(null);
            setIsModalOpen(true);
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-semibold"
        >
          Add Donor
        </button>
      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow overflow-hidden">

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
                Actions
              </th>
            </tr>

          </thead>

          <tbody>

            {donors.length > 0 ? (
              donors.map((donor) => (
                <tr
                  key={donor._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4">
                    {donor.donorName}
                  </td>

                  <td className="p-4">
                    {donor.bloodGroup}
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

                  <td className="p-4 flex gap-2">

                    <button
                      onClick={() => {
                        setSelectedDonor(
                          donor
                        );

                        setIsModalOpen(
                          true
                        );
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          donor._id
                        )
                      }
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-8 text-gray-500"
                >
                  No donors found
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      {/* Modal */}

      <DonorModal
        isOpen={isModalOpen}
        donor={selectedDonor}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDonor(null);
        }}
        onSave={
          selectedDonor
            ? handleEdit
            : handleAdd
        }
      />
    </>
  );
}

export default ManageDonors;